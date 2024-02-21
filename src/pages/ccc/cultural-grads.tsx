import styled from 'styled-components';
import Head from 'next/head';
import {
  Divider,
  Expandable,
  FlatCard,
  FluidContainer,
  Image,
  ImageAndCard,
  Panel,
  Typography,
} from 'components';
import { BiChevronRight } from 'react-icons/bi';
import { CulturalGradsHeader, Page } from 'modules';
import { Spaces } from 'theme';
import CulturalGradsData from 'data/cgc-data.json';

const BenefitCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const slideshowImages = CulturalGradsData['header-images'];
const cards = CulturalGradsData['info-cards'];
const questions = CulturalGradsData['questions'];
const benefits = CulturalGradsData['benefits'];

export default function CulturalGrads() {
  return (
    <Page>
      <Head>
        <title>Cultural Graduate Celebrations</title>
        <meta
          name="author"
          content="The University Student Union Center for Student Involvement"
        />
        <meta
          name="keywords"
          content="CSULA, Cal State LA Student Union, Center for Student Involvement, CSI, Cross Cultural Center, CCC, U-SU, University Student, Cultural Graduation, Black Graduation, APIDA Graduation, Pride Graduation, Nuestra Graduation"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=yes"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CulturalGradsHeader images={slideshowImages} />
      <FluidContainer flex justifyContent="space-around" flexWrap="wrap">
        {cards.map((e, i) => (
          <Image
            key={i}
            src={e.iconSrc}
            alt={e.iconAlt}
            size={100}
            style={{ objectFit: 'scale-down' }}
          />
        ))}
      </FluidContainer>
      <FluidContainer>
        <Panel backgroundColor="black">
          <Typography as="h4" variant="label" color="primary">
            Dear Cal State LA Prospective Graduate,
          </Typography>
          <Typography as="p" variant="copy" color="white">
            These ceremonies and celebrations are great opportunities to
            acknowledge your academic achievements, honor your families,
            communities, and other significant people in your lives, and to
            celebrate the cultural influences that have contributed to your
            academic success. The ceremonies are open to all students who would
            like to sign up and participate. You deserve to celebrate your
            achievements with cultural influences that are integral to your
            being and important to you and your community! Apply now!
          </Typography>
        </Panel>
      </FluidContainer>
      <FluidContainer>
        <Typography
          as="h6"
          variant="copy"
          color="black"
          style={{ textAlign: 'center' }}
        >
          <Typography>
            <Typography as="span" weight="700">
              All{' '}
            </Typography>
            graduating students (of all degree types, Bachelors, Masters, EdD)
            who are interested are welcome to apply.
          </Typography>
          <Typography>
            Priority is given to Spring 2024 graduates, but Fall 2024 graduates
            are welcome to apply as well.
          </Typography>
        </Typography>
      </FluidContainer>
      <FluidContainer>
        <Typography margin={`${Spaces.md} 0`} as="h2" variant="title">
          Benefits
        </Typography>
        <BenefitCardsContainer>
          {benefits.map((e, i) => (
            <FlatCard key={i} imgSrc={e.src} imgAlt={e.alt}>
              {e.description}
            </FlatCard>
          ))}
        </BenefitCardsContainer>
      </FluidContainer>
      <FluidContainer>
        <Typography margin={`${Spaces.md} 0`} as="h2" variant="title">
          Graduations
        </Typography>
        {cards.map((card, i) => (
          <ImageAndCard
            key={i}
            index={i}
            title={card.title}
            subheader={card.subheader}
            copy={card.copy}
            iconAlt={card.iconAlt}
            iconSrc={card.iconSrc}
            buttonLink={card.applicationLink}
            imgSrc={card.imgSrc}
            imgAlt={card.imgAlt}
          ></ImageAndCard>
        ))}
      </FluidContainer>

      <FluidContainer backgroundColor="black">
        <div id="faqs">
          <Typography color="gold" variant="title" as="h2">
            Graduate Participation Information
          </Typography>
        </div>
        {questions.map((e, i) => (
          <>
            <Expandable
              key={i}
              indicator={<BiChevronRight color="white" size={48} />}
              header={
                <Typography
                  variant="label"
                  color="white"
                  as="h3"
                  margin={`${Spaces.sm} 0`}
                >
                  {e.question}
                </Typography>
              }
            >
              <Typography color="white" as="p">
                {Array.isArray(e.answer) ? (
                  <>
                    <ul>
                      {e.answer.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <> {e.answer}</>
                )}
              </Typography>
            </Expandable>
            <Divider color="gold" />
          </>
        ))}
      </FluidContainer>
      <FluidContainer
        backgroundColor="primary"
        flex
        justifyContent="center"
        alignItems="center"
        innerMaxWidth="560px"
      >
        <Image
          src="/departments/ccc/ccc-grad-banner.jpg"
          alt="cultural grad banner"
          width="100%"
          height="fit-content"
        />
      </FluidContainer>
    </Page>
  );
}
