import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Button, Typography } from '../../components';
import { useBreakpoint } from 'hooks';
import { media } from 'theme';

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
  },
};

const DesktopModalStyle = {
  overlay: {
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    overflow: 'scroll',
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
  function openModal() {
    setShowModal(true);
  }
  const { isMobile } = useBreakpoint();

  function closeModal() {
    setShowModal(false);
  }
  return (
    <>
      {isMobile ? (
        <>
          <Button variant="transparent" onClick={() => openModal()} padding="0">
            <Typography>{`${participantData.fullName?.firstName}${
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
                      margin="0px 0px 16px 0px"
                      as="h2"
                    >
                      {participantData.pronouns}
                    </Typography>
                  </em>
                )}
              <DegreeAndMajorContainer>
                <Typography size="md" as="h2">
                  <strong>{participantData.degree.toUpperCase()}</strong>
                </Typography>
                <Typography size="md" as="h3">
                  {participantData.major.toUpperCase()}
                </Typography>
                {participantData.secondDegree && (
                  <Typography size="md" as="h2">
                    <strong>
                      {participantData.secondDegree.toUpperCase()}
                    </strong>
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
            <Typography>{`${participantData.fullName?.firstName}${
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
                <Typography as="h1" variant="pageHeader" size="3xl">{`${
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
                    <strong>{participantData.degree.toUpperCase()}</strong>
                  </Typography>
                  <Typography size="lg" as="h3">
                    {participantData.major.toUpperCase()}
                  </Typography>
                </DegreeAndMajorContainer>
                <DegreeAndMajorContainer>
                  {participantData.secondDegree && (
                    <Typography size="lg" as="h2">
                      <strong>
                        {participantData.secondDegree.toUpperCase()}
                      </strong>
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
