import { Divider, FluidContainer, StyledLink, Typography } from 'components';
import styled from 'styled-components';
import { Colors, FontSizes, media, Spaces } from 'theme';

interface FooterExtensionProps {
  text: string;
  highlight?: string;
  url?: string;
  isExternalLink?: boolean;
}

const ContentWrapper = styled.div`
  .footer-extension-title,
  .footer-extension-title *,
  .footer-extension-highlight,
  .footer-extension-highlight * {
    overflow-wrap: anywhere;
  }

  ${media('tablet')(`
    .footer-extension-title,
    .footer-extension-title *,
    .footer-extension-highlight,
    .footer-extension-highlight * {
      font-size: ${FontSizes.xl};
      line-height: 1.35;
    }
  `)}

  ${media('mobile')(`
    text-align: center;

    .footer-extension-title,
    .footer-extension-title *,
    .footer-extension-highlight,
    .footer-extension-highlight * {
      font-size: ${FontSizes.lg};
      line-height: 1.3;
    }
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
        className="footer-extension-title"
      >
        {text}
        {highlight && (
          <>
            {' '}
            <HighlightWrapper>
              {url ? (
                <Typography
                  as="span"
                  variant="title"
                  color="primary"
                  className="footer-extension-highlight"
                >
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
                <Typography
                  as="span"
                  variant="title"
                  color="primary"
                  className="footer-extension-highlight"
                >
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
