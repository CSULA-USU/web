import styled from 'styled-components';
import { Typography } from 'components';
import { toTitleCase } from 'utils/stringhelpers';
import { BiSolidPhone } from 'react-icons/bi';
import { MdMail } from 'react-icons/md';
import { GlobeIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { UKrewStudent } from 'types';
import { Spaces, Colors } from 'theme';

const CardWrapper = styled.div`
  border-top: 8px solid ${Colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${Colors.white};
  padding: ${Spaces.md};
  border-radius: ${Spaces.md};
  transition: transform 200ms ease;
  gap: ${Spaces.xs};
  box-shadow: rgb(38, 57, 77) 0px 18px 30px -10px;

  :hover {
    transform: translateY(-4px);
  }
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${Spaces.xs};
`;

export const Card = ({ uKrewStudent }: { uKrewStudent: UKrewStudent }) => (
  <Link href={`/u-krew/${uKrewStudent.email.split('@')[0]}`}>
    <CardWrapper>
      <Typography as="h2" variant="titleSmall">
        {toTitleCase(uKrewStudent.firstName)}{' '}
        {toTitleCase(uKrewStudent.lastName)}
      </Typography>
      <Typography>
        <strong>{uKrewStudent.role}</strong>
      </Typography>
      <Typography>{uKrewStudent.major}</Typography>
      <HorizontalContainer>
        {uKrewStudent?.email && <MdMail height={24} width={24} />}
        {uKrewStudent?.phoneNumber && <BiSolidPhone height={24} width={24} />}
        {uKrewStudent?.linkedIn && <LinkedInLogoIcon height={24} width={24} />}
        {uKrewStudent?.portfolioLink && <GlobeIcon height={24} width={24} />}
      </HorizontalContainer>
    </CardWrapper>
  </Link>
);
