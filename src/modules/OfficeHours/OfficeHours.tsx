import { Typography, Divider } from 'components';
import styled from 'styled-components';
import { Spaces } from 'theme';
import { BiPhone } from 'react-icons/bi';

const OfficeHoursContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const NumberInnerContainer = styled.div`
  display: flex;
  gap: ${Spaces.sm};
`;
const NumberContainer = styled.div`
  display: flex;
  gap: ${Spaces.lg};
`;
export const OfficeHours = () => (
  <>
    <Divider margin="24px 0" color="grey" />
    <OfficeHoursContentContainer>
      <div>
        <Typography>
          5154 State University Drive Los Angeles, CA 90032 Room 204, 2nd Floor,
          U-SU
        </Typography>
        <Divider color="greyLighter" margin="12px 0" />
        <NumberContainer>
          <NumberInnerContainer>
            <BiPhone fontSize={Spaces.lg} />
            <Typography>323-343-5110</Typography>
          </NumberInnerContainer>
        </NumberContainer>
      </div>
      <div>
        <Typography weight="700">Office Hours</Typography>
        <Typography>Monday - Thursday: 8 AM – 6 PM</Typography>
        <Typography>Friday: 8 AM – 5 PM</Typography>
        <Typography>Saturday - Sunday: CLOSED</Typography>
      </div>
    </OfficeHoursContentContainer>
  </>
);
