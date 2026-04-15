import { useState } from 'react';
import styled from 'styled-components';
import { Button, FluidContainer, Image, Typography } from 'components';
import { Spaces, Colors } from 'theme';
import { GenericModal } from 'modules/GenericModal';
import { useBreakpoint } from 'hooks';

const CircleImageButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus-visible {
    outline: 2px solid ${Colors.primary};
    outline-offset: 4px;
  }
`;

const CircleImageWrapper = styled.div`
  width: 100%;
  max-width: 350px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;

const TitleLinkButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  color: ${Colors.black};
  text-decoration: underline;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

type CircleImageAndTitleProps = {
  title: string;
  children: string;
  imgSrc: string;
  imgAlt: string;
  imageOnRight?: boolean;
};

export const CircleImageAndTitle = ({
  title,
  children,
  imgSrc,
  imgAlt,
}: CircleImageAndTitleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile, isWidescreen } = useBreakpoint();

  const imageNode = (
    <CircleImageButton
      type="button"
      onClick={() => setIsOpen(true)}
      aria-label={`Open details for ${title}`}
    >
      <CircleImageWrapper>
        <Image src={imgSrc} alt={imgAlt} width="100%" height="100%" lazy />
      </CircleImageWrapper>
    </CircleImageButton>
  );

  const titleNode = (
    <TitleLinkButton type="button" onClick={() => setIsOpen(true)}>
      <Typography as="h2" variant="eventTitle" color="black" size="md">
        {title}
      </Typography>
    </TitleLinkButton>
  );

  return (
    <>
      <FluidContainer
        flex
        flexDirection="column"
        alignItems="center"
        gap={Spaces.lg}
      >
        {titleNode}
        {imageNode}
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          View Details
        </Button>
      </FluidContainer>

      <GenericModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        width={isWidescreen ? '100%' : undefined}
      >
        <FluidContainer
          flex
          flexDirection="column"
          gap={Spaces.lg}
          alignItems="center"
        >
          <Typography variant="title" size={isMobile ? 'lg' : '2xl'}>
            {title}
          </Typography>

          <CircleImageWrapper>
            <Image src={imgSrc} alt={imgAlt} width="100%" height="100%" lazy />
          </CircleImageWrapper>

          <Typography>{children}</Typography>
        </FluidContainer>
      </GenericModal>
    </>
  );
};
