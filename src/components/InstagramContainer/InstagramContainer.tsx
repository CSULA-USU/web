import styled from 'styled-components';
import { media, Spaces } from 'theme';
import { useBreakpoint } from 'hooks';
import Link from 'next/link';
import { FluidContainer, Typography, Image } from 'components';
interface InstagramData {
  id: string;
  username: string;
  caption: string;
  media_url: string;
  permalink: string;
  media_type: string;
}

interface InstagramContainerProps {
  instagramPosts: InstagramData[];
  username: string;
}
const InstagramCardsContainer = styled.div`
  max-width: 320px;
  max-height: 320px;
  ${media('tablet')(`width: 50%`)}
  ${media('mobile')(`width: 100%`)}
  padding: ${Spaces.xs};
`;
export const InstagramContainer = ({
  instagramPosts,
  username,
}: InstagramContainerProps) => {
  const { isMobile } = useBreakpoint();
  return (
    <>
      <FluidContainer>
        <Typography variant="title">
          Follow Us on Instagram @{username}
        </Typography>
      </FluidContainer>
      <FluidContainer flex flexWrap="wrap" justifyContent="center">
        {isMobile ? (
          <InstagramCardsContainer>
            <Link
              href={instagramPosts[0].permalink && instagramPosts[0].permalink}
            >
              {instagramPosts[0].media_type === 'VIDEO' ? (
                <video width="100%" height="100%">
                  <source src={instagramPosts[0].media_url}></source>
                </video>
              ) : (
                <Image
                  src={instagramPosts[0].media_url}
                  alt={`${instagramPosts[0].username} instagram post`}
                  width="100%"
                  height="100%"
                  borderRadius="12px"
                ></Image>
              )}
            </Link>
          </InstagramCardsContainer>
        ) : (
          instagramPosts.map((post, index) => (
            <InstagramCardsContainer key={`${index}_${post.username}`}>
              <Link href={post.permalink}>
                {post.media_type === 'VIDEO' ? (
                  <video width="100%" height="100%">
                    {' '}
                    <source src={post.media_url}></source>
                  </video>
                ) : (
                  <Image
                    src={post.media_url}
                    alt={`${post.username} instagram post`}
                    borderRadius="12px"
                    width="100%"
                    height="100%"
                  ></Image>
                )}
              </Link>
            </InstagramCardsContainer>
          ))
        )}
      </FluidContainer>
    </>
  );
};
