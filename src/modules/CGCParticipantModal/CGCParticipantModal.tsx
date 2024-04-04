import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Button, Typography } from '../../components';

interface ParticipantModalProps {
  img?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  prefix?: string;
  suffix?: string;
  degree: string;
  major: string;
  minor?: string;
  pronouns?: string;
  certificate?: string;
  secondDegree?: string;
  secondMajor?: string;
  secondMinor?: string;
  secondCertificate?: string;
  acknowledgement?: string;
}

const CertificateContainer = styled.div<{ hasAcknowledgement?: string }>`
  justify-content: space-between;
  margin: ${(props) =>
    props.hasAcknowledgement ? '0 0 24px 0' : '0px 0px 8px 0px'};
  display: flex;
`;

const DegreeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
`;

const MajorContainer = styled.div<{ hasMinor?: string }>`
  display: flex;
  justify-content: space-between;
  margin: ${(props) => (props.hasMinor ? '0 0 8px 0' : '0 0 16px 0')};
`;

const MinorContainer = styled.div<{ hasCertificate?: string }>`
  display: flex;
  justify-content: space-between;
  margin: ${(props) =>
    props.hasCertificate ? '0 0 8px 0' : '0px 0px 24px 0px'};
`;

const ModalContainer = styled.div`
  display: flex;
`;

const PictureContainer = styled.div`
  width: 320px;
  margin-right: 24px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;
/* flex-shrink property prevents picture container from shrinking */

const ModalStyle = {
  overlay: {
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    bottom: 'auto',
    right: 'auto',
    padding: '40px',
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

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <Button variant="transparent" onClick={() => openModal()} padding="0">
        <Typography>{`${participantData.firstName}${
          participantData.middleName ? ' ' + participantData.middleName : ''
        } ${participantData.lastName}${
          participantData.suffix ? ' ' + participantData.suffix : ''
        }`}</Typography>
      </Button>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="participant modal"
        style={ModalStyle}
      >
        <ModalContainer>
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
          <InfoContainer>
            <Typography as="h1" variant="pageHeader" size="3xl">{`${
              participantData.prefix ? participantData.prefix + ' ' : ''
            }${participantData.firstName}${
              participantData.middleName ? ' ' + participantData.middleName : ''
            } ${participantData.lastName}${
              participantData.suffix ? ' ' + participantData.suffix : ''
            }`}</Typography>
            {participantData.pronouns && (
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
            <DegreeContainer>
              <Typography size="lg" as="h2">
                <strong>{participantData.degree.toUpperCase()}</strong>
              </Typography>
              {participantData.secondDegree && (
                <Typography size="lg" as="h2">
                  <strong>{participantData.secondDegree.toUpperCase()}</strong>
                </Typography>
              )}
            </DegreeContainer>
            <MajorContainer hasMinor={participantData.minor}>
              <Typography size="lg" as="h3">
                {participantData.major.toUpperCase()}
              </Typography>
              {participantData.secondMajor && (
                <Typography size="lg" as="h3">
                  {participantData.secondMajor.toUpperCase()}
                </Typography>
              )}
            </MajorContainer>
            {participantData.minor && (
              <>
                <MinorContainer hasCertificate={participantData.certificate}>
                  <Typography size="lg" as="h4" variant="span">
                    {`Minor: ${participantData.minor.toUpperCase()}`}
                  </Typography>
                  {participantData.secondMinor && (
                    <Typography size="lg" as="h4" variant="span">
                      {`Minor: ${participantData.secondMinor.toUpperCase()}`}
                    </Typography>
                  )}
                </MinorContainer>
              </>
            )}
            {participantData.certificate && (
              <>
                <CertificateContainer
                  hasAcknowledgement={participantData.acknowledgement}
                >
                  <Typography size="lg" as="h4" variant="span">
                    {`Certificate: ${participantData.certificate.toUpperCase()}`}
                  </Typography>
                  {participantData.secondCertificate && (
                    <Typography size="lg" as="h4" variant="span">
                      {`Certificate: ${participantData.secondCertificate.toUpperCase()}`}
                    </Typography>
                  )}
                </CertificateContainer>
              </>
            )}
            {participantData.acknowledgement && (
              <Typography variant="span" size="md">
                {participantData.acknowledgement}
              </Typography>
            )}
          </InfoContainer>
        </ModalContainer>
      </Modal>
    </>
  );
};
