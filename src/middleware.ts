// src/middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ token }) {
      return Boolean(token?.isBackofficeUser);
    },
  },
});

export const config = {
  matcher: ['/backoffice((?!/signin).*)'], // protect /backoffice/* except /backoffice/signin
};
