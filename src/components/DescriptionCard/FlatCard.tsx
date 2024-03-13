import { Image, Typography } from 'components';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { useBreakpoint } from 'hooks';

interface FlatCardProps {
  children: React.ReactNode;
  imgSrc: string;
  imgAlt: string;
}

const BorderedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid ${Colors.greyLighter};
  padding: ${Spaces.lg};
  margin-bottom: ${Spaces.lg};
  max-height: 275px;
  border-radius: ${Spaces.lg};
  gap: ${Spaces.xl};
`;
export const FlatCard = ({ children, imgSrc, imgAlt }: FlatCardProps) => {
  const { isTablet, returnByBreakpoint } = useBreakpoint();
  const descriptionCardWidth = returnByBreakpoint({
    tablet: '100%',
    desktop: 'calc(50% - 16px)',
    widescreen: 'calc(25% - 16px)',
  });
  return (
    <BorderedContainer
      style={{
        width: descriptionCardWidth,
        justifyContent: isTablet ? 'space-around' : '',
      }}
    >
      <Image alt={imgAlt} src={imgSrc} width="100%" height="45%" lazy />
      <Typography as="p" variant="copy">
        {children}
      </Typography>
    </BorderedContainer>
  );
};
