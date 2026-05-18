import type { NextApiRequest, NextApiResponse } from 'next';
import { methodNotAllowed } from './http';

export const allowMethods = (
  req: NextApiRequest,
  res: NextApiResponse,
  allowedMethods: string[],
) => {
  if (!req.method || !allowedMethods.includes(req.method)) {
    methodNotAllowed(res, allowedMethods);
    return false;
  }

  return true;
};
