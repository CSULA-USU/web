import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { useBreakpoint } from 'hooks';
import Link from 'next/link';
import { FluidContainer, SkeletonWrapper, Typography } from 'components';
import { useCallback, useEffect, useState } from 'react';
import { fetchInstagramFeed } from 'services';
import { InstagramPost } from 'types';
import { InstagramFeedProps } from './props';
import { truncateString } from 'utils/stringhelpers';
import { StatusType } from 'atoms';

interface InstagramFeedStyleProps {
  src?: string;
}

const HiddenSpan = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
`;

const InstagramCardsContainer = styled.div<InstagramFeedStyleProps>`
  width: 320px;
  height: 320px;
  background: ${(props) => `url(${props.src}) no-repeat`};
  background-size: cover;
  background-position: center center;
  margin: ${Spaces.sm};
  border-radius: 8px;
`;

const InstagramCardsContainerSkeleton = styled(SkeletonWrapper)`
  width: 320px;
  height: 320px;
  margin: ${Spaces.sm};
  border-radius: 8px;
`;

const InstagramPostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const InstagramCardsSkeleton = () => {
  const { isMobile } = useBreakpoint();
  return (
    <>
      {isMobile ? (
        <InstagramCardsContainerSkeleton />
      ) : (
        Array.from({ length: 12 }).map((_, index) => (
          <InstagramCardsContainerSkeleton key={index} />
        ))
      )}
    </>
  );
};

const InstagramLinkContainer = styled.span`
  :hover {
    color: ${Colors.gold};
  }
`;

export const defaultProps: InstagramFeedProps = {};

export const Component = ({
  department = 'usu',
  postsToShow = 12,
}: InstagramFeedProps) => {
  const { isMobile } = useBreakpoint();
  const [loading, setLoading] = useState(true);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [instagramResponseStatus, setInstagramResponseStatus] =
    useState<StatusType>('undefined');

  const getInstagramFeed = useCallback(async () => {
    await fetchInstagramFeed(setInstagramResponseStatus, department).then(
      (res) => {
        if (res != null) {
          const posts = res?.data?.data?.slice(0, postsToShow);
          if (posts) {
            setInstagramPosts(posts);
          }
        }
        setLoading(false);
      },
    );
  }, [department, postsToShow]);

  useEffect(() => {
    getInstagramFeed();
  }, [getInstagramFeed]);

  const username = instagramPosts[0]?.username;
  const url = `https://www.instagram.com/${username}`;

  return (
    <FluidContainer>
      <Typography
        variant={isMobile ? 'titleSmall' : 'title'}
        as="h2"
        margin={`0 0 ${Spaces.sm} 0`}
      >
        Follow Us on Instagram{' '}
        <InstagramLinkContainer>
          <Link href={url}>
            <strong>@{username}</strong>
          </Link>{' '}
        </InstagramLinkContainer>
      </Typography>
      <InstagramPostsContainer>
        {loading ? (
          <InstagramCardsSkeleton />
        ) : instagramResponseStatus == 'failed' ? (
          <Typography as="h3" variant="label">
            Failed to fetch data from instagram. Please try refreshing your
            page.
          </Typography>
        ) : instagramResponseStatus == 'success' &&
          instagramPosts.length == 0 ? (
          <Typography as="h3" variant="label">
            This account currently has no posts. Check back later for updates!
          </Typography>
        ) : isMobile ? (
          instagramPosts.length > 0 && (
            <Link
              href={instagramPosts[0].permalink && instagramPosts[0].permalink}
              aria-label="view instagram post"
            >
              <HiddenSpan aria-hidden="true">Instagram thumbnail</HiddenSpan>
              <InstagramCardsContainer
                src={
                  instagramPosts[0].media_type === 'VIDEO'
                    ? instagramPosts[0].thumbnail_url
                    : instagramPosts[0].media_url
                }
              />
            </Link>
          )
        ) : (
          instagramPosts.map((post, index) => (
            <Link
              href={post.permalink}
              key={`${index}_${post.username}`}
              aria-label="view instagram post"
            >
              <HiddenSpan aria-hidden="true">Instagram thumbnail</HiddenSpan>
              <InstagramCardsContainer
                src={
                  post.media_type === 'VIDEO'
                    ? post.thumbnail_url
                    : post.media_url
                }
                aria-label={post.caption && truncateString(post.caption, 125)}
              />
            </Link>
          ))
        )}
      </InstagramPostsContainer>
    </FluidContainer>
  );
};
