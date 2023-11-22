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
  padding-top: 3%;
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
          backgroundImage: 'url(/departments/graffix/temp-background.jpg)',
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
              src="/departments/graffix/ashley-coding.png"
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
        <Typography as="h1" variant="title" size={isMobile ? 'lg' : '2xl'}>
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

      {/* <FluidContainer>
        <Card>
          <FluidContainer flex>
            <div
              style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                width: '50%',
              }}
            >
              <Image
                src="https://www.dropbox.com/s/kl1xc1uhm3ma2m2/students-1.png?raw=1"
                alt="John Yasis"
                object-fit="contain"
                width="100%"
              />
              <Image
                src="https://www.onlygfx.com/wp-content/uploads/2021/09/cute-frog-doodle-5951.png"
                alt="Temporary Doodle Frog"
                width="100%"
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  opacity: isHovered ? '1' : '0',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                }}
              ></Image>
            </div>
            <FluidContainer>
              <Typography as="h1" variant="label" color="black">
                John Yasis
              </Typography>
              <Typography as="h2" variant="labelTitle" color="black">
                Web Designer
              </Typography>
              <Typography as="p" variant="copy" color="black">
                i enjoy all types f cheseee :| from moz to brie to feta and
                sometimes on the weekends and holidays i prefer specialized goat
                blue cheese. i and others would considerd myself a cheese monger
              </Typography>
            </FluidContainer>
          </FluidContainer>
        </Card>

        <Card>
          <FluidContainer flex>
            <FluidContainer>
              <Typography as="h1" variant="label" color="black">
                Tammy Xaypraseuth
              </Typography>
              <Typography as="h2" variant="labelTitle" color="black">
                Junior Web Developer Associate
              </Typography>
              <Typography as="p" variant="copy" color="black">
                i enjoy all types f cheseee :| from moz to brie to feta and
                sometimes on the weekends and holidays i prefer specialized goat
                blue cheese. i and others would considerd myself a cheese monger
              </Typography>
            </FluidContainer>
            <div
              style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              <Image
                src="https://www.dropbox.com/s/kl1xc1uhm3ma2m2/students-1.png?raw=1"
                alt="Tammy Xaypraseuth"
                width="70%"
                style={{
                  position: 'relative',
                }}
              />
              <Image
                src="https://www.onlygfx.com/wp-content/uploads/2021/09/cute-frog-doodle-5951.png"
                alt="Temporary Doodle Frog"
                width="70%"
              ></Image>
            </div>
          </FluidContainer>
        </Card>
      </FluidContainer> */}
      <FluidContainer backgroundColor="white">
        <Typography
          as="h1"
          variant="title"
          color="black"
          size={isMobile ? '3xl' : '4xl'}
        >
          Current Team
        </Typography>
        <ImageAndCard
          imgSrc={
            hovered
              ? 'https://images.unsplash.com/photo-1593799723560-499b89c0397c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3V0ZSUyMHNxdWFyZXxlbnwwfHwwfHx8Mg%3D%3D'
              : 'https://www.onlygfx.com/wp-content/uploads/2021/09/cute-frog-doodle-5951.png'
          }
          imgAlt="Photo of John Yasis"
          imageWidth="25vw"
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
            i enjoy all types f cheseee :| from moz to brie to feta and
            sometimes on the weekends and holidays i prefer specialized goat
            blue cheese. i and others would considerd myself a cheese monger
          </Typography>
        </ImageAndCard>
        <ImageAndCard
          imgSrc={
            hovered
              ? 'https://images.unsplash.com/photo-1593799723560-499b89c0397c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3V0ZSUyMHNxdWFyZXxlbnwwfHwwfHx8Mg%3D%3D'
              : 'https://www.onlygfx.com/wp-content/uploads/2021/09/cute-frog-doodle-5951.png'
          }
          imgAlt="Photo of Tammy Xaypraseuth"
          imageWidth="25vw"
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

      {/* <CallToAction text="" buttonText="Join Our Team" href="/employment">
        <Typography
          color="black"
          as="h2"
          variant="title"
          weight="300"
          lineHeight="1"
        >
          Looking to develop your career by working with the accomplished
          Graffix Web Team?
        </Typography>
      </CallToAction> */}

      {/* <FluidContainer>
        <CurrentTeamContainer>
          <Card>
            <Image
              src="https://www.dropbox.com/s/kl1xc1uhm3ma2m2/students-1.png?raw=1"
              alt="John Yasis"
              width="60%"
            />
            <Typography as="h1" variant="labelTitle">
              John Yasis
            </Typography>
            <Typography as="h2" variant="copy">
              Web Designer
            </Typography>
            <Typography as="p" variant="copy">
              i enjoy all types f cheseee :| from moz to brie to feta and
              sometimes on the weekends and holidays i prefer specialized goat
              blue cheese. i and others would considerd myself a cheese monger
            </Typography>
          </Card>
          <Card>
            <Image
              src="https://www.dropbox.com/s/kl1xc1uhm3ma2m2/students-1.png?raw=1"
              alt="Tammy Xaypraseuth"
              width="60%"
            />
            <Typography as="h1" variant="labelTitle">
              Tammy Xaypraseuth
            </Typography>
            <Typography as="h2" variant="copy">
              Junior Web Developer Associate
            </Typography>
            <Typography as="p" variant="copy">
              i enjoy all types f cheseee :| from moz to brie to feta and
              sometimes on the weekends and holidays i prefer specialized goat
              blue cheese. i and others would considerd myself a cheese monger
            </Typography>
          </Card>
        </CurrentTeamContainer>
      </FluidContainer> */}
    </Page>
  );
}
