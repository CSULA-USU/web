import { useEffect, useState } from 'react';
import { Button, FluidContainer, Image, Typography } from 'components';
import { Header, Page } from 'modules';
import styled from 'styled-components';
import { graphicsRequestListState } from 'atoms';
import { useRecoilValue } from 'recoil';
import graphicsRequests from 'data/graphics-requests.json';
import departments from 'data/departments.json';

export interface Prop {
  department: 'csi' | 'ccc' | 'graffix' | 'operations' | 'recreation';
}

const StatusButton = styled.button`
  text-align: center;
  border: none;
  border-radius: 5px;
  margin: 1%;
`;

const StatusNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Table = styled.table`
  text-align: left;
  width: 100%;
  table {
    border-collapse: collapse;
  }
  th {
    text-decoration: underline;
    font-weight: normal;
  }
  span {
    text-decoration: underline;
  }
`;

export const GraphicsRequests = ({}: Prop) => {
  const [department, setDepartment] = useState<(typeof departments)[number]>();
  const [requests] = useState(graphicsRequests);
  const graffixRequests = useRecoilValue(graphicsRequestListState);

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    const dep = departments.find((room) => room.id === id);
    setDepartment(dep);
    console.log(
      'requests from recoil within graphics-requests',
      graffixRequests,
    );
  }, [graffixRequests]);

  return (
    <Page>
      <Header
        title={`${department} Graphics Request`}
        backgroundImage="/subtle-background-2.jpg"
      >
        <Image
          alt="Graphics Requests Art Museum Header Image"
          src="/departments/graffix/backoffice/graphics-requests.svg"
          size={300}
        ></Image>
      </Header>
      <StatusNav>
        <StatusButton color="">All</StatusButton>
        <StatusButton>Not Started</StatusButton>
        <StatusButton>In-Progress</StatusButton>
        <StatusButton>Approved</StatusButton>
        <StatusButton>Send to Print</StatusButton>
        <StatusButton>Waiting for Approval</StatusButton>
        <StatusButton>On Hold</StatusButton>
        <StatusButton>Complete</StatusButton>
        <StatusButton>Cancelled</StatusButton>
      </StatusNav>
      <FluidContainer>
        {requests.map((item) => (
          <FluidContainer key={item.title}>
            <Typography variant="labelTitle" color="gold">
              {item.submissionDate}
            </Typography>
            <Typography variant="pageHeader" size="lg">
              {item.title}
            </Typography>
            <Table>
              <tr>
                <td>
                  <span>Requestor</span>: {item.requestor}
                </td>
              </tr>
              <tr>
                <td>
                  <span>Artist</span>: {item.artist}
                </td>
              </tr>
            </Table>

            <Table>
              <tr>
                <th>Digital Delivery:</th>
                <th>Send to Print:</th>
                <th>Print Delivery:</th>
                <th>Event Date:</th>
              </tr>
              <tr>
                <td>{item.digitalDelivery}</td>
                <td>{item.printDate}</td>
                <td>{item.printDelivery}</td>
                <td>{item.eventDate}</td>
              </tr>
            </Table>
            <FluidContainer flex justifyContent="center">
              <Button variant="black">View Request</Button>
            </FluidContainer>
            <hr></hr>
          </FluidContainer>
        ))}
      </FluidContainer>
    </Page>
  );
};
