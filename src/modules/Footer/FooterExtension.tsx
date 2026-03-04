import { Divider, FluidContainer, StyledLink, Typography } from 'components';
import styled from 'styled-components';
import { Colors, media, Spaces } from 'theme';

interface FooterExtensionProps {
  text: string;
  highlight?: string;
  url?: string;
  isExternalLink?: boolean;
}

const ContentWrapper = styled.div`
  ${media('mobile')(`
    text-align: center;
  `)}
`;

const HighlightWrapper = styled.span`
  display: inline;

  &:focus-within {
    outline: 2px solid ${Colors.primary};
    outline-offset: 3px;
    border-radius: 3px;
  }

  ${media('mobile')(`
    display: block;
    margin-top: ${Spaces.xs};
  `)}
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const FooterExtension = ({
  text,
  highlight,
  url,
  isExternalLink,
}: FooterExtensionProps) => (
  <FluidContainer innerMaxWidth="1200px" backgroundColor="greyDarkest">
    <ContentWrapper>
      <Typography
        as="p"
        variant="title"
        color="white"
        style={{ overflowWrap: 'anywhere' }}
      >
        {text}
        {highlight && (
          <>
            {' '}
            <HighlightWrapper>
              {url ? (
                <Typography as="span" variant="title" color="primary">
                  <StyledLink
                    href={url}
                    isExternalLink={isExternalLink}
                    isInverseUnderlineStyling
                  >
                    {highlight}
                    {isExternalLink && (
                      <ScreenReaderOnly> (opens in a new tab)</ScreenReaderOnly>
                    )}
                  </StyledLink>
                </Typography>
              ) : (
                <Typography as="span" variant="title" color="primary">
                  {highlight}
                </Typography>
              )}
            </HighlightWrapper>
          </>
        )}
      </Typography>
    </ContentWrapper>
    <Divider color="grey" margin={`${Spaces.lg} 0 0`} />
  </FluidContainer>
);
