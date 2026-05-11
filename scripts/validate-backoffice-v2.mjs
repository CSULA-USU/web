/**
 * Validates that backoffice_v2 schema data matches expected policy assignments.
 *
 * Usage:
 *   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/validate-backoffice-v2.mjs
 *
 * Or with .env.local loaded:
 *   node -r dotenv/config scripts/validate-backoffice-v2.mjs dotenv_config_path=.env.local
 */

import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });

let passed = 0;
let failed = 0;

function ok(label) {
  console.log(`  ✓ ${label}`);
  passed++;
}

function fail(label, detail) {
  console.error(`  ✗ ${label}${detail ? `: ${detail}` : ''}`);
  failed++;
}

async function getUserWithPolicies(email) {
  const { data: user } = await db
    .schema('backoffice_v2')
    .from('users')
    .select('id, email, is_active')
    .eq('email', email.toLowerCase())
    .maybeSingle();

  if (!user) return null;

  const { data: roleRows } = await db
    .schema('backoffice_v2')
    .from('user_roles')
    .select('roles(id, role_key)')
    .eq('user_id', user.id);

  const roleIds = (roleRows ?? []).map((r) => r.roles.id);

  const { data: rolePolicies } = roleIds.length
    ? await db
        .schema('backoffice_v2')
        .from('role_policies')
        .select('action, scope, pages(page_key)')
        .in('role_id', roleIds)
    : { data: [] };

  const { data: userPolicies } = await db
    .schema('backoffice_v2')
    .from('user_policies')
    .select('action, scope, pages(page_key)')
    .eq('user_id', user.id);

  const effective = [
    ...(rolePolicies ?? []).map((p) => `${p.pages.page_key}:${p.action}:${p.scope}`),
    ...(userPolicies ?? []).map((p) => `${p.pages.page_key}:${p.action}:${p.scope}`),
  ];

  return { ...user, effectivePolicies: effective };
}

function hasPolicy(user, pageKey, action, scope) {
  return user.effectivePolicies.some((p) => {
    const [pk, ac, sc] = p.split(':');
    const globalWildcard = pk === '*' && ac === '*' && sc === '*';
    const exactOrWild =
      pk === pageKey && ac === action && (sc === scope || sc === '*');
    return globalWildcard || exactOrWild;
  });
}

// ── checks ────────────────────────────────────────────────────────────────────

const ADMINS = [
  'ivilla35@calstatela.edu',
  // add the other 3 core admins here as they are seeded
];

const GRAFFIX_ALL_VIEW = [
  // add known all-view graffix users here
];

console.log('\n── backoffice_v2 schema validation ──\n');

// 1. Core admins have accessManagement:view:* and accessManagement:edit:*
console.log('1. Core admins — accessManagement view + edit');
for (const email of ADMINS) {
  const user = await getUserWithPolicies(email);
  if (!user) {
    fail(email, 'not found in backoffice_v2.users');
    continue;
  }
  if (!user.is_active) {
    fail(email, 'is_active = false');
    continue;
  }
  const canView = hasPolicy(user, 'accessManagement', 'view', '*');
  const canEdit = hasPolicy(user, 'accessManagement', 'edit', '*');
  canView ? ok(`${email} — view`) : fail(`${email} — view`, 'missing');
  canEdit ? ok(`${email} — edit`) : fail(`${email} — edit`, 'missing');
}

// 2. jhered23 has BOD view + edit
console.log('\n2. jhered23@calstatela.edu — BOD view + edit');
{
  const user = await getUserWithPolicies('jhered23@calstatela.edu');
  if (!user) {
    fail('jhered23@calstatela.edu', 'not found in backoffice_v2.users');
  } else {
    hasPolicy(user, 'bod', 'view', '*')
      ? ok('bod:view:*')
      : fail('bod:view:*', 'missing');
    hasPolicy(user, 'bod', 'edit', '*')
      ? ok('bod:edit:*')
      : fail('bod:edit:*', 'missing');
  }
}

// 3. Graffix all-view users have graffixRequests:view:*
if (GRAFFIX_ALL_VIEW.length > 0) {
  console.log('\n3. Graffix all-view — graffixRequests:view:*');
  for (const email of GRAFFIX_ALL_VIEW) {
    const user = await getUserWithPolicies(email);
    if (!user) { fail(email, 'not found'); continue; }
    hasPolicy(user, 'graffixRequests', 'view', '*')
      ? ok(email)
      : fail(email, 'missing graffixRequests:view:*');
  }
}

// 4. Sanity: all active users in v2 have at least one policy
console.log('\n4. All active v2 users have at least one effective policy');
{
  const { data: activeUsers } = await db
    .schema('backoffice_v2')
    .from('users')
    .select('id, email')
    .eq('is_active', true)
    .is('deleted_at', null);

  for (const u of activeUsers ?? []) {
    const user = await getUserWithPolicies(u.email);
    user?.effectivePolicies.length > 0
      ? ok(u.email)
      : fail(u.email, 'no effective policies');
  }
}

console.log(`\n── ${passed} passed, ${failed} failed ──\n`);
if (failed > 0) process.exit(1);
