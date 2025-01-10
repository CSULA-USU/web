import styled from 'styled-components';
import { Header, OfficeHours } from 'modules';
import { FluidContainer, Image } from 'components';
import { useBreakpoint } from 'hooks';
import { Spaces } from 'theme';

interface ButtonProps {
  text: string;
  href: string;
  handleClick?: () => void;
}
interface HeaderProps {
  title: string;
  address?: string;
  backgroundImage?: string;
  heroImage?: string;
  hours?: [{ title: string; times: string[] }];
  children?: React.ReactNode;
  extra?: React.ReactNode;
  phoneNumber?: string;
  buttons?: ButtonProps[];
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

const HeaderLeftContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${Spaces.xl};
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// const ButtonContainer = styled.div`
//   margin-top: ${Spaces.md};
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   > *:not(:last-child) {
//     margin-right: 8px;
//   }
// `;

export const HeaderWithImage = ({
  address,
  title,
  children,
  extra,
  backgroundImage,
  buttons,
  heroImage,
  hours,
  phoneNumber,
}: HeaderProps) => {
  const { isDesktop } = useBreakpoint();
  const hasChildren =
    children !== undefined && children !== null && children !== false;
  return (
    <header>
      <FluidContainer>
        <HeaderContainer>
          <HeaderLeftContainer>
            <Header
              title={title}
              buttons={buttons}
              backgroundImage={backgroundImage}
            >
              {hasChildren ? <>{children}</> : null}
            </Header>
            {isDesktop && heroImage && (
              <Image src={heroImage} alt="" width="100%" height="300px" />
            )}
          </HeaderLeftContainer>
          {!isDesktop && heroImage && (
            <Image src={heroImage} alt="" width={400} height={500} />
          )}
          {hours || phoneNumber || extra || address ? (
            <FluidContainer backgroundColor="transparent">
              <OfficeHours
                address="{address}"
                phoneNumber="{phoneNumber}"
                hours={hours}
              />
            </FluidContainer>
          ) : null}
        </HeaderContainer>
      </FluidContainer>
    </header>
  );
};
