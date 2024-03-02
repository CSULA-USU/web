import styled from 'styled-components';
import { useBreakpoint } from 'hooks';
import { Typography, Button, FluidContainer, VerticalLine } from 'components';
import { Spaces } from 'theme';

interface ButtonProps {
  text: string;
  href: string;
  handleClick?: () => void;
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
  margin-top: ${Spaces.md};
  display: flex;
  flex-wrap: wrap;
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
}: HeaderProps) => {
  const { isMobile } = useBreakpoint();
  return (
    <FluidContainer backgroundImage={backgroundImage}>
      <HeaderContainer>
        <Typography
          as="h1"
          variant="pageHeader"
          size={isMobile ? '2xl' : '4xl'}
        >
          {title}
        </Typography>
        {children && (
          <>
            <VerticalLine />
            {typeof children === 'string' ? (
              <Typography as="p" margin="24px 0">
                {children}
              </Typography>
            ) : (
              children
            )}
          </>
        )}
        {buttons && (
          <ButtonContainer>
            {buttons.map((b, i) => (
              <Button
                onClick={b.handleClick}
                key={`${i}_${b.text}`}
                href={b.href}
                variant={i > 0 ? 'outline' : 'black'}
                margin="8px"
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
};
