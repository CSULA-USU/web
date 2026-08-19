/**
 * Runs before any test module is imported.
 *
 * No test here reaches Supabase, but importing anything from the `components`
 * barrel pulls `lib/supabase` in transitively, and that module throws at import
 * time when its env vars are unset. CI passes no secrets — correctly, since
 * nothing under test makes a request — so these placeholders exist only to keep
 * that import side effect quiet. Real values in `.env.local` still win, because
 * Jest does not load `.env.local` itself.
 */
process.env.NEXT_PUBLIC_SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://test.supabase.co';

process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'test-anon-key';
