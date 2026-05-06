import type { NextApiRequest, NextApiResponse } from 'next';
import { badRequest } from 'lib/api/http';
import { requireBackofficePolicy } from './requireBackofficePolicy';
import { getPolicyForMethod } from './getPolicyForMethod';

export const requireBackofficeResourcePolicy = async (
  req: NextApiRequest,
  res: NextApiResponse,
  resource: string,
) => {
  const policy = getPolicyForMethod({
    method: req.method,
    resource,
  });

  if (!policy) {
    badRequest(res, 'Unsupported request method.');
    return { ok: false as const };
  }

  return requireBackofficePolicy(req, res, { policy });
};
