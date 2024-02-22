import React from 'react';
import { Button, Image, Typography } from 'components';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { useBreakpoint } from 'hooks';

interface InfoPanelProps {
  title?: string;
  subheader?: string;
  copy: (string | string[])[];
  buttonLink?: string;
  iconSrc: string;
  iconAlt: string;
  imgSrc: string;
  imgAlt: string;
  index: number;
}

const Card = styled.div`
  min-height: 400px;
  width: 100%;
  filter: drop-shadow(0px 4px 4px rgb(0, 0, 0, 0.25));
  background-color: ${Colors.white};
  padding: ${Spaces.lg} ${Spaces.xl};
  margin: ${Spaces.xl} 0px;
  display: flex;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  width: 45%;
  height: auto;
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

export const ImageAndCard = ({
  title,
  subheader,
  copy,
  buttonLink,
  iconSrc,
  iconAlt,
  imgSrc,
  imgAlt,
  index,
}: InfoPanelProps) => {
  const { isMobile, isDesktop } = useBreakpoint();
  return (
    <Card>
      {index % 2 !== 0 ? (
        <>
          {isDesktop ? (
            <></>
          ) : (
            <ImageContainer>
              <Image
                src={imgSrc}
                alt={imgAlt}
                width="100%"
                height="100%"
                style={{ objectFit: 'cover' }}
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
                  <Image src={iconSrc} alt={iconAlt} size={100} />
                  <Typography variant="label">{title}</Typography>
                </div>
                <Typography variant="labelTitle">{subheader}</Typography>
              </>
            ) : (
              <>
                <Header>
                  <div>
                    <Typography variant="label">{title}</Typography>
                    <Typography variant="labelTitle">{subheader}</Typography>
                  </div>
                  <Image src={iconSrc} alt={iconAlt} size={100} />
                </Header>
              </>
            )}

            <Copy>
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
                        <MultiColumnCopy>
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
                <Button variant="primary">Applications will open soon</Button>
              </>
            ) : (
              <>
                <Button href={buttonLink} variant="primary">
                  Sign Up
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
                  <Image src={iconSrc} alt={iconAlt} size={100} />
                  <Typography variant="label">{title}</Typography>
                </div>
                <Typography variant="labelTitle">{subheader}</Typography>
              </>
            ) : (
              <>
                <Header>
                  <div>
                    <Typography variant="label">{title}</Typography>
                    <Typography variant="labelTitle">{subheader}</Typography>
                  </div>
                  <Image src={iconSrc} alt={iconAlt} size={100} />
                </Header>
              </>
            )}
            <Copy>
              {copy &&
                copy.map((e, i) =>
                  Array.isArray(e) ? (
                    <>
                      {isMobile ? (
                        <React.Fragment key={`copy-${i}`}>
                          {e.map((e, i) => (
                            <Typography key={`mobileCopy-${i}`}>{e}</Typography>
                          ))}
                        </React.Fragment>
                      ) : (
                        <MultiColumnCopy key={`mc-${i}`}>
                          {e.map((e, i) => (
                            <Typography key={i}>{e}</Typography>
                          ))}
                        </MultiColumnCopy>
                      )}
                    </>
                  ) : (
                    <Typography key={i} as="p" variant="copy">
                      {e}
                    </Typography>
                  ),
                )}
            </Copy>
            {buttonLink === '' ? (
              <>
                <Button variant="primary">Applications will open soon</Button>
              </>
            ) : (
              <>
                <Button href={buttonLink} variant="primary">
                  Sign Up
                </Button>
              </>
            )}
          </DescriptionSection>
          {isDesktop ? (
            <></>
          ) : (
            <ImageContainer>
              <Image
                src={imgSrc}
                alt={imgAlt}
                width="100%"
                height="100%"
                style={{ objectFit: 'cover' }}
              />
            </ImageContainer>
          )}
        </>
      )}
    </Card>
  );
};
