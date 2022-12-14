import styled from 'styled-components';
import { Page } from 'modules';
import { Typography } from 'components';
import Image from 'next/image';
import Head from 'next/head';

const OperationsContainer = styled.div`
  height: 1000px;
  display: flex;
  flex-direction: column;
`;

const OperationsHeroContainer = styled.div`
  display: flex;
  height: 258px;
  width: 660px;
  margin: 0 auto;
`;

const OperationsInner = styled.div`
  margin: 0 auto;
  height: 800px;
  max-width: 1000px;
`;

const OperationsDivisionDescriptions = (props: any) => {
  return (
    <>
      <Typography variant="titleSmall">{props.division}</Typography>
      <Typography>{props.description}</Typography>
      <br />
    </>
  );
};
export default function Operations() {
  return (
    <Page>
      <OperationsContainer>
        <OperationsHeroContainer>
          <Image
            src="/operations/operations-hero.png"
            width="660"
            height="258"
            alt="operations department logo image"
          />
        </OperationsHeroContainer>
        <br />
        <OperationsInner>
          <Typography as="h2">
            The Operations Team consists of five divisions:
          </Typography>
          <br />
          <OperationsDivisionDescriptions
            division="Building Maintenance"
            description="
                        Is responsible for the efficient upkeep of the University-Student Union including all equipment and furnishings in and around the facility. Additionally, this department addresses any electrical, plumbing, HVAC, carpentry, landscaping, and beautification needs of the building.
                        "
          />
          <OperationsDivisionDescriptions
            division="Building Services"
            description="Supports the needs of students, faculty and staff who utilize space in and around the U-SU by providing dependable set-ups for events, meetings, and programs."
          />
          <OperationsDivisionDescriptions
            division="Custodial Services"
            description="Is responsible for the general cleanliness of all areas in and surrounding the Union facility including all interior/exterior furnishings and addresses all concerns related to general housekeeping."
          />
          <OperationsDivisionDescriptions
            division="Media Services"
            description="Assists in supporting the increased technical needs of the building and addresses a wide variety of programs and events that occur inside and outside of the U-SU by providing knowledgeable technical and theatrical support."
          />
          <OperationsDivisionDescriptions
            division="Information & Event Services"
            description="Is responsible for processing reservation requests and assisting sponsors with identifying the most efficient use of designated and programmable spaces of the University-Student Union."
          />
        </OperationsInner>
      </OperationsContainer>
    </Page>
  );
}
