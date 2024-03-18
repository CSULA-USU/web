import { Typography, Divider } from 'components';
import styled from 'styled-components';
import { Spaces } from 'theme';
import { BiPhone } from 'react-icons/bi';

interface HourProps {
  title: string;
  times: string[];
}
interface OfficeHourProps {
  address: React.ReactNode;
  phoneNumber?: string;
  hours?: HourProps[];
}
const OfficeHoursContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  > * {
    min-width: 400px;
    @media (max-width: 600px) {
      min-width: 100%;
    }
    margin-bottom: ${Spaces.md};
  }
`;

const NumberInnerContainer = styled.div`
  display: flex;
  gap: ${Spaces.sm};
`;

const NumberContainer = styled.div`
  display: flex;
  gap: ${Spaces.lg};
`;

export const OfficeHours = ({
  address,
  phoneNumber,
  hours,
}: OfficeHourProps) => (
  <>
    <Divider margin="24px 0" color="grey" />
    <OfficeHoursContentContainer>
      <div>
        <Typography>{address}</Typography>
        <Divider color="greyLighter" margin="12px 0" />
        <NumberContainer>
          <NumberInnerContainer>
            <BiPhone aria-hidden="true" fontSize={Spaces.lg} />
            <Typography as="p">{phoneNumber}</Typography>
          </NumberInnerContainer>
        </NumberContainer>
      </div>

      {hours && (
        <>
          {hours.map((props) => (
            <div key={props.title}>
              <Typography as="p" weight="700">
                {props.title}
              </Typography>
              {props.times && (
                <>
                  {props.times.map((time) => (
                    <Typography as="p" key={time}>
                      {time}
                    </Typography>
                  ))}
                </>
              )}
            </div>
          ))}
        </>
      )}
    </OfficeHoursContentContainer>
  </>
);
