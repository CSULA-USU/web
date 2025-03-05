import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export const withAuth = (
  handler: (
    _req: NextApiRequest,
    _res: NextApiResponse,
  ) => void | Promise<void>,
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res
        .status(401)
        .json({
          error:
            'Unauthorized. Please sign in with your outlook account at https://www.calstatela.edu/backoffice/signin',
        });
    }

    return handler(req, res);
  };
};
