import { useState } from 'react';
import styled from 'styled-components';
import { QRCodeSVG } from 'qrcode.react';
import { BiSolidUserDetail, BiSolidPhone } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { toKebabCase } from 'utils/stringhelpers';
import { Typography } from '../Typography';
import { Image, Panel, StyledLink } from 'components';
import { GenericModal } from 'modules';
import { Spaces } from 'theme';
import { useBreakpoint } from 'hooks';

interface CardStyles {
  margin?: string;
  width?: string;
  hoverable?: boolean;
  rounded?: boolean;
}

interface CardProps extends CardStyles {
  alt: string;
  name: string;
  title: string;
  src: string;
  children?: React.ReactNode;
  department?: string;
  head?: string;
  img?: string;
  phone?: string;
  pronouns?: string;
  tags?: string[];
  url?: string;
  bio?: string;
  email?: string;
}

const CenterWord = styled.div`
  text-align: center;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const NameSection = styled.div`
  height: 80px;
`;

const StaffCard = styled.button`
  background: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
  border: none;
`;

const StaffModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: ${Spaces.sm} 0 0 0;
`;

const UpperContainer = styled.div<{ screenSize: boolean }>`
  display: flex;
  flex-direction: ${({ screenSize }) => (screenSize ? 'column' : 'row')};
  max-width: 800px;
`;

const ImageContainer = styled.div<{ screenSize: boolean }>`
  margin: 0 ${({ screenSize }) => (screenSize ? 0 : Spaces.md)} ${Spaces.sm} 0;
`;

const InfoContainer = styled.div<{ screenSize: boolean }>`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  max-width: 400px;
`;

const IconAndInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${Spaces.sm};
`;

const InfoContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const IconAndInfoContainerRight = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  margin-right: ${Spaces.sm};
  flex-shrink: 0;
`;

const InfoNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QRContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${Spaces.sm};
`;

const QRLinkContainer = styled.div`
  margin-bottom: ${Spaces.sm};
`;

export const StaffCardWithModal = ({
  name,
  head,
  title,
  children,
  src,
  alt,
  pronouns,
  phone,
  email,
  bio,
  ...props
}: CardProps) => {
  const [showModal, setShowModal] = useState(false);
  const { isDesktop } = useBreakpoint();

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <StaffCard onClick={() => openModal()} aria-label="open modal">
        <Panel {...props} width={'304px'} height="512px">
          <CenterWord>
            <div>
              {head ? (
                <>
                  <Typography
                    as="h3"
                    color="gold"
                    variant="copy"
                    weight="700"
                    size="md"
                    style={{ display: 'block' }}
                  >
                    {head}
                  </Typography>
                </>
              ) : (
                <></>
              )}
              <Typography
                as="h2"
                color="gold"
                variant="copy"
                weight="700"
                size="md"
              >
                {title}
              </Typography>
            </div>
            <div>
              <Image src={src} alt={alt} width="220px" height="245px" />
              <NameSection>
                <Typography size="sm" weight="700" variant="labelTitle">
                  {name}
                </Typography>
                {children}
              </NameSection>
            </div>
          </CenterWord>
        </Panel>
      </StaffCard>
      <GenericModal
        isOpen={showModal}
        onRequestClose={() => closeModal()}
        height={isDesktop ? '90vh' : 'auto'}
        width={isDesktop ? '95vw' : 'auto'}
      >
        <StaffModalContainer>
          <UpperContainer screenSize={isDesktop}>
            <ImageContainer screenSize={isDesktop}>
              <Image src={src} alt={alt} width="220px" height="245px" />
            </ImageContainer>
            <InfoContainer screenSize={isDesktop}>
              <InfoNameContainer>
                <Typography
                  as="h1"
                  variant="pageHeader"
                  size="xl"
                  lineHeight="1"
                >
                  {name}
                </Typography>
                {pronouns && (
                  <Typography
                    size="sm"
                    as="p"
                    margin={`0 0 ${Spaces.sm} 0`}
                    color="grey"
                    variant="span"
                  >
                    {pronouns}
                  </Typography>
                )}
                <Typography
                  as="p"
                  variant="cta"
                  color="gold"
                  size="md"
                  weight="700"
                  margin={`0 0 ${Spaces.sm} 0`}
                  lineHeight="1.2"
                >
                  {title}
                </Typography>
              </InfoNameContainer>
              <InfoContactContainer>
                <IconAndInfoContainer>
                  <IconContainer>
                    <MdEmail
                      style={{
                        height: '16px',
                        width: '16px',
                        flexShrink: 0,
                        color: 'white',
                      }}
                    />
                  </IconContainer>
                  <IconAndInfoContainerRight>
                    <Typography color="greyDarker">{email}</Typography>
                  </IconAndInfoContainerRight>
                </IconAndInfoContainer>
                {phone && (
                  <IconAndInfoContainer>
                    <IconContainer>
                      <BiSolidPhone
                        style={{
                          height: '16px',
                          width: '16px',
                          flexShrink: 0,
                          color: 'white',
                        }}
                      />
                    </IconContainer>
                    <IconAndInfoContainerRight>
                      <Typography color="greyDarker">{phone}</Typography>
                    </IconAndInfoContainerRight>
                  </IconAndInfoContainer>
                )}
                {bio && (
                  <IconAndInfoContainer>
                    <IconContainer>
                      <BiSolidUserDetail
                        style={{
                          height: '16px',
                          width: '16px',
                          flexShrink: 0,
                          color: 'white',
                        }}
                      />
                    </IconContainer>
                    <IconAndInfoContainerRight>
                      <Typography color="greyDarker">{bio}</Typography>
                    </IconAndInfoContainerRight>
                  </IconAndInfoContainer>
                )}
              </InfoContactContainer>
            </InfoContainer>
          </UpperContainer>
          <QRContainer>
            <QRLinkContainer>
              <StyledLink
                href={`/staff/${toKebabCase(name)}`}
                isInverseUnderlineStyling
              >
                <Typography color="greyDarker" variant="span">
                  View Virtual Cardasdf
                </Typography>
              </StyledLink>
            </QRLinkContainer>
            <QRCodeSVG
              value={`https://www.calstatelausu.org/staff/${toKebabCase(name)}`}
            />
          </QRContainer>
        </StaffModalContainer>
      </GenericModal>
    </>
  );
};
