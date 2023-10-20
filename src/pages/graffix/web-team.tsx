import { FluidContainer, Typography, Button, Image, Card } from 'components';
import { Page, LogosDisplay } from 'modules';
import styled from 'styled-components';
import { Spaces } from 'theme';
import companies from 'data/web-team-company-logos.json';

const Center = styled.div`
  text-align: center;
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
  margin: 0 15% 0 15%;
`;

const PastTeamContainter = styled.div`
  display: flex;
  jusitfy-content: center;
  margin: 0 10% 0 10%;
`;

export default function WebTeam() {
  // const company1: CompanyLogo = {
  //   name: 'Microsoft',
  //   src: 'departments/graffix/company-logos/microsoft.png',
  //   alt: 'Microsoft Logo',
  // };

  // const company2: CompanyLogo = {
  //   name: 'Snapchat',
  //   src: 'departments/graffix/company-logos/snapchat.png',
  //   alt: 'Snapchat Logo',
  // };

  // const company3: CompanyLogo = {
  //   name: 'Riot Games',
  //   src: 'departments/graffix/company-logos/riot-games.png',
  //   alt: 'Riot Games Logo',
  // };

  // const company: Company = [
  //   {
  //     company1: company1,
  //   },
  //   { company2: company2 },
  //   {
  //     company3: company3,
  //   },
  // ];

  // const listOfCompanies = [company1, company2, company3];

  // const CompaniesAdvancedTo = ({ companies }: CompaniesAdvancedToProps) => {
  //   return (
  //     <div>
  //       {companies.map((company) => {
  //         console.log('company item within companies:', company);
  //         return (
  //           <div key={company.company1.name}>
  //             <Image src={company.company1.src} alt={company.company1.alt} />
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };
  // listOfCompanies.map((c) => console.log(c));
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
        <LogosDisplay logos={companies} />
      </FluidContainer>

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
          </Card>
        </CurrentTeamContainer>
        <PastTeamContainter>
          <Card></Card>
        </PastTeamContainter>
      </FluidContainer>
    </Page>
  );
}
