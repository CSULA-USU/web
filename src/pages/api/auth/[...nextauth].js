import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { supabaseAdmin } from 'lib/supabaseAdmin';

export const authOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // Runs right after Azure says "login ok", before we create a session.
    // If BACKOFFICE_AUTH_STRATEGY !== 'supabase' -> allow everyone (legacy behavior).
    async signIn({ profile }) {
      if (process.env.BACKOFFICE_AUTH_STRATEGY !== 'supabase') return true;

      // Resolve an email/UPN Azure gives us (lower-cased to match DB)
      const raw =
        profile?.email ?? profile?.preferred_username ?? profile?.upn ?? '';
      const email = String(raw).toLowerCase();

      // Check Supabase allow-list
      const { data, error } = await supabaseAdmin
        .from('backoffice_users')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (error) {
        console.error('[allowlist] Supabase error:', error);
        return false;
      }

      // Presence-only: allow if row exists
      // return Boolean(data);

      // Presence optional active flag (treat missing active as true)
      return Boolean(data);
    },
  },
};

export default NextAuth(authOptions);
