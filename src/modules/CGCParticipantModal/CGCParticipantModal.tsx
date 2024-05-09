import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Button, Typography } from '../../components';
import { useBreakpoint } from 'hooks';
import { Colors, media, Spaces } from 'theme';
import { PiArrowSquareInFill } from 'react-icons/pi';

interface FullName {
  firstName: string;
  lastName: string;
  middleName?: string;
  prefix?: string;
  suffix?: string;
}

interface ParticipantModalProps {
  fullName: FullName;
  pronouns?: string;
  degree: string;
  major: string;
  minor?: string;
  certificate?: string;
  secondDegree?: string;
  secondMajor?: string;
  secondMinor?: string;
  secondCertificate?: string;
  acknowledgement?: string;
  img?: string;
}

const CertificateContainer = styled.div<{ hasAcknowledgement?: string }>`
  justify-content: space-between;
  margin: ${(props) =>
    props.hasAcknowledgement ? '0 0 24px 0' : '0px 0px 8px 0px'};
`;

const DegreeAndMajorContainer = styled.div`
  justify-content: space-between;
  margin-bottom: 8px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MinorContainer = styled.div<{ hasCertificate?: string }>`
  justify-content: space-between;
  margin: ${(props) =>
    props.hasCertificate ? '0 0 8px 0' : '0px 0px 24px 0px'};
`;

const ModalContainer = styled.div`
  display: flex;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Participant = styled.span`
  background-color: ${Colors.greyLightest};
  border: 1px solid ${Colors.greyLighter};
  margin: ${Spaces.sm} 0;
  padding: ${Spaces.sm};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  filter: drop-shadow(0px 2px 2px rgb(0, 0, 0, 0.2));
`;

