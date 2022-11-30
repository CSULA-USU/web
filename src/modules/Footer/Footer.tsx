import Image from 'next/image';
import styled from 'styled-components';
import { Typography } from 'components';
import { Colors } from 'theme';

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 72px;
  background-color: ${Colors.greyDarkest};
`;

const FooterInner = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
`;

export const Footer = () => (
  <FooterContainer>
    <FooterInner>
      <Image
        src="/calstatela-badge.svg"
        alt="Cal State LA Univeristy-Student Union Logo"
        width={90}
        height={90}
      />
      <div>
        <Typography as="h5" variant="smallHeading" color="white">
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
      <div>
        <Typography as="h5" variant="smallHeading" color="white">
          Stay Connected
        </Typography>
        <Typography color="primary" size="sm" lineHeight="2.4">
          Instagram
        </Typography>
      </div>
      <div>
        <Typography as="h5" variant="smallHeading" color="white">
          Cal State LA
        </Typography>
        <Typography variant="body" color="white" margin="24px 0 0">
          5154 State University Dr, Los Angeles, CA 90032
        </Typography>
        <br />
        <Typography variant="body" color="white" margin="24px 0 0">
          (323) 343-2465
        </Typography>
      </div>
    </FooterInner>
  </FooterContainer>
);
