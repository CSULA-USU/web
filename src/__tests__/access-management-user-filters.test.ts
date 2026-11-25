import {
  ALL_FILTER_VALUE,
  EMPTY_USER_FILTERS,
  NO_DEPARTMENT_FILTER_VALUE,
  filterUsers,
  getDepartmentFilterOptions,
  getRoleFilterOptions,
  emailLocalPart,
  groupByInitial,
  NON_LETTER_INITIAL,
  isUserFilterActive,
  type UserFilterState,
  type V2UserRow,
} from 'modules/Backoffice/AccessManagement';

const csi = {
  id: 1,
  department_key: 'csi',
  department_name: 'csi',
  department_fullname: 'Center for Student Involvement',
};
const graffix = {
  id: 2,
  department_key: 'graffix',
  department_name: 'graffix',
  department_fullname: 'Graffix',
};
const admin = { id: 10, role_key: 'admin', role_name: 'admin' };
const studentWorker = {
  id: 11,
  role_key: 'student_worker',
  role_name: 'student_worker',
};

const user = (
  id: number,
  email: string,
  overrides: Partial<V2UserRow> = {},
): V2UserRow => ({
  id,
  email,
  is_active: true,
  deactivated_at: null,
  deactivated_by: null,
  department: null,
  roles: [],
  policies: [],
  ...overrides,
});

const users = [
  user(1, 'adoe@calstatela.edu', { department: csi, roles: [admin] }),
  user(2, 'bsmith@calstatela.edu', {
    department: graffix,
    roles: [studentWorker],
  }),
  user(3, 'clee@calstatela.edu'),
];

const filtersWith = (filters: Partial<UserFilterState>): UserFilterState => ({
  ...EMPTY_USER_FILTERS,
  ...filters,
});

const emails = (list: V2UserRow[]) => list.map((u) => u.email);

describe('filterUsers', () => {
  it('keeps everyone when no filter is active', () => {
    expect(filterUsers(users, EMPTY_USER_FILTERS)).toEqual(users);
    expect(isUserFilterActive(EMPTY_USER_FILTERS)).toBe(false);
  });

  it('ignores a whitespace-only query', () => {
    expect(isUserFilterActive(filtersWith({ query: '   ' }))).toBe(false);
    expect(filterUsers(users, filtersWith({ query: '   ' }))).toEqual(users);
  });

  it('searches email case-insensitively', () => {
    expect(
      emails(filterUsers(users, filtersWith({ query: 'BSMITH' }))),
    ).toEqual(['bsmith@calstatela.edu']);
  });

  it('searches department and role as displayed, not only their keys', () => {
    expect(
      emails(filterUsers(users, filtersWith({ query: 'student involvement' }))),
    ).toEqual(['adoe@calstatela.edu']);
    expect(
      emails(filterUsers(users, filtersWith({ query: 'student worker' }))),
    ).toEqual(['bsmith@calstatela.edu']);
  });

  it('filters by department, including users with none', () => {
    expect(
      emails(filterUsers(users, filtersWith({ departmentId: '2' }))),
    ).toEqual(['bsmith@calstatela.edu']);
    expect(
      emails(
        filterUsers(
          users,
          filtersWith({ departmentId: NO_DEPARTMENT_FILTER_VALUE }),
        ),
      ),
    ).toEqual(['clee@calstatela.edu']);
  });

  it('filters by role and combines with the other filters', () => {
    expect(emails(filterUsers(users, filtersWith({ roleId: '10' })))).toEqual([
      'adoe@calstatela.edu',
    ]);
    expect(
      filterUsers(users, filtersWith({ roleId: '10', departmentId: '2' })),
    ).toEqual([]);
  });
});

describe('filter options', () => {
  it('lists departments present on users, alphabetized, with "No department" last', () => {
    expect(getDepartmentFilterOptions(users)).toEqual([
      { label: 'All departments', value: ALL_FILTER_VALUE },
      { label: 'CSI', value: '1' },
      { label: 'Graffix', value: '2' },
      { label: 'No department', value: NO_DEPARTMENT_FILTER_VALUE },
    ]);
  });

  it('lists roles present on users, alphabetized and formatted', () => {
    expect(getRoleFilterOptions(users)).toEqual([
      { label: 'All roles', value: ALL_FILTER_VALUE },
      { label: 'Admin', value: '10' },
      { label: 'Student Worker', value: '11' },
    ]);
  });
});
describe('groupByInitial', () => {
  it('names a row by the part of the address before its last @', () => {
    expect(emailLocalPart('j.doe@calstatela.edu')).toBe('j.doe');
    expect(emailLocalPart('no-at-sign')).toBe('no-at-sign');
  });

  it('groups by first letter A–Z, case-insensitively, keeping item order', () => {
    const groups = groupByInitial(
      ['adoe@x', 'Bsmith@x', 'aaron@x', 'clee@x'],
      (email) => email,
    );

    expect(groups).toEqual([
      { initial: 'A', items: ['adoe@x', 'aaron@x'] },
      { initial: 'B', items: ['Bsmith@x'] },
      { initial: 'C', items: ['clee@x'] },
    ]);
  });

  it('collects non-letter initials in a trailing # group', () => {
    const groups = groupByInitial(['9lives@x', 'zed@x', '_ops@x'], (e) => e);

    expect(groups).toEqual([
      { initial: 'Z', items: ['zed@x'] },
      { initial: NON_LETTER_INITIAL, items: ['9lives@x', '_ops@x'] },
    ]);
  });
});