const PictureContainer = styled.div`
  margin-right: 24px;
  width: 320px;
  ${media('mobile')('margin: 0px 0px 16px 0px; width: 100%')}
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;
/* flex-shrink property prevents picture container from shrinking */

const MobileModalStyle = {
  overflow: 'auto',
  overlay: {
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    overflow: 'scroll',
    padding: '40px',
    top: '50%',
    bottom: 'auto',
    transform: 'translate(0%, -50%)',
  },
};

const DesktopModalStyle = {
  overflow: 'auto',
  overlay: {
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    padding: '40px',
    top: '50%',
    left: '50%',
    bottom: 'auto',
    right: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

export const CGCParticipantModal = ({
  participantData,
}: {
  participantData: ParticipantModalProps;
}) => {
  const [showModal, setShowModal] = useState(false);
  const { isMobile } = useBreakpoint();

  const regex = /\((.*?)\)/;
  const matchedDegree =
    participantData && participantData.degree.toUpperCase().match(regex);
  const degree = matchedDegree
    ? matchedDegree[1]
    : participantData.degree.toUpperCase();
  const matchedSecondDegree =
    participantData.secondDegree &&
    participantData.secondDegree.toUpperCase().match(regex);
  const secondDegree = matchedSecondDegree
    ? matchedSecondDegree[1]
    : participantData.secondDegree &&
      participantData.secondDegree.toUpperCase();

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }
  return (
    <>
      {isMobile ? (
        <>
          <Participant onClick={() => openModal()}>
            <Typography variant="title" size="sm">{`${
              participantData.fullName?.firstName
            }${
              participantData.fullName?.middleName
                ? ' ' + participantData.fullName?.middleName
                : ''
            } ${participantData.fullName?.lastName}${
              participantData.fullName?.suffix
                ? ' ' + participantData.fullName?.suffix
                : ''
            }`}</Typography>
            <PiArrowSquareInFill size="24" style={{ height: '28px' }} />
          </Participant>
          <Modal
            isOpen={showModal}
            onRequestClose={closeModal}
            contentLabel="participant modal"
            style={MobileModalStyle}
          >
            <ModalContainer>
              <Typography
                as="h1"
                variant="pageHeader"
                size="2xl"
                lineHeight="1"
              >{`${
                participantData.fullName?.prefix
                  ? participantData.fullName?.prefix + ' '
                  : ''
              }${participantData.fullName?.firstName}${
                participantData.fullName?.middleName
                  ? ' ' + participantData.fullName?.middleName
                  : ''
              } ${participantData.fullName?.lastName}${
                participantData.fullName?.suffix
                  ? ' ' + participantData.fullName?.suffix
                  : ''
              }`}</Typography>
              {participantData.pronouns &&
                participantData.pronouns.toUpperCase() != 'N/A' && (
                  <em>
                    <Typography
                      variant="span"
                      size="sm"
                      margin="4px 0 16px 0"
                      as="h2"
                    >
                      {participantData.pronouns}
                    </Typography>
                  </em>
                )}
              <DegreeAndMajorContainer>
                <Typography size="md" as="h2">
                  <strong>{degree}</strong>
                </Typography>
                <Typography size="md" as="h3">
                  {participantData.major.toUpperCase()}
                </Typography>
                {participantData.secondDegree && (
                  <Typography size="md" as="h2">
                    <strong>{secondDegree}</strong>
                  </Typography>
                )}
                {participantData.secondMajor &&
                  participantData.secondMajor.toUpperCase() != 'N/A' && (
                    <Typography size="md" as="h3">
                      {participantData.secondMajor.toUpperCase()}
                    </Typography>
                  )}
              </DegreeAndMajorContainer>
              {participantData.minor &&
                participantData.minor.toUpperCase() != 'N/A' && (
                  <>
                    <MinorContainer>
                      <Typography
                        size="md"
                        as="h4"
                        variant="span"
                        lineHeight="1"
                      >
                        {`Minor:`}
                      </Typography>
                      <Typography
                        size="md"
                        as="h4"
                        variant="span"
                        lineHeight="1"
                      >
                        {`${participantData.minor?.toUpperCase()}`}
                      </Typography>
                      {participantData.secondMinor && (
                        <Typography size="md" as="h4" variant="span">
                          {`${participantData.secondMinor.toUpperCase()}`}
                        </Typography>
                      )}
                    </MinorContainer>
                  </>
                )}
              {participantData.certificate &&
                participantData.certificate.toUpperCase() != 'N/A' && (
                  <CertificateContainer>
                    <Typography size="md" as="h4" variant="span" lineHeight="1">
                      {`Certificate:`}
                    </Typography>
                    <Typography size="md" as="h4" variant="span" lineHeight="1">
                      {`${participantData.certificate.toUpperCase()}`}
                    </Typography>
                  </CertificateContainer>
                )}
              {participantData.secondCertificate && (
                <CertificateContainer>
                  <Typography size="md" as="h4" variant="span" lineHeight="1">
                    {`${participantData.secondCertificate.toUpperCase()}`}
                  </Typography>
                </CertificateContainer>
              )}
              {participantData.img ? (
                <>
                  <PictureContainer>
                    <Image
                      src={`${participantData.img}`}
                      alt="graduate participant"
                      height={0}
                      width={0}
                      sizes="100vw"
                      style={{
                        width: '100%',
                        height: 'auto',
                      }}
                    />
                  </PictureContainer>
                </>
              ) : (
                <></>
              )}
              <InfoContainer>
                {participantData.acknowledgement &&
                  participantData.acknowledgement.toUpperCase() != 'N/A' && (
                    <Typography variant="span" size="sm">
                      {participantData.acknowledgement}
                    </Typography>
                  )}
              </InfoContainer>
            </ModalContainer>
          </Modal>
        </>
      ) : (
        <>
          <Button variant="transparent" onClick={() => openModal()} padding="0">
            <Typography as="h3" variant="label">{`${
              participantData.fullName?.firstName
            }${
              participantData.fullName?.middleName
                ? ' ' + participantData.fullName?.middleName
                : ''
            } ${participantData.fullName?.lastName}${
              participantData.fullName?.suffix
                ? ' ' + participantData.fullName?.suffix
                : ''
            }`}</Typography>
          </Button>
          <Modal
            isOpen={showModal}
            onRequestClose={closeModal}
            contentLabel="participant modal"
            style={DesktopModalStyle}
          >
            <ModalContainer>
              {participantData.img ? (
                <>
                  <PictureContainer>
                    <Image
                      src={`${participantData.img}`}
                      alt="graduate participant photo"
                      height={0}
                      width={0}
                      sizes="100vw"
                      style={{
                        width: '100%',
                        height: 'auto',
                      }}
                    />
                  </PictureContainer>
                </>
              ) : (
                <></>
              )}
              <InfoContainer>
                <Typography
                  as="h1"
                  variant="pageHeader"
                  size="3xl"
                  margin="0 0 4px 0"
                >{`${
                  participantData.fullName?.prefix
                    ? participantData.fullName?.prefix + ' '
                    : ''
                }${participantData.fullName?.firstName}${
                  participantData.fullName?.middleName
                    ? ' ' + participantData.fullName?.middleName
                    : ''
                } ${participantData.fullName?.lastName}${
                  participantData.fullName?.suffix
                    ? ' ' + participantData.fullName?.suffix
                    : ''
                }`}</Typography>
                {participantData.pronouns &&
                  participantData.pronouns.toUpperCase() != 'N/A' && (
                    <em>
                      <Typography
                        variant="span"
                        size="md"
                        margin="0px 0px 24px 0px"
                        as="h2"
                      >
                        {participantData.pronouns}
                      </Typography>
                    </em>
                  )}
                <DegreeAndMajorContainer>
                  <Typography size="lg" as="h2">
                    <strong>{degree}</strong>
                  </Typography>
                  <Typography size="lg" as="h3">
                    {participantData.major.toUpperCase()}
                  </Typography>
                </DegreeAndMajorContainer>
                <DegreeAndMajorContainer>
                  {participantData.secondDegree && (
                    <Typography size="lg" as="h2">
                      <strong>{secondDegree}</strong>
                    </Typography>
                  )}
                  {participantData.secondMajor &&
                    participantData.secondMajor.toUpperCase() != 'N/A' && (
                      <Typography size="lg" as="h3">
                        {participantData.secondMajor.toUpperCase()}
                      </Typography>
                    )}
                </DegreeAndMajorContainer>
                {participantData.minor &&
                  participantData.minor.toUpperCase() != 'N/A' && (
                    <>
                      <MinorContainer>
                        <Typography
                          size="lg"
                          as="h4"
                          variant="span"
                          lineHeight="1"
                        >
                          {`Minor:`}
                        </Typography>
                        <Typography
                          size="lg"
                          as="h4"
                          variant="span"
                          lineHeight="1"
                        >
                          {`${participantData.minor?.toUpperCase()}`}
                        </Typography>
                        {participantData.secondMinor && (
                          <Typography size="lg" as="h4" variant="span">
                            {`${participantData.secondMinor.toUpperCase()}`}
                          </Typography>
                        )}
                      </MinorContainer>
                    </>
                  )}
                {participantData.certificate &&
                  participantData.certificate.toUpperCase() != 'N/A' && (
                    <CertificateContainer>
                      <Typography
                        size="lg"
                        as="h4"
                        variant="span"
                        lineHeight="1"
                      >
                        {`Certificate:`}
                      </Typography>
                      <Typography
                        size="lg"
                        as="h4"
                        variant="span"
                        lineHeight="1"
                      >
                        {`${participantData.certificate.toUpperCase()}`}
                      </Typography>
                    </CertificateContainer>
                  )}
                {participantData.secondCertificate && (
                  <CertificateContainer>
                    <Typography size="lg" as="h4" variant="span" lineHeight="1">
                      {`${participantData.secondCertificate.toUpperCase()}`}
                    </Typography>
                  </CertificateContainer>
                )}
                {participantData.acknowledgement &&
                  participantData.acknowledgement.toUpperCase() != 'N/A' && (
                    <Typography variant="span" size="md">
                      {participantData.acknowledgement}
                    </Typography>
                  )}
              </InfoContainer>
            </ModalContainer>
          </Modal>
        </>
      )}
    </>
  );
};
