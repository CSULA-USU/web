import styled from 'styled-components';
import { useBreakpoint } from 'hooks';
import { FluidContainer, Typography, Button } from 'components';
import { Colors, Spaces } from 'theme';

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
  height?: string;
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  max-width: 640px;
  margin: 0 auto;
  position: relative;
  padding: 8px;
  z-index: 2;

  & > * {
    position: relative;
    z-index: 2;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${Colors.black};
    opacity: 0.7;
    z-index: 1;
  }
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

const OutsideContainer = styled.div<{
  backgroundImage?: string;
  isDesktop?: boolean;
  height?: string;
}>`
  padding: 36px;
  position: relative;
  background: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: ${(props) => (!props.isDesktop ? 'center' : 'bottom')};
  display: flex;
  align-items: end;
  background-color: black;
  height: ${(props) => props.height};
  @media (max-width: 768px) {
    height: 420px;
  }
  @media (max-width: 580px) {
    height: 320px;
  }
`;

export const ShadedImageHeader = ({
  title,
  children,
  extra,
  backgroundImage,
  buttons,
  height,
}: HeaderProps) => {
  const { isMobile, isDesktop } = useBreakpoint();
  return (
    <header>
      <OutsideContainer
        backgroundImage={backgroundImage}
        isDesktop={isDesktop}
        height={height}
      >
        <HeaderContainer>
          <Typography
            as="h1"
            variant="pageHeader"
            size={isMobile ? 'xl' : '4xl'}
            color="white"
          >
            {title}
          </Typography>
        </HeaderContainer>
      </OutsideContainer>
      <FluidContainer
        justifyContent="center"
        padding={isDesktop ? '36px' : '36px 72px 0'}
      >
        <FluidContainer padding={isDesktop ? '0' : '0 72px'}>
          {children && (
            <>
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
        </FluidContainer>
      </FluidContainer>
    </header>
  );
};
