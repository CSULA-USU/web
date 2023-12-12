import { useEffect, useState } from 'react';
import {
  Button,
  Expandable,
  FluidContainer,
  Image,
  Typography,
} from 'components';
import { Header, Page } from 'modules';
import styled, { css } from 'styled-components';
import { graphicsRequestListState } from 'atoms';
import { useRecoilValue } from 'recoil';
import graphicsRequests from 'data/graphics-requests.json';
import departments from 'data/departments.json';
import { BiChevronRight } from 'react-icons/bi';
import { Spaces } from 'theme';

export interface Prop {
  department: 'csi' | 'ccc' | 'graffix' | 'operations' | 'recreation';
}

interface StatusButtonProps {
  color?:
    | 'grey'
    | 'orange'
    | 'purple'
    | 'blue'
    | 'pink'
    | 'red'
    | 'green'
    | 'brown';
}

const getNotionColors = (color: StatusButtonProps['color']) => {
  switch (color) {
    case 'grey':
      return css`
        background-color: #787774;
        color: #fff;
      `;
    case 'orange':
      return css`
        background-color: #d9730d;
        color: #fff;
      `;
    case 'purple':
      return css`
        background-color: #9065b0;
        color: #fff;
      `;
    case 'blue':
      return css`
        background-color: #337ea9;
        color: #fff;
      `;
    case 'pink':
      return css`
        background-color: #c14c8a;
        color: #fff;
      `;
    case 'red':
      return css`
        background-color: #d44c47;
        color: #fff;
      `;
    case 'green':
      return css`
        background-color: #448361;
        color: #fff;
      `;
    case 'brown':
      return css`
        background-color: #9f6b53;
        color: #fff;
      `;
    default:
      return css`
        background-color: #37352f;
        color: #fff;
      `;
  }
};

const StatusButton = styled.button<StatusButtonProps>`
  text-align: center;
  border: none;
  border-radius: 5px;
  margin: ${Spaces.md};

  ${(props) => getNotionColors(props.color)}
`;

const StatusNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExpandableContainer = styled.div`
  border: 1px solid;
  padding-left: ${Spaces.md};
  margin: ${Spaces.md};
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
        title={`${department?.title} Graphics Request`}
        backgroundImage="/subtle-background-2.jpg"
      >
        <Image
          alt="Graphics Requests Art Museum Header Image"
          src="/departments/graffix/backoffice/graphics-requests.svg"
          size={300}
        ></Image>
      </Header>
      <StatusNav>
        <StatusButton>All</StatusButton>
        <StatusButton color="grey">Not Started</StatusButton>
        <StatusButton color="orange">In-Progress</StatusButton>
        <StatusButton color="purple">Approved</StatusButton>
        <StatusButton color="blue">Send to Print</StatusButton>
        <StatusButton color="pink">Waiting for Approval</StatusButton>
        <StatusButton color="red">On Hold</StatusButton>
        <StatusButton color="green">Complete</StatusButton>
        <StatusButton color="brown">Cancelled</StatusButton>
      </StatusNav>
      <FluidContainer>
        {requests.map((event) => (
          <ExpandableContainer key={event.title}>
            <Expandable
              indicator={<BiChevronRight color="black" size={48} />}
              header={
                <Typography
                  variant="label"
                  color="black"
                  as="h3"
                  margin={`${Spaces.sm} 0`}
                >
                  {event.title}
                </Typography>
              }
            >
              <Table>
                <tbody>
                  <tr>
                    <td>
                      <span>Submission Date</span>: {event.submissionDate}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Requestor</span>: {event.requestor}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Artist</span>: {event.artist}
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Table>
                <tbody>
                  <tr>
                    <th>Digital Delivery:</th>
                    <th>Send to Print:</th>
                    <th>Print Delivery:</th>
                    <th>Event Date:</th>
                  </tr>
                  <tr>
                    <td>{event.digitalDelivery}</td>
                    <td>{event.printDate}</td>
                    <td>{event.printDelivery}</td>
                    <td>{event.eventDate}</td>
                  </tr>
                </tbody>
              </Table>
              <FluidContainer flex justifyContent="center">
                <Button variant="primary">View Request</Button>
              </FluidContainer>
            </Expandable>
          </ExpandableContainer>
        ))}
      </FluidContainer>
    </Page>
  );
};
