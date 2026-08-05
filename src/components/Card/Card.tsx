import Link from 'next/link';
import styled from 'styled-components';
import { useBreakpoint } from 'hooks';
import { Spaces } from 'theme';
import { Typography } from '../Typography';
import { Image, Panel } from 'components';
import type { PanelStyleProps } from '../Panel';

interface CardStyles extends PanelStyleProps {
  iconWidth?: string;
  iconHeight?: string;
}

interface CardProps extends CardStyles {
  title?: string;
  /** Heading level for `title`, so a card can own its section's outline. */
  titleAs?: 'h2' | 'h3' | 'h4';
  children?: React.ReactNode;
  linkText?: string;
  href?: string;
  iconSrc?: string;
  iconAlt?: string;
  iconElement?: React.ReactNode;
  isExternalLink?: boolean;
}

const IconContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin: 16px 0;
  }
`;

export const Card = ({
  title,
  titleAs = 'h3',
  children,
  linkText,
  href,
  iconSrc,
  iconAlt,
  iconElement,
  iconWidth,
  iconHeight,
  isExternalLink = false,
  ...props
}: CardProps) => {
  const { isMobile } = useBreakpoint();
  return (
    <Panel {...props}>
      <div>
        {iconSrc && (
          <IconContainer>
            <Image
              src={iconSrc}
              alt={iconAlt ? iconAlt : ''}
              width={iconWidth ? iconWidth : Spaces['2xl']}
              height={iconHeight ? iconHeight : Spaces['2xl']}
              marginBottom="24px"
              lazy
            />
          </IconContainer>
        )}
        {iconElement && <IconContainer>{iconElement}</IconContainer>}
        <br />
        <Typography
          as={titleAs}
          variant="titleSmall"
          margin="0 0 16px"
          size={isMobile ? 'lg' : 'xl'}
        >
          {title}
        </Typography>
        <div>{children}</div>
      </div>
      {linkText && (
        <Typography variant="cta">
          <Link href={href || '#'} target={isExternalLink ? '_blank' : '_self'}>
            {linkText}
          </Link>
        </Typography>
      )}
    </Panel>
  );
};
