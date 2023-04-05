import Head from 'next/head';
import { Page } from 'modules';
import { FluidContainer, Typography } from 'components';
import styled from 'styled-components';
import contacts from 'data/contacts.json';
import { Spaces } from 'theme';

const ContactContainer = styled.div`
  width: 320px;
  margin-right: ${Spaces.lg};
  margin-bottom: ${Spaces.xl};
`;

const ContactItem = styled.div`
  margin-bottom: ${Spaces.lg};
`;

export default function Contact() {
  return (
    <Page>
      <Head>
        <title>Contact the U-SU</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Organizations, Cross Cultural Centers, Center For Student Involvement, Fitness Center, Student Orgnizations, Calendar, Events, Gender and Sexuality Resource Center, Pan African Resource Center, Asian Pacific Islander, Chicana Latina, Information and Event Services, Distinguished Women Awards, Cultural Graduate Celebrations, Employment Opportunities, Board of Directors, Jobs"
        />
        <meta
          name="description"
          content="The University-Student Union inc.(U-SU) at California State University, Los Angeles was established in 1975 and provides a unique setting for the encouragement of broad social, cultural, recreational, and informal educational programming for the university and its surroundings."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FluidContainer backgroundImage="/subtle-background-2.jpg">
        <Typography variant="titleLarge" weight="700" as="h1">
          Contact Us
        </Typography>
      </FluidContainer>
      <FluidContainer flex justifyContent="flex-start" flexWrap="wrap">
        <ContactContainer>
          <Typography as="p">
            University-Student Union, <br />
            5154 State University Dr, <br />
            Los Angeles CA, 90032
          </Typography>
        </ContactContainer>
        <ContactContainer>
          {contacts.map((c) => (
            <ContactItem key={c.office}>
              <Typography weight="700">{c.office}</Typography>
              {c.tel.map((t, i) => (
                <Typography key={`c.office ${i}`}>{t}</Typography>
              ))}
            </ContactItem>
          ))}
        </ContactContainer>
      </FluidContainer>
    </Page>
  );
}
