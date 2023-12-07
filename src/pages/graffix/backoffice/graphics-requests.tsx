import { Header, Page } from 'modules';
import { Button, FluidContainer, Image, Typography } from 'components';
import graphicsRequests from 'data/graphics-requests.json';
import { useState } from 'react';

export default function GraphicsRequests() {
  const [requests] = useState(graphicsRequests);
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
        {requests.map((item, index) => (
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
            {index !== requests.length - 1 && <hr />}
          </FluidContainer>
        ))}
      </FluidContainer>
    </Page>
  );
}
