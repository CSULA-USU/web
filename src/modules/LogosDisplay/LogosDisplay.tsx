import styled from 'styled-components';
import { Image } from 'components';

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1%;
  background-color: green;
`;

interface Logo {
  name: string;
  src: string;
  alt: string;
}

interface LogoArrayProps {
  logos: Logo[];
}

export const LogosDisplay = ({ logos }: LogoArrayProps) => {
  return logos.map((c: Logo) => (
    <LogoContainer key={c.name}>
      <Image src={c.src} alt={c.alt} width="6%" />
    </LogoContainer>
  ));
};
