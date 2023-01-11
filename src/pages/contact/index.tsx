import Head from 'next/head';
import { Page } from 'modules';
import { FluidContainer, Typography, Button, Card } from 'components';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin-bottom: 12px;
`;
const ContactContainer = styled.div`
  width: 240px;
`;
const ContactItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;
export default function Contact() {
  return (
    <Page>
      <Head>
        <title>University-Student Union Contact</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, student, organizations, MORE, Cross Cultural Centers, Center For Student Involvement, Fitness Center, The Pit, The Gameroom, Student orgnizations, Calendar, Events, Gender and sexuality resource center, Pan African resource center, Asian Pacific islander, Chicana Latina, Information and Event Services, Distinguished Women, awards, Cultural Graduate Celebrations, LOUDmouth Zine, S.T.A.R.S. Program, Employment Opportunities, Board of Directors, Jobs"
        />
        <meta
          name="description"
          content="The University-Student Union inc.(U-SU) at California State University, Los Angeles was established in 1975 and provides a unique setting for the encouragement of broad social, cultural, recreational, and informal educational programming for the university and its surroundings."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FluidContainer backgroundImage="/subtle-background-2.jpg">
        <Typography variant="titleLarge" weight="700">
          Contact Us
        </Typography>
      </FluidContainer>
      <FluidContainer flex justifyContent="space-evenly">
        <ContactContainer>
          <Typography variant="title">Contact Info</Typography>
          <ContactItemContainer>
            <Typography>
              University-Student Union, 5154 State University Dr, Los Angeles
              CA, 90032
            </Typography>
            <div>
              <Typography weight="700">U-SU Administration</Typography>
              <Typography>(323) 343-2450</Typography>
            </div>
            <div>
              <Typography weight="700">
                Center for Student Involvement
              </Typography>
              <Typography>(323) 343-5110</Typography>
            </div>
            <div>
              <Typography weight="700">Cross Cultural Centers</Typography>
              <Typography>(323) 343-5001</Typography>
            </div>
            <div>
              <Typography weight="700">U-SU Graffix</Typography>
              <Typography>(323) 343-2464</Typography>
            </div>
            <div>
              <Typography weight="700">Recreation Center</Typography>
              <Typography>(323) 343-7546</Typography>
              <Typography>(323) 343-2520</Typography>
            </div>
            <div>
              <Typography weight="700">Information & Event Services</Typography>
              <Typography>(323) 343-2465</Typography>
            </div>
          </ContactItemContainer>
        </ContactContainer>
        <Card topBorder rounded width="720px" title="Lets Keep in Touch">
          <form action="" method="get">
            <FluidContainer flex flexDirection="column" justifyContent="center">
              <InputContainer>
                <Typography>Name</Typography>
                <input size={70} type="text" name="name" id="name" required />
              </InputContainer>
              <InputContainer>
                <Typography>Email</Typography>
                <input
                  size={70}
                  type="email"
                  name="email"
                  id="email"
                  required
                />
              </InputContainer>
              <InputContainer>
                <Typography>Subject</Typography>
                <input size={70} type="text" name="subject" id="subject" />
              </InputContainer>
              <InputContainer>
                <Typography>Message</Typography>
                <textarea
                  rows={10}
                  cols={69}
                  id="message"
                  name="message"
                ></textarea>
              </InputContainer>
              <div>
                <Button>Submit</Button>
              </div>
            </FluidContainer>
          </form>
        </Card>
      </FluidContainer>
    </Page>
  );
}
