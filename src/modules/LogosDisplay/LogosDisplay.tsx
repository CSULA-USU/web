import styled from 'styled-components';
import { Image } from 'components';
import { Colors } from 'theme';

const LogoContainer = styled.div`
  padding: 2%;
`;

interface Logo {
  name: string;
  src: string;
  alt: string;
}

interface LogosDisplayStyles {
  backgroundColor?: keyof typeof Colors;
  style?: React.CSSProperties;
}

interface LogoArrayProps extends LogosDisplayStyles {
  logos: Logo[];
}

export const LogosDisplay = ({ logos, style }: LogoArrayProps) => {
  return (
    <div style={style}>
      {logos.map((c: Logo) => (
        <LogoContainer key={c.name}>
          <Image src={c.src} alt={c.alt} width="80px" />
        </LogoContainer>
      ))}
    </div>
  );
};
