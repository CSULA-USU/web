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
  flex-direction: column;
  margin: ${Spaces.sm} 0 0 0;
`;

const UpperContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  margin: 0 0 ${Spaces.sm} 0;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
`;

const QRContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconAndInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: ${Spaces.sm};
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
        height="90vh"
        width="95vw"
      >
        <StaffModalContainer>
          <UpperContainer>
            <ImageContainer>
              <Image src={src} alt={alt} width="220px" height="245px" />
            </ImageContainer>
            <InfoContainer>
              <Typography as="h1" variant="pageHeader" size="xl" lineHeight="1">
                {name}
              </Typography>
              {pronouns && (
                <em>
                  <Typography size="sm" margin="4px 0 16px 0" as="p">
                    {pronouns}
                  </Typography>
                </em>
              )}
              <Typography
                as="p"
                variant="cta"
                color="gold"
                size="md"
                weight="700"
                margin="0"
              >
                {title}
              </Typography>
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
            </InfoContainer>
          </UpperContainer>
          <QRContainer>
            <StyledLink
              isInverseUnderlineStyling
              href={`/staff/${toKebabCase(name)}`}
            >
              <Typography
                color="greyDarker"
                variant="span"
                margin={`0 0 ${Spaces.sm} 0`}
              >
                View Card
              </Typography>
            </StyledLink>
            <QRCodeSVG
              value={`https://www.calstatelausu.org/staff/${toKebabCase(name)}`}
            />
          </QRContainer>
        </StaffModalContainer>
      </GenericModal>
    </>
  );
};
