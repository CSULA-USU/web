import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { Typography, Image } from 'components';

interface CardStyles {
  width?: string;
  minHeight?: string;
  margin?: string;
  rounded?: boolean;
  hoverable?: boolean;
  backgroundColor?: keyof typeof Colors;
}

interface CardProps extends CardStyles {
  imgSrc: string;
  imgAlt: string;
  children?: React.ReactNode;
}
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCard = styled.div<CardStyles>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${Spaces.xl};
  gap: 16px;
  box-shadow: 2px 4px 12px rgba(191, 191, 191, 0.25);
  background-color: ${(p) => Colors[p.backgroundColor || 'white']};
  ${(p) => p.width && `width: ${p.width};`}
  ${(p) => p.margin && `margin: ${p.margin};`}
  ${(p) => p.minHeight && `min-height: ${p.minHeight};`}

  border-radius: ${(p) => (p.rounded ? '12px' : '0px')};
  ${(p) =>
    p.hoverable &&
    `
    transition: 0.2s;
    opacity: 0.8;
    &:hover {
      background-color: ${Colors.primary};
      opacity: 1;
      box-shadow: 0px 12px 40px ${Colors.primary};
    }
  `}
`;

export const DescriptionCard = ({
  children,
  imgSrc,
  imgAlt,
  ...props
}: CardProps) => (
  <StyledCard {...props}>
    <div>
      <IconContainer>
        <Image src={imgSrc} alt={imgAlt}></Image>
      </IconContainer>
      <Typography margin="24px 0" weight="300">
        {children}
      </Typography>
    </div>
  </StyledCard>
);
