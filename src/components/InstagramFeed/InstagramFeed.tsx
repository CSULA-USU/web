import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { useBreakpoint } from 'hooks';
import Link from 'next/link';
import { FluidContainer, Typography } from 'components';
import { useCallback, useEffect, useState } from 'react';
import { fetchInstagramFeed } from 'api';
import { Departments, InstagramPost } from 'types';

interface InstagramFeedProps {
  department: Departments;
  postsToShow?: number;
}

interface InstagramFeedStyleProps {
  src?: string;
}
const InstagramCardsContainer = styled.div<InstagramFeedStyleProps>`
  width: 320px;
  height: 320px;
  background: ${(props) => `url(${props.src}) no-repeat`};
  background-size: cover;
  background-position: center center;
  margin: ${Spaces.sm};
  border-radius: 8px;
`;
const InstagramLinkContainter = styled.span`
  :hover {
    color: ${Colors.gold};
  }
`;
export const InstagramFeed = ({
  department,
  postsToShow = 12,
}: InstagramFeedProps) => {
  const { isMobile } = useBreakpoint();
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);

  const getInstgramFeed = useCallback(async () => {
    const { data } = await fetchInstagramFeed(department);
    setInstagramPosts(data.data.slice(0, postsToShow));
  }, [department, postsToShow]);

  useEffect(() => {
    getInstgramFeed();
  }, [getInstgramFeed]);

  const username = instagramPosts[0]?.username;
  const url = `https://www.instagram.com/${username}`;

  return (
    <>
      <FluidContainer>
        <Typography variant={isMobile ? 'titleSmall' : 'title'}>
          Follow Us on Instagram{' '}
          <InstagramLinkContainter>
            <Link href={url}>
              <strong>@{username}</strong>
            </Link>{' '}
          </InstagramLinkContainter>
        </Typography>
      </FluidContainer>
      <FluidContainer flex flexWrap="wrap" justifyContent="center">
        {isMobile ? (
          <Link
            href={instagramPosts[0].permalink && instagramPosts[0].permalink}
          >
            <InstagramCardsContainer
              src={
                instagramPosts[0].media_type === 'VIDEO'
                  ? instagramPosts[0].thumbnail_url
                  : instagramPosts[0].media_url
              }
            ></InstagramCardsContainer>
          </Link>
        ) : (
          instagramPosts.map((post, index) => (
            <Link href={post.permalink} key={`${index}_${post.username}`}>
              <InstagramCardsContainer
                src={
                  post.media_type === 'VIDEO'
                    ? post.thumbnail_url
                    : post.media_url
                }
              ></InstagramCardsContainer>
            </Link>
          ))
        )}
      </FluidContainer>
    </>
  );
};
