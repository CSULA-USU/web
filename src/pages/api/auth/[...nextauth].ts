// src/pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { supabaseAdmin } from 'lib/supabaseAdmin';

async function isBackofficeUser(email: string) {
  if (!email) return false;
  const { data, error } = await supabaseAdmin
    .from('backoffice_users')
    // If you have an `active` column and want to honor it:
    .select('email, active')
    .eq('email', email.toLowerCase())
    .maybeSingle();

  if (error) return false;

  // Presence-only:
  // return Boolean(data);

  // Presence + active flag:
  return Boolean(data && (data as any).active !== false);
}

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: { params: { scope: 'openid profile email' } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt', maxAge: 60 * 60 * 8 },
  pages: {
    // Option A:
    // signIn: '/auth/signin',
    // error: '/auth/signin',

    // Option B:
    signIn: '/backoffice/signin',
    error: '/backoffice/signin',
  },
  callbacks: {
    async signIn({ profile }) {
      const raw =
        (profile as any)?.email ??
        (profile as any)?.preferred_username ??
        (profile as any)?.upn ??
        '';
      const email = String(raw).toLowerCase();
      const allowed = await isBackofficeUser(email);
      return allowed ? true : '/backoffice/signin'; // or '/auth/signin'
    },
    async jwt({ token, profile }) {
      if (profile) {
        const raw =
          (profile as any)?.email ??
          (profile as any)?.preferred_username ??
          (profile as any)?.upn ??
          '';
        token.email = String(raw).toLowerCase();
      }
      // optional periodic re-check (5 min) to catch list changes
      const now = Math.floor(Date.now() / 1000);
      const RECHECK = 300;
      if (!token.checkedAt || now - (token.checkedAt as number) > RECHECK) {
        token.isBackofficeUser = await isBackofficeUser(token.email as string);
        token.checkedAt = now;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).isBackofficeUser = Boolean(token.isBackofficeUser);
      return session;
    },
  },
};

export default NextAuth(authOptions);
