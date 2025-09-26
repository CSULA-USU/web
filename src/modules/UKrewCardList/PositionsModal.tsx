import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography, Image, FluidContainer, Button } from 'components';
import { Modal } from './Modal';
import { FaCirclePlus } from 'react-icons/fa6';
import { useBreakpoint } from 'hooks';
import { MdLocationOn, MdAccessTime, MdAttachMoney } from 'react-icons/md';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';

const TriggerWrapper = styled.div`
  width: 100%;
  background-color: #e6e7eb;
  padding: 8px 16px;
  margin: 8px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #d1d5db;
  }
`;
const CustomContainer = styled(FluidContainer)`
  padding-top: 0;
  display: flex,
  flexDirection: column,
`;

const TriggerButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  background: none;
  border: none;
`;

const ModalContent = styled.div`
  max-width: 1024px;
  z-index: 40;
`;

// Removed styled Typography components - using regular Typography instead

const StyledImage = styled(Image)`
  flex-shrink: 0;
  width: 100%;
  height: auto;
  max-width: 35%;
  object-fit: cover;

  @media (max-width: 930px) {
    max-width: 50%;
  }

  @media (max-width: 579px) {
    max-width: 100%;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  justify-content: space-between;
  align-items: stretch;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    justify-content: center;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  justify-content: flex-start;
  width: 100%;
  text-align: left;

  @media (max-width: 1024px) {
    justify-content: center;
    text-align: center;
  }

  svg {
    flex-shrink: 0;
  }
`;

interface PositionModalProps {
  positionName: string;
  description: string;
  department: string;
  location: string;
  requirements: string;
  hours: string;
  hourlyRate: string;
  img: string;
  alt?: string;
  link?: string;
  onClose?: () => void;
}

export const PositionModal = ({
  positionName,
  description,
  department,
  location,
  hours,
  hourlyRate,
  requirements,
  img,
  alt,
  link,
  onClose: externalOnClose, // optional from parent
}: PositionModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    externalOnClose?.(); // call parent onClose if provided
  };
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <>
      <TriggerWrapper>
        <TriggerButton onClick={openModal}>
          <FaCirclePlus style={{ marginRight: '8px', flexShrink: 0 }} />
          <Typography as="p" variant="labelTitle" size="md" nowrap weight="400">
            {positionName}
          </Typography>
        </TriggerButton>
      </TriggerWrapper>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalContent>
          <FluidContainer
            flex
            flexDirection={isMobile ? 'column' : 'row'}
            backgroundColor="greyDarker"
            padding="0"
            justifyContent="space-between"
          >
            <FluidContainer
              flex
              flexDirection="column"
              gap="24px"
              alignItems={isDesktop ? 'center' : 'flex-start'}
              flexWrap="wrap"
            >
              <Typography
                as="p"
                variant="labelTitle"
                size="xl"
                nowrap
                weight="700"
                color="white"
              >
                {positionName}
              </Typography>
              <Typography as="p" margin="0 0 24px 0" color="white">
                {description}
              </Typography>
              <FluidContainer
                flex
                alignItems="flex-start"
                justifyContent="flex-start"
                padding="0"
              >
                <Button href={link} isExternalLink>
                  Check Availability
                </Button>
              </FluidContainer>
            </FluidContainer>
            <StyledImage src={img} alt={alt || `${positionName} image`} />
          </FluidContainer>

          <FluidContainer>
            <InfoGrid>
              <InfoColumn>
                <HiOutlineBuildingOffice2 size={24} />
                <div>
                  <Typography
                    variant="label"
                    color="black"
                    size="sm"
                    weight="400"
                    style={{ marginBottom: '4px' }}
                  >
                    Department
                  </Typography>
                  <Typography
                    variant="label"
                    color="black"
                    size="sm"
                    weight="700"
                    style={{ marginBottom: '4px' }}
                  >
                    {department}
                  </Typography>
                </div>
              </InfoColumn>

              <InfoColumn>
                <MdLocationOn size={24} />
                <div>
                  <Typography
                    variant="label"
                    color="black"
                    size="sm"
                    weight="400"
                    style={{ marginBottom: '4px' }}
                  >
                    Location
                  </Typography>
                  <Typography
                    variant="label"
                    color="black"
                    size="sm"
                    weight="700"
                    style={{ marginBottom: '4px' }}
                  >
                    {location}
                  </Typography>
                </div>
              </InfoColumn>

              <InfoColumn>
                <MdAccessTime size={24} />
                <div>
                  <Typography
                    variant="label"
                    color="black"
                    size="sm"
                    weight="400"
                    style={{ marginBottom: '4px' }}
                  >
                    Hours
                  </Typography>
                  <Typography
                    variant="label"
                    color="black"
                    size="sm"
                    weight="700"
                    style={{ marginBottom: '4px' }}
                  >
                    {hours}
                  </Typography>
                </div>
              </InfoColumn>

              <InfoColumn>
                <MdAttachMoney size={24} />
                <div>
                  <Typography
                    variant="label"
                    color="black"
                    size="sm"
                    weight="400"
                    style={{ marginBottom: '4px' }}
                  >
                    Hourly Rate
                  </Typography>
                  <Typography
                    variant="label"
                    color="black"
                    size="sm"
                    weight="700"
                    style={{ marginBottom: '4px' }}
                  >
                    {hourlyRate}
                  </Typography>
                </div>
              </InfoColumn>
            </InfoGrid>
          </FluidContainer>
          <CustomContainer>
            <Typography
              variant="label"
              color="black"
              size="sm"
              weight="700"
              style={{ marginBottom: '4px' }}
            >
              Required:
            </Typography>
            <Typography>{requirements}</Typography>
          </CustomContainer>
        </ModalContent>
      </Modal>
    </>
  );
};
