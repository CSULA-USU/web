import Link from 'next/link';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { Typography } from '../Typography';

interface CardStyles {
  width?: string;
  minHeight?: string;
  margin?: string;
  topBorder?: boolean;
}

interface CardProps extends CardStyles {
  title: string;
  children?: React.ReactNode;
  linkText?: string;
  href?: string;
}

const StyledCard = styled.div<CardStyles>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${Spaces.xl};
  gap: 16px;

  background: ${Colors.white};
  box-shadow: 2px 4px 12px rgba(191, 191, 191, 0.25);
  ${(p) => p.topBorder && `border-top: 3px solid ${Colors.primary};`}
  ${(p) => p.width && `width: ${p.width};`}
  ${(p) => p.margin && `margin: ${p.margin};`}
  ${(p) => p.minHeight && `min-height: ${p.minHeight};`}
`;

export const Card = ({
  title,
  children,
  linkText,
  href,
  ...props
}: CardProps) => (
  <StyledCard {...props}>
    <div>
      <Typography as="h4" variant="titleSmall" margin="0 0 16px">
        {title}
      </Typography>
      <div>{children}</div>
    </div>
    {linkText && (
      <Typography variant="cta">
        <Link href={href}>{linkText}</Link>
      </Typography>
    )}
  </StyledCard>
);
