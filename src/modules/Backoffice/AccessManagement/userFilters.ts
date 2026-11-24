import {
  formatDepartmentName,
  formatRoleName,
} from 'lib/backoffice/formatters';
import type { V2UserRow } from './types';

/** Select values. Radix Select rejects an empty-string value, so "no filter" needs a sentinel. */
export const ALL_FILTER_VALUE = 'all';
/** Department ids are numeric, so this can never collide with one. */
export const NO_DEPARTMENT_FILTER_VALUE = 'none';

export type UserFilterState = {
  query: string;
  departmentId: string;
  roleId: string;
};

export const EMPTY_USER_FILTERS: UserFilterState = {
  query: '',
  departmentId: ALL_FILTER_VALUE,
  roleId: ALL_FILTER_VALUE,
};

export type FilterOption = { label: string; value: string };

export const isUserFilterActive = (filters: UserFilterState): boolean =>
  filters.query.trim() !== '' ||
  filters.departmentId !== ALL_FILTER_VALUE ||
  filters.roleId !== ALL_FILTER_VALUE;

/* The query matches what a row shows as well as the raw keys, so typing
   "student worker" finds a `student_worker` the screen displays that way. */
const searchableText = (user: V2UserRow): string =>
  [
    user.email,
    user.department?.department_name,
    user.department?.department_fullname,
    user.department && formatDepartmentName(user.department.department_name),
    ...user.roles.flatMap((role) => [
      role.role_name,
      formatRoleName(role.role_name),
    ]),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

/** Keeps the input order, so callers sort once before filtering. */
export const filterUsers = (
  users: V2UserRow[],
  filters: UserFilterState,
): V2UserRow[] => {
  const query = filters.query.trim().toLowerCase();

  return users.filter((user) => {
    if (query && !searchableText(user).includes(query)) return false;

    if (filters.departmentId === NO_DEPARTMENT_FILTER_VALUE) {
      if (user.department) return false;
    } else if (
      filters.departmentId !== ALL_FILTER_VALUE &&
      String(user.department?.id) !== filters.departmentId
    ) {
      return false;
    }

    if (
      filters.roleId !== ALL_FILTER_VALUE &&
      !user.roles.some((role) => String(role.id) === filters.roleId)
    ) {
      return false;
    }

    return true;
  });
};

const byLabel = (a: FilterOption, b: FilterOption) =>
  a.label.localeCompare(b.label, 'en');

/* Options come from the users themselves rather than the departments and
   roles tables, so the menus never offer a choice that matches nobody. "All"
   leads and "No department" trails the alphabetical run on purpose: they are
   modes, not names a reader scans for. */
export const getDepartmentFilterOptions = (
  users: V2UserRow[],
): FilterOption[] => {
  const departments = new Map<string, string>();
  let hasUnassigned = false;

  users.forEach((user) => {
    if (!user.department) {
      hasUnassigned = true;
      return;
    }
    departments.set(
      String(user.department.id),
      formatDepartmentName(user.department.department_name),
    );
  });

  return [
    { label: 'All departments', value: ALL_FILTER_VALUE },
    ...Array.from(departments, ([value, label]) => ({ label, value })).sort(
      byLabel,
    ),
    ...(hasUnassigned
      ? [{ label: 'No department', value: NO_DEPARTMENT_FILTER_VALUE }]
      : []),
  ];
};

export const getRoleFilterOptions = (users: V2UserRow[]): FilterOption[] => {
  const roles = new Map<string, string>();

  users.forEach((user) =>
    user.roles.forEach((role) =>
      roles.set(String(role.id), formatRoleName(role.role_name)),
    ),
  );

  return [
    { label: 'All roles', value: ALL_FILTER_VALUE },
    ...Array.from(roles, ([value, label]) => ({ label, value })).sort(byLabel),
  ];
};

/** The part of an address before its last `@` — the row's name on phones. */
export const emailLocalPart = (email: string): string => {
  const at = email.lastIndexOf('@');
  return at < 1 ? email : email.slice(0, at);
};

/** Bucket for addresses that start with anything other than A–Z. */
export const NON_LETTER_INITIAL = '#';

export type InitialGroup<TItem> = { initial: string; items: TItem[] };

/**
 * Groups by the email's first letter, A–Z, with every other leading character
 * collected in a trailing `#` group, the way a phone's contact list does it.
 * Items keep their input order inside each group, so a list sorted by email
 * stays sorted.
 */
export const groupByInitial = <TItem>(
  items: TItem[],
  getEmail: (item: TItem) => string,
): InitialGroup<TItem>[] => {
  const groups = new Map<string, TItem[]>();

  items.forEach((item) => {
    const first = getEmail(item).charAt(0).toUpperCase();
    const initial = /^[A-Z]$/.test(first) ? first : NON_LETTER_INITIAL;
    const group = groups.get(initial);
    if (group) group.push(item);
    else groups.set(initial, [item]);
  });

  return Array.from(groups, ([initial, groupItems]) => ({
    initial,
    items: groupItems,
  })).sort((a, b) => {
    if (a.initial === NON_LETTER_INITIAL) return 1;
    if (b.initial === NON_LETTER_INITIAL) return -1;
    return a.initial.localeCompare(b.initial, 'en');
  });
};
