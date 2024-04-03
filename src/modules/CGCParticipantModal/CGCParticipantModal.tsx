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
  pronoun?: string;
  certificate?: string;
  secondDegree?: string;
  secondMajor?: string;
  secondCertificate?: string;
  acknowledgement?: string;
}

const PictureContainer = styled.div`
  background-color: yellow;
  width: 320px;
  margin-right: 40px;
`;

const InfoContainer = styled.div`
  background-color: blue;
  display: flex;
  flex-direction: column;
`;
const ModalContainer = styled.div`
  display: flex;
`;

const ModalStyle = {
  overlay: { zIndex: 100 },
  content: {
    top: '50%',
    left: '50%',
    bottom: 'auto',
    right: 'auto',
    padding: '64px',
    transform: 'translate(-50%, -50%',
    backgroundColor: 'red',
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
          participantData.suffix ? ', ' + participantData.suffix : ''
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
          <InfoContainer>hwinformation</InfoContainer>
        </ModalContainer>
      </Modal>
    </>
  );
};
