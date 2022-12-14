import Image from 'next/image';
import styled from 'styled-components';
import { Typography } from 'components';
import { Colors } from 'theme';
import { FluidContainer } from 'components';
import { AiOutlineInstagram } from 'react-icons/ai';

const FooterInner = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
`;

const Border = styled.div`
  width: 1000px;
  height: 0px;
  border: 1px solid #474747;
  margin: 2em auto;
`;
const FooterBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
`;
const FooterTopContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const Footer = () => (
  <FluidContainer backgroundColor="greyDarkest">
    <FooterTopContainer>
      <FooterInner>
        <Image
          src="/calstatela-badge.svg"
          alt="Cal State LA Univeristy-Student Union Logo"
          width={90}
          height={90}
        />
        <div>
          <Typography as="h5" color="white">
            Involvment
          </Typography>
          <Typography color="primary" size="sm" lineHeight="2.4">
            U-SU Employment
          </Typography>
          <Typography color="primary" size="sm" lineHeight="2.4">
            Calendar of Events
          </Typography>
        </div>
        <div>
          <Typography as="h5" color="white">
            Resources
          </Typography>
          <Typography color="primary" size="sm" lineHeight="2.4">
            Cal State L.A. Chancellor Message against racism
          </Typography>
          <Typography color="primary" size="sm" lineHeight="2.4">
            President Covino&apos;s message against racism
          </Typography>
          <Typography color="primary" size="sm" lineHeight="2.4">
            Black Lives Matter Resources
          </Typography>
          <Typography color="primary" size="sm" lineHeight="2.4">
            Covid-19 Resources
          </Typography>
          <Typography color="primary" size="sm" lineHeight="2.4">
            View Public Documents
          </Typography>
        </div>
      </FooterInner>
    </FooterTopContainer>
    <Border></Border>
    <FooterBottomContainer>
      <Typography color="greyLighter" size="sm" lineHeight="2.4">
        © 2022 University-Student Union at Cal State LA
      </Typography>
      <Typography color="greyLighter" size="sm" lineHeight="2.4">
        |
      </Typography>
      <Typography color="greyLighter" size="sm" lineHeight="2.4">
        5154 State University Dr, Los Angeles, CA 90032
      </Typography>
      <Typography color="greyLighter" size="sm" lineHeight="2.4">
        (323) 343-2465
      </Typography>
      <AiOutlineInstagram
        color={Colors.greyLighter}
        fontSize="32px"
      ></AiOutlineInstagram>
    </FooterBottomContainer>
  </FluidContainer>
);
