import Link from 'next/link';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { Typography } from '../Typography';
import { Image } from 'components';

interface CardStyles {
  width?: string;
  minHeight?: string;
  margin?: string;
  iconWidth?: string;
  topBorder?: boolean;
  rounded?: boolean;
  hoverable?: boolean;
  backgroundColor?: keyof typeof Colors;
}

interface CardProps extends CardStyles {
  title: string;
  children?: React.ReactNode;
  linkText?: string;
  href?: string;
  iconSrc?: string;
  iconAlt?: string;
}

const StyledCard = styled.div<CardStyles>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${Spaces.xl};
  gap: 16px;
  box-shadow: 2px 4px 12px rgba(191, 191, 191, 0.25);
  background-color: ${(p) => Colors[p.backgroundColor || 'white']};
  ${(p) => p.width && `width: ${p.width};`}
  ${(p) => p.margin && `margin: ${p.margin};`}
  ${(p) => p.minHeight && `min-height: ${p.minHeight};`}
  ${(p) => p.topBorder && `border-top: 3px solid ${Colors.primary};`}
  border-radius: ${(p) => (p.rounded ? '12px' : '0px')};
  ${(p) =>
    p.hoverable &&
    `
    transition: 0.2s;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  `}
`;

export const Card = ({
  title,
  children,
  linkText,
  href,
  iconSrc,
  iconAlt,
  iconWidth,
  ...props
}: CardProps) => (
  <StyledCard {...props}>
    <div>
      {iconSrc && (
        <Image
          src={iconSrc}
          alt={iconAlt ? iconAlt : 'icon img'}
          width={iconWidth ? iconWidth : Spaces['2xl']}
          marginBottom="24px"
        />
      )}
      <br />
      <Typography as="h4" variant="titleSmall" margin="0 0 16px">
        {title}
      </Typography>
      <div>{children}</div>
    </div>
    {linkText && (
      <Typography variant="cta">
        <Link href={href || '#'}>{linkText}</Link>
      </Typography>
    )}
  </StyledCard>
);
