import { useEffect, useState } from 'react';
import { Button, FluidContainer, Image, Typography } from 'components';
import { Header, Page } from 'modules';
import { graphicsRequestListState } from 'atoms';
import { useRecoilValue } from 'recoil';
import graphicsRequests from 'data/graphics-requests.json';

export default function GraphicsRequests() {
  const [requests] = useState(graphicsRequests);
  const graffixRequests = useRecoilValue(graphicsRequestListState);

  useEffect(() => {
    console.log(
      'requests from recoil within graphics-requests',
      graffixRequests,
    );
  }, [graffixRequests]);

  return (
    <Page>
      <Header
        title="CCC Graphics Request"
        backgroundImage="/subtle-background-2.jpg"
      >
        <Image
          alt="Graphics Requests Art Museum Header Image"
          src="/departments/graffix/backoffice/graphics-requests.svg"
          size={300}
        ></Image>
      </Header>
      <FluidContainer>
        {requests.map((item) => (
          <FluidContainer key={item.title}>
            <Typography variant="labelTitle" color="gold">
              {item.submissionDate}
            </Typography>
            <Typography variant="pageHeader" size="lg">
              {item.title}
            </Typography>
            <table>
              <tr>
                <td>
                  <span style={{ textDecoration: 'underline' }}>Requestor</span>
                  : {item.requestor}
                </td>
              </tr>
              <tr>
                <td>
                  <span style={{ textDecoration: 'underline' }}>Artist</span>:{' '}
                  {item.artist}
                </td>
              </tr>
            </table>

            <table style={{ textAlign: 'left', width: '100%', border: '0px' }}>
              <tr style={{ textDecoration: 'underline' }}>
                <td>Digital Delivery:</td>
                <td>Send to Print:</td>
                <td>Print Delivery:</td>
                <td>Event Date:</td>
              </tr>
              <tr>
                <td>{item.digitalDelivery}</td>
                <td>{item.printDate}</td>
                <td>{item.printDelivery}</td>
                <td>{item.eventDate}</td>
              </tr>
            </table>
            <FluidContainer flex justifyContent="center">
              <Button variant="black">View Request</Button>
            </FluidContainer>
            <hr></hr>
          </FluidContainer>
        ))}
      </FluidContainer>
    </Page>
  );
}