export const toKebabCase = (str: string): string => {
  return str
    .toLowerCase() // Convert the string to lowercase
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove any non-alphanumeric characters except hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
};

export const toTitleCase = (str: string): string => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Splits a staff member's `department` into its individual departments.
 *
 * A member who sits in more than one department stores them comma-separated in
 * staff.json, because that is how the field reads in prose — the modal, the
 * search index and the page descriptions all use the stored string as-is. Only
 * the layouts that stack the departments on separate lines need them split.
 */
export const splitDepartments = (department: string): string[] =>
  department
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean);

export const truncateString = (str: string, maxLength: number) => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
};
