import { Typography } from 'components';
import styled from 'styled-components';
import { AiOutlineInstagram } from 'react-icons/ai';

const StudentOrgsSubHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  text-align: center;
`;
const Border = styled.div`
  width: 100%;
  border: 1px solid #000000;
  margin: 2em auto;
`;

const FooterInner = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  text-align: left;
  gap: 235px;
`;
const FooterTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const StudentOrgsSubHeader = () => (
  <StudentOrgsSubHeaderContainer>
    <Border></Border>
    <FooterTopContainer>
      <FooterInner>
        <div>
          <Typography margin="0 0 12px 0" as="h5" variant="title">
            Office Hours
          </Typography>
          <Typography variant="copy" color="grey" size="sm" lineHeight="2.4">
            Monday - Thursday: 8 AM - 6 PM
          </Typography>
          <Typography variant="copy" color="grey" size="sm" lineHeight="2.4">
            Friday: 8 AM - 5 PM
          </Typography>
        </div>
        <div>
          <Typography margin="0 0 12px 0" as="h5" variant="title">
            Club Organization Office
          </Typography>
          <Typography variant="copy" color="grey" size="sm" lineHeight="2.4">
            Monday - Thursday: 8 AM - 6 PM
          </Typography>
          <Typography variant="copy" color="grey" size="sm" lineHeight="2.4">
            Satuday - Sunday: Closed
          </Typography>
        </div>
      </FooterInner>
      <AiOutlineInstagram fontSize="48px"></AiOutlineInstagram>
    </FooterTopContainer>
    <Border></Border>
  </StudentOrgsSubHeaderContainer>
);
