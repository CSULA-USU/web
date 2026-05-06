export const parseNumericId = (id: string | string[] | undefined) => {
  if (typeof id !== 'string') return null;

  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId < 0) {
    return null;
  }

  return parsedId;
};
