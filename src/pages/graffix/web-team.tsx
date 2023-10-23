import { FluidContainer, Typography, Button, Image, Card } from 'components';
import { Page, LogosDisplay } from 'modules';
import styled from 'styled-components';
import { Spaces } from 'theme';
import companies from 'data/web-team-company-logos.json';
import { useState } from 'react';

const Center = styled.div`
  text-align: center;
  margin-top: 3%;
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

const CurrentTeamContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 0 10% 0 10%;
`;
const CurrentTeamContainer2 = styled.div`
  margin: 0 15% 0 15%;
`;

export default function WebTeam() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Page>
      <FluidContainer backgroundColor="white">
        <Center>
          <Typography as="h1" variant="title">
            Graffix Web Team
          </Typography>
          <Image
            src="https://www.dropbox.com/s/kl1xc1uhm3ma2m2/students-1.png?raw=1"
            alt="students"
            width="30%"
          ></Image>
          <Typography as="p" color="grey" margin="50px 15% 0 15%">
            The U-SU Graffix Department is responsible for promoting events and
            programs coordinated by the U-SU Programming Units through print
            materials and the U-SU website. We establish and maintain an
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

      <Center>
        <Typography as="h1" variant="label">
          Employment Outcomes
        </Typography>
        <Typography as="p" variant="labelTitle">
          Graduates who were part of the web team have gone on to secure
          promising positons and opportunities at exceptional companies, such as
          these:
        </Typography>
      </Center>
      <LogosDisplay
        style={{
          justifyContent: 'space-evenly',
          display: 'flex',
        }}
        logos={companies}
      />

      <CurrentTeamContainer2>
        <FluidContainer flex>
          <Image
            src="https://www.dropbox.com/s/kl1xc1uhm3ma2m2/students-1.png?raw=1"
            alt="John Yasis"
            object-fit="contain"
            width="30%"
          />
          <FluidContainer justifyContent="flex-end">
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
          </FluidContainer>
        </FluidContainer>

        <FluidContainer flex>
          <FluidContainer justifyContent="flex-start">
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
          </FluidContainer>

          <Image
            src="https://www.dropbox.com/s/kl1xc1uhm3ma2m2/students-1.png?raw=1"
            alt="Tammy Xaypraseuth"
            object-fit="contain"
            width="30%"
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              border: isHovered ? '2px solid red' : '2px solid green',
            }}
          />
        </FluidContainer>
      </CurrentTeamContainer2>

      <FluidContainer>
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
        <Button>Join Us</Button>
      </FluidContainer>
    </Page>
  );
}
