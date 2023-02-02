import styled from 'styled-components';
import { Typography, Button, FluidContainer, VerticalLine } from 'components';

interface ButtonProps {
  text: string;
  href: string;
}
interface HeaderProps {
  title: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  buttons?: ButtonProps[];
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  > *:not(:last-child) {
    margin-right: 8px;
  }
`;

export const Header = ({
  title,
  children,
  extra,
  backgroundImage,
  buttons,
}: HeaderProps) => (
  <FluidContainer backgroundImage={backgroundImage}>
    <HeaderContainer>
      <Typography as="h1" variant="pageHeader">
        {title}
      </Typography>
      {children && (
        <>
          <VerticalLine />
          <Typography as="h2" margin="24px 0">
            {children}
          </Typography>
        </>
      )}
      {buttons && (
        <ButtonContainer>
          {buttons.map((b, i) => (
            <Button
              key={`${i}_${b.text}`}
              href={b.href}
              variant={i > 0 ? 'outline' : 'black'}
            >
              {b.text}
            </Button>
          ))}
        </ButtonContainer>
      )}
      {extra}
    </HeaderContainer>
  </FluidContainer>
);
