import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useToast } from 'context/ToastContext';
import { useBackofficeUser, hasBackofficePolicy } from './useBackofficeUser';

type Result = {
  loading: boolean;
  hasAccess: boolean;
};

export function useBackofficePageAccess(
  pageKey: string,
  action: string,
  scopes: string[],
): Result {
  const { user, loading } = useBackofficeUser();
  const router = useRouter();
  const { showToast } = useToast();
  const redirected = useRef(false);

  const hasAccess =
    !loading &&
    user !== null &&
    hasBackofficePolicy(user.effectivePolicies, pageKey, action, scopes);

  useEffect(() => {
    if (loading || redirected.current) return;
    if (
      !user ||
      !hasBackofficePolicy(user.effectivePolicies, pageKey, action, scopes)
    ) {
      redirected.current = true;
      showToast('You do not have access to that page.', 'error');
      router.push('/backoffice');
    }
  }, [loading, user, pageKey, action, scopes, router, showToast]);

  return { loading: loading || (!hasAccess && !redirected.current), hasAccess };
}
