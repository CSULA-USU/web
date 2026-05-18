import type { NextApiResponse } from 'next';

export const methodNotAllowed = (
  res: NextApiResponse,
  allowedMethods: string[],
) => {
  res.setHeader('Allow', allowedMethods);
  return res.status(405).json({ error: 'Method not allowed' });
};

export const badRequest = (res: NextApiResponse, message = 'Bad request') => {
  return res.status(400).json({ error: message });
};

export const notFound = (res: NextApiResponse, message = 'Not found') => {
  return res.status(404).json({ error: message });
};

export const forbidden = (res: NextApiResponse, message = 'Forbidden') => {
  return res.status(403).json({ error: message });
};

export const serverError = (
  res: NextApiResponse,
  message = 'Internal server error',
) => {
  return res.status(500).json({ error: message });
};
