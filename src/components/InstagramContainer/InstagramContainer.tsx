import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { useBreakpoint } from 'hooks';
import Link from 'next/link';
import { FluidContainer, Typography } from 'components';
interface InstagramData {
  id: string;
  username: string;
  caption: string;
  media_url: string;
  permalink: string;
  media_type: string;
  thumbnail_url: string;
}

interface InstagramContainerProps {
  instagramPosts: InstagramData[];
  username: string;
  url: string;
}

interface InstagramContainerStyleProps {
  src?: string;
}
const InstagramCardsContainer = styled.div<InstagramContainerStyleProps>`
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
export const InstagramContainer = ({
  instagramPosts,
  username,
  url,
}: InstagramContainerProps) => {
  const { isMobile } = useBreakpoint();
  return (
    <>
      <FluidContainer>
        <Typography variant={isMobile ? 'titleSmall' : 'title'}>
          Follow Us on Instagram{' '}
          <InstagramLinkContainter>
            <Link href={url && url}>
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
