import React from 'react';
import Image from 'next/image';
import { Button, Typography } from 'components';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { useBreakpoint } from 'hooks';

type ButtonInfo = {
  buttonLink: string;
  buttonPlaceholder: string;
  buttonText: string;
};

interface InfoPanelProps {
  title?: string;
  subheader?: string;
  copy: (string | string[])[];
  button: ButtonInfo;
  iconSrc: string;
  iconAlt: string;
  imgSrc: string;
  imgAlt: string;
  index: number;
}

const Card = styled.div`
  height: 400px;
  width: 100%;
  filter: drop-shadow(0px 4px 4px rgb(0, 0, 0, 0.25));
  background-color: ${Colors.white};
  padding: ${Spaces.lg} ${Spaces.xl};
  margin: ${Spaces.lg} 0px;
  display: flex;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  width: 45%;
  height: auto;
  display: flex;
  object-fit: cover;
  overflow: hidden;
`;

const DescriptionSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: ${Spaces.md};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Copy = styled.div`
  display: flex;
  height: 40%;
  flex-direction: column;
  justify-content: space-evenly;
`;

const MultiColumnCopy = styled.div`
  display: flex;
  gap: 25%;
`;

export const ImageWithinCard = ({
  title,
  subheader,
  copy,
  button,
  iconSrc,
  iconAlt,
  imgSrc,
  imgAlt,
  index,
}: InfoPanelProps) => {
  const { buttonLink, buttonText, buttonPlaceholder } = button;
  const { isMobile, isDesktop } = useBreakpoint();
  return (
    <Card
      style={{
        ...(isMobile && { height: 'auto' }),
      }}
    >
      {index % 2 !== 0 ? (
        <>
          {isDesktop ? (
            <></>
          ) : (
            <ImageContainer>
              <Image
                src={imgSrc}
                alt={imgAlt}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            </ImageContainer>
          )}
          <DescriptionSection
            style={{
              ...(isDesktop && { width: '100%' }),
            }}
          >
            {isMobile ? (
              <>
                <div>
                  <Image src={iconSrc} alt={iconAlt} width={100} height={100} />
                  <Typography variant="label" as="h3">
                    {title}
                  </Typography>
                </div>
                <Typography variant="labelTitle" as="h4">
                  {subheader}
                </Typography>
              </>
            ) : (
              <>
                <Header>
                  <div>
                    <Typography variant="label" as="h3">
                      {title}
                    </Typography>
                    <Typography variant="labelTitle" as="h4">
                      {subheader}
                    </Typography>
                  </div>
                  <Image src={iconSrc} alt={iconAlt} width={100} height={100} />
                </Header>
              </>
            )}

            <Copy key={`copy`}>
              {copy &&
                copy.map((e, i) =>
                  Array.isArray(e) ? (
                    <React.Fragment key={i}>
                      {isMobile ? (
                        <React.Fragment key={`copy-${i}`}>
                          {e.map((e, innerKey) => (
                            <span key={innerKey}>
                              <Typography>{e}</Typography>
                            </span>
                          ))}
                        </React.Fragment>
                      ) : (
                        <MultiColumnCopy key={i}>
                          {e.map((e, innerIndex) => (
                            <Typography key={`multicolumnar-${innerIndex}`}>
                              {e}
                            </Typography>
                          ))}
                        </MultiColumnCopy>
                      )}
                    </React.Fragment>
                  ) : (
                    <Typography key={i} as="p" variant="copy">
                      {e}
                    </Typography>
                  ),
                )}
            </Copy>
            {buttonLink === '' ? (
              <>
                <Button variant="primary">{buttonPlaceholder}</Button>
              </>
            ) : (
              <>
                <Button href={buttonLink} variant="primary" isExternalLink>
                  {buttonText}
                </Button>
              </>
            )}
          </DescriptionSection>
        </>
      ) : (
        <>
          <DescriptionSection
            style={{
              ...(isDesktop && { width: '100%' }),
            }}
          >
            {isMobile ? (
              <>
                <div>
                  <Image src={iconSrc} alt={iconAlt} width={100} height={100} />
                  <Typography variant="label" as="h3">
                    {title}
                  </Typography>
                </div>
                <Typography variant="labelTitle" as="h4">
                  {subheader}
                </Typography>
              </>
            ) : (
              <>
                <Header>
                  <div>
                    <Typography variant="label" as="h3">
                      {title}
                    </Typography>
                    <Typography variant="labelTitle" as="h4">
                      {subheader}
                    </Typography>
                  </div>
                  <Image src={iconSrc} alt={iconAlt} width={100} height={100} />
                </Header>
              </>
            )}
            <Copy key={`copy-${index}`}>
              {copy &&
                copy.map((e, i) =>
                  Array.isArray(e) ? (
                    <React.Fragment key={i}>
                      {isMobile ? (
                        <React.Fragment key={`copy-${i}`}>
                          {e.map((e, i) => (
                            <Typography key={`mobileCopy-${i}`}>{e}</Typography>
                          ))}
                        </React.Fragment>
                      ) : (
                        <MultiColumnCopy key={`mc-${i}`}>
                          {e.map((e, i) => (
                            <Typography key={`mcCopy-${i}`}>{e}</Typography>
                          ))}
                        </MultiColumnCopy>
                      )}
                    </React.Fragment>
                  ) : (
                    <Typography key={i} as="p" variant="copy">
                      {e}
                    </Typography>
                  ),
                )}
            </Copy>
            {buttonLink === '' ? (
              <>
                <Button variant="primary">{buttonPlaceholder}</Button>
              </>
            ) : (
              <>
                <Button href={buttonLink} variant="primary" isExternalLink>
                  {buttonText}
                </Button>
              </>
            )}
          </DescriptionSection>
          {isDesktop ? (
            <></>
          ) : (
            <ImageContainer>
              <Image
                sizes="100vw"
                src={imgSrc}
                alt={imgAlt}
                width={0}
                height={0}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            </ImageContainer>
          )}
        </>
      )}
    </Card>
  );
};
