import { FluidContainer, Typography, Button } from 'components';
import { Page, LogosDisplay, CallToAction, ImageAndCard } from 'modules';
import styled from 'styled-components';
import { Spaces } from 'theme';
import companies from 'data/web-team-company-logos.json';
// import { useState } from 'react';

const Center = styled.div`
  text-align: center;
  padding-top: 3%;
`;

const ButtonContainer = styled.div`
  margin-top: ${Spaces['2xl']};
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
  // const [isHovered, setIsHovered] = useState(false);
  return (
    <Page>
      <title>U-SU Graffix Web Team</title>
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2072&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          minHeight: '90vh',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {/* <video autoPlay loop muted width="100%" height="100%">
          <source
            src="departments/graffix/ashley-coding-clip.mp4"
            type="video/mp4"
          />
          video sdpoesnt sujport tagh
        </video> */}
        <FluidContainer>
          <Center>
            <Typography as="h1" variant="pageHeader" color="white">
              Graffix Web Team
            </Typography>
            <Typography
              as="p"
              color="white"
              variant="subheader"
              margin="50px 15% 0 15%"
            >
              The U-SU Graffix Department is responsible for promoting events
              and programs coordinated by the U-SU Programming Units through
              print materials and the U-SU website. We establish and maintain an
              identity for the U-SU through consistent publicity campaigns and
              promotions.
            </Typography>
            <ButtonContainer>
              <Button href="/graffix" variant="black">
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
        <Typography as="h1" variant="label">
          Employment Outcomes
        </Typography>
        <Typography as="p" variant="subheader">
          Graduates who were part of the web team have gone on to secure
          promising positions and opportunities at exceptional companies, such
          as these:
        </Typography>
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

      <ImageAndCard
        imgSrc="https://www.onlygfx.com/wp-content/uploads/2021/09/cute-frog-doodle-5951.png"
        imgAlt="Photo of John Yasis"
        imageWidth="30vw"
      >
        <Typography as="h1" variant="label" color="black">
          John Yasis
        </Typography>
        <Typography as="h2" variant="labelTitle" color="black">
          Web Designer
        </Typography>
        <Typography as="p" variant="copy" color="black">
          i enjoy all types f cheseee :| from moz to brie to feta and sometimes
          on the weekends and holidays i prefer specialized goat blue cheese. i
          and others would considerd myself a cheese monger
        </Typography>
      </ImageAndCard>

      <ImageAndCard
        imgSrc="https://www.onlygfx.com/wp-content/uploads/2021/09/cute-frog-doodle-5951.png"
        imgAlt="Photo of Tammy Xaypraseuth"
        imageWidth="30vw"
        imageOnRight="true"
      >
        <Typography as="h1" variant="label" color="black">
          Tammy Xaypraseuth
        </Typography>
        <Typography as="h2" variant="labelTitle" color="black">
          Junior Web Developer Associate
        </Typography>
        <Typography as="p" variant="copy" color="black">
          i enjoy all types f cheseee :| from moz to brie to feta and sometimes
          on the weekends and holidays i prefer specialized goat blue cheese. i
          and others would considerd myself a cheese monger
        </Typography>
      </ImageAndCard>

      <CallToAction text="" buttonText="Join Our Team" href="/employment">
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
      </CallToAction>
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
