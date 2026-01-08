import Head from 'next/head';
import { Page } from 'modules';
import {
  FluidContainer,
  Typography,
  Button,
  Input,
  Label,
  Announcement,
} from 'components';
import { useState, useCallback, useEffect } from 'react';
import type { AnnouncementBannerType } from 'types/AnnouncementBanner';
import { BackOfficeTemplate } from 'partials/Backoffice';
import { getLatestAnnouncementBanner } from 'api/announcementBanner';
import { getServerSession } from 'next-auth';
import { getUserFromSupabaseByEmail } from 'pages/api/user';
import { hasPermission } from 'lib/supabase';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { useToast } from 'context/ToastContext';

export default function AnnouncementBannerAdmin({
  initialBanner,
  error,
}: {
  initialBanner: AnnouncementBannerType | null;
  error?: string;
}) {
  const [banner, setBanner] = useState<AnnouncementBannerType | null>(
    initialBanner,
  );
  const [draft, setDraft] = useState<Partial<AnnouncementBannerType>>(
    initialBanner ?? {},
  );
  const { showToast } = useToast();

  const handleUpdate = useCallback(
    async (id: string, updates: Partial<AnnouncementBannerType>) => {
      try {
        const res = await fetch('/api/announcementBanner/update', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, updates }),
        });

        const payload = await res.json();

        if (!res.ok) {
          throw new Error(
            payload?.error ?? 'Failed to update announcement banner',
          );
        }

        setBanner(payload as AnnouncementBannerType);
        showToast('Announcement banner updated successfully', 'success');
      } catch (err) {
        console.error('Announcement banner update failed', err);
        showToast('Failed to update announcement banner', 'error');
      }
    },
    [showToast],
  );

  useEffect(() => {
    if (banner) {
      setDraft({
        text: banner.text,
        link_text: banner.link_text,
        href: banner.href,
        is_visible: banner.is_visible,
      });
    }
  }, [banner]);

  if (error) {
    return (
      <Page>
        <Head>
          <title>Announcement Banner Admin &ndash; Error</title>
        </Head>
        <BackOfficeTemplate>
          <FluidContainer padding="24px">
            <Typography variant="title" size="xl">
              Error Loading Announcement Banners
            </Typography>
            <Typography variant="span" size="md" margin="16px 0">
              {error}
            </Typography>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </FluidContainer>
        </BackOfficeTemplate>
      </Page>
    );
  }

  return (
    <Page>
      <Head>
        <title>Announcement Banner Admin</title>
      </Head>
      <BackOfficeTemplate>
        <FluidContainer
          padding="0"
          width="100%"
          innerPadding="0"
          innerMaxWidth="100%"
          flex
          flexDirection="column"
          height="100%"
        >
          <FluidContainer backgroundColor="black">
            <Typography color="white" variant="title" as="h1">
              Announcement Banner
            </Typography>
            <Typography color="white" variant="labelTitleSmall">
              Manage the banner that appears across the University&ndash;Student
              Union site
            </Typography>
          </FluidContainer>

          <FluidContainer>
            {banner ? (
              <FluidContainer
                flex
                flexDirection="column"
                gap="21px"
                justifyContent="center"
              >
                {/* Preview */}
                <Announcement
                  linkText={draft.link_text}
                  href={draft.href}
                  text={draft.text ?? ''}
                  isVisible={!!draft.is_visible}
                  isPreview={true}
                />

                {/* Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!banner) return;
                    handleUpdate(banner.id, draft);
                  }}
                >
                  <FluidContainer
                    padding="0"
                    flex
                    flexDirection="column"
                    gap="16px"
                  >
                    <Label>
                      <Typography variant="span">Banner Text</Typography>
                      <Input
                        type="text"
                        value={draft.text ?? ''}
                        onChange={(e: { target: { value: any } }) =>
                          setDraft((p) => ({ ...p, text: e.target.value }))
                        }
                      />
                    </Label>

                    <Label>
                      <Typography variant="span">Link Text</Typography>
                      <Input
                        type="text"
                        value={draft.link_text ?? ''}
                        onChange={(e: { target: { value: any } }) =>
                          setDraft((p) => ({
                            ...p,
                            link_text: e.target.value,
                          }))
                        }
                      />
                    </Label>

                    <Label>
                      <Typography variant="span">Link URL</Typography>
                      <Input
                        type="url"
                        value={draft.href ?? ''}
                        onChange={(e: { target: { value: any } }) =>
                          setDraft((p) => ({ ...p, href: e.target.value }))
                        }
                      />
                    </Label>
                    <FluidContainer
                      flex
                      flexDirection="column"
                      padding="0"
                      alignItems="flex-start"
                    >
                      <Label>
                        <Typography variant="span">Visible</Typography>
                        <Input
                          type="checkbox"
                          checked={!!draft.is_visible}
                          onChange={(e: { target: { checked: any } }) =>
                            setDraft((p) => ({
                              ...p,
                              is_visible: e.target.checked,
                            }))
                          }
                        />
                      </Label>
                    </FluidContainer>
                    <FluidContainer padding="0">
                      <Button type="submit" variant="primary">
                        Save Banner
                      </Button>
                    </FluidContainer>
                  </FluidContainer>
                </form>
              </FluidContainer>
            ) : (
              <Typography>No announcement banner found.</Typography>
            )}
          </FluidContainer>
        </FluidContainer>
      </BackOfficeTemplate>
    </Page>
  );
}

export async function getServerSideProps(ctx: any) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: `/backoffice/signin?callbackUrl=${encodeURIComponent(
          ctx.resolvedUrl,
        )}`,
        permanent: false,
      },
    };
  }

  const { userData, error } = await getUserFromSupabaseByEmail(
    session.user?.email,
  );

  if (error || !userData) {
    return { props: { initialBanner: null, error: 'Unauthorized' } };
  }

  if (!hasPermission(userData, 'siteContent:edit:announcementBanner')) {
    return {
      redirect: {
        destination: '/backoffice?error=unauthorized',
        permanent: false,
      },
    };
  }

  const initialBanner = await getLatestAnnouncementBanner();
  return { props: { initialBanner } };
}
