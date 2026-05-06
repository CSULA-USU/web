const METHOD_TO_ACTION = {
  GET: 'view',
  POST: 'create',
  PATCH: 'edit',
  DELETE: 'delete',
} as const;

type SupportedMethod = keyof typeof METHOD_TO_ACTION;

export const getPolicyForMethod = ({
  method,
  resource,
}: {
  method: string | undefined;
  resource: string;
}) => {
  if (!method || !(method in METHOD_TO_ACTION)) return null;

  const action = METHOD_TO_ACTION[method as SupportedMethod];
  return `${resource}:${action}:*`;
};
