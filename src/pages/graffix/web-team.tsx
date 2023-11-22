import {
  FluidContainer,
  Typography,
  Button,
  Image,
  NonBreakingSpan,
} from 'components';
import { Page, LogosDisplay, ImageAndCard } from 'modules';
import styled from 'styled-components';
import { Spaces } from 'theme';
import companies from 'data/web-team-company-logos.json';
import { useBreakpoint } from 'hooks';
import { useState } from 'react';

const Center = styled.div`
  text-align: center;
  padding: 1%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ./ > *:not(:last-child) {
    margin-right: 8px;
  }
  column-gap: ${Spaces.md};
  row-gap: ${Spaces.md};
`;

export default function WebTeam() {
  const { isMobile } = useBreakpoint();
  const [hovered, setHovered] = useState(false);
  return (
    <Page>
      <title>U-SU Graffix Web Team</title>
      <div
        style={{
          backgroundImage:
            'url(/departments/graffix/web-team/square-windows-pattern.jpg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          minHeight: '85vh',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <FluidContainer>
          <Center>
            <Typography
              as="h1"
              variant="pageHeader"
              size={isMobile ? '4xl' : '5xl'}
              lineHeight="1"
            >
              Graffix <NonBreakingSpan>Web Team</NonBreakingSpan>
            </Typography>
            <Typography
              as="p"
              variant="subheader"
              size={isMobile ? 'md' : 'lg'}
              margin="2% 2% 0 2%"
            >
              The Graffix Web Team maintains the U-SU website, ensuring both
              quality and functionality.
            </Typography>
            <Image
              alt="ashley coding"
              src="/departments/graffix/web-team/ashley-coding.png"
              style={{
                width: '80%',
                margin: '5%',
                boxShadow: '8px 8px 10px grey',
              }}
            ></Image>
            <ButtonContainer>
              <Button href="/employment" variant="black">
                Join Us
              </Button>
              <Button href="/graffix" variant="outline">
                Learn More
              </Button>
            </ButtonContainer>
          </Center>
        </FluidContainer>
      </div>

      <Center
        style={{
          backgroundColor: 'gold',
        }}
      >
        <Typography as="h1" variant="title" size={isMobile ? 'xl' : '2xl'}>
          Employment Outcomes
        </Typography>
        {isMobile ? (
          <></>
        ) : (
          <>
            <Typography as="p" variant="subheader" size="lg">
              Graduates who were part of the web team have gone on to secure
              promising positions and opportunities at exceptional companies,
              such as these:
            </Typography>
          </>
        )}

        <LogosDisplay
          style={{
            justifyContent: 'space-evenly',
            display: 'flex',
            flexWrap: 'wrap',
          }}
          logos={companies}
        />
      </Center>

      <FluidContainer backgroundImage="/departments/graffix/web-team/lumpy-wall.jpg">
        <Typography
          as="h1"
          variant="title"
          color="black"
          size={isMobile ? '3xl' : '4xl'}
        >
          Current Team
        </Typography>
        <Center></Center>
        <ImageAndCard
          imgSrc={
            hovered
              ? 'https://minifigures.e2ecdn.com/Products/MF132_1.jpg?w=493&h=493&quality=85&scale=canvas'
              : 'https://www.onlygfx.com/wp-content/uploads/2021/09/cute-frog-doodle-5951.png'
          }
          imgAlt="Photo of John Yasis"
          imageWidth="25vh"
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Typography as="h1" variant="label">
            John Yasis
          </Typography>
          <Typography as="h2" variant="labelTitle">
            Web Designer
          </Typography>
          <Typography as="p" variant="copy">
            Pilgrim Johnathan Yasis has betrayed us for the last time. Since the
            day he set foot in america, he has been spreading his hobbiies and
            friendshiip. His cult, the Buddy society, has a quarter of america
            under their rule. he still operates the cult and is now a humble
            website programer.
          </Typography>
        </ImageAndCard>
        <ImageAndCard
          imgSrc={
            hovered
              ? 'https://i.pinimg.com/originals/84/cd/28/84cd28bf76d7aeede1584f57828fb3e9.jpg'
              : 'https://www.onlygfx.com/wp-content/uploads/2021/09/cute-frog-doodle-5951.png'
          }
          imgAlt="Photo of Tammy Xaypraseuth"
          imageWidth="25vh"
          imageOnRight="true"
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Typography as="h1" variant="label">
            Tammy Xaypraseuth
          </Typography>
          <Typography as="h2" variant="labelTitle">
            Junior Web Developer Associate
          </Typography>
          <Typography as="p" variant="copy">
            Hi :) I&apos;m a 4th year in Computer Science aspiring to be a game
            designer or programmer. Catch me either taking care of my plants,
            baking, playing tennis, or playing games. Fun fact about me is that
            I have pet shrimps and no, I don&apos;t eat them.
          </Typography>
        </ImageAndCard>
      </FluidContainer>
    </Page>
  );
}
