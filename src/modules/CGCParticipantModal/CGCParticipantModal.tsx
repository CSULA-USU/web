import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Button, Typography } from '../../components';

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

// const CertificateContainer = styled.div<{ hasAcknowledgement?: string }>`
//   justify-content: space-between;
//   margin: ${(props) =>
//     props.hasAcknowledgement ? '0 0 24px 0' : '0px 0px 8px 0px'};
//   display: flex;
// `;

const DegreeContainer = styled.div`
  justify-content: space-between;
  margin-bottom: 8px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MajorContainer = styled.div<{ hasMinor?: string }>`
  display: flex;
  justify-content: space-between;
  margin: ${(props) => (props.hasMinor ? '0 0 8px 0' : '0 0 16px 0')};
`;

// const MinorContainer = styled.div<{ hasCertificate?: string }>`
//   display: flex;
//   justify-content: space-between;
//   margin: ${(props) =>
//     props.hasCertificate ? '0 0 8px 0' : '0px 0px 24px 0px'};
// `;

const MinorContainer = styled.div<{ hasCertificate?: string }>`
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
        style={ModalStyle}
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
            {/* <DegreeContainer>
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
                  <Typography size="lg" as="h4" variant="span" lineHeight="1">
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
                  <Typography size="lg" as="h4" variant="span" lineHeight="1">
                    {`Certificate: ${participantData.certificate.toUpperCase()}`}
                  </Typography>
                  {participantData.secondCertificate && (
                    <Typography size="lg" as="h4" variant="span">
                      {`Certificate: ${participantData.secondCertificate.toUpperCase()}`}
                    </Typography>
                  )}
                </CertificateContainer>
              </>
            )} */}
            <DegreeContainer>
              <Typography size="lg" as="h2">
                <strong>{participantData.degree.toUpperCase()}</strong>
              </Typography>
              <Typography size="lg" as="h3">
                {participantData.major.toUpperCase()}
              </Typography>
              {participantData.secondDegree && (
                <Typography size="lg" as="h2">
                  <strong>{participantData.secondDegree.toUpperCase()}</strong>
                </Typography>
              )}
            </DegreeContainer>
            {participantData.secondMajor &&
              participantData.secondMajor.toUpperCase() != 'N/A' && (
                <MajorContainer>
                  <Typography size="lg" as="h3">
                    {participantData.secondMajor.toUpperCase()}
                  </Typography>
                </MajorContainer>
              )}
            {participantData.minor &&
              participantData.minor.toUpperCase() != 'N/A' && (
                <>
                  <MinorContainer>
                    <Typography size="lg" as="h4" variant="span" lineHeight="1">
                      {`Minor:`}
                    </Typography>
                    <Typography size="lg" as="h4" variant="span" lineHeight="1">
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
                <>
                  <Typography size="lg" as="h4" variant="span" lineHeight="1">
                    {`Certificate:`}
                  </Typography>
                  <Typography size="lg" as="h4" variant="span" lineHeight="1">
                    {`${participantData.certificate.toUpperCase()}`}
                  </Typography>
                  {participantData.secondCertificate && (
                    <Typography size="lg" as="h4" variant="span" lineHeight="1">
                      {`${participantData.secondCertificate.toUpperCase()}`}
                    </Typography>
                  )}
                </>
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
  );
};
