import styled from 'styled-components';
import { Image } from 'components';

interface HeaderStyles {
  background?: string;
}

interface SideImageHeaderProps extends HeaderStyles {
  imgSrc: string;
  imgAlt: string;
  imgWidth?: string;
  children?: React.ReactNode;
}
const Container = styled.div<HeaderStyles>`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  ${(p) => p.background && `background: url(${p.background});`}
`;

export const SideImageHeader = ({
  children,
  imgSrc,
  imgAlt,
  imgWidth,
  ...props
}: SideImageHeaderProps) => (
  <Container {...props}>
    {imgSrc && <Image src={imgSrc} alt={imgAlt} width={imgWidth} />}
    {children}
  </Container>
);
