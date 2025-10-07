import styled from 'styled-components';
import { Button, Card, FluidContainer, Typography } from 'components';
import { Spaces } from 'theme';
import { useBreakpoint } from 'hooks';
import { FiAlertTriangle } from 'react-icons/fi';
import { LuHeart, LuUsers } from 'react-icons/lu';
import { MdPhone } from 'react-icons/md';
import FSLData from 'data/fsl-full-content.json';

const AlertBox = styled.div`
  background-color: #fef2f2; /* Light red background */
  border: 1px solid #fca5a5; /* Red border */
  color: #b91c1c; /* Dark red text */
  padding: ${Spaces.md};
  border-radius: 8px;
  display: flex;
  gap: ${Spaces.sm};
  margin-top: ${Spaces.md};
  margin-bottom: ${Spaces.lg};
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.h3`
  font-weight: 600;
  color: #b91c1c;
  margin: 0; /* Reset margin to avoid extra space */
`;

const AlertDescription = styled.p`
  color: #374151;
  font-size: 0.875rem;
`;

const ResourceCardGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const HazeCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const HazingList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  color: #374151;
  margin: 0 0 ${Spaces.md} 0;
`;

const HazingPoliciesContentSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ResourceGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ResourceItem = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ResourceLabel = styled.p`
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const StyledPhoneContainer = styled.span`
  display: flex;
  align-items: center;
`;

const StyledPhoneIcon = styled(MdPhone)`
  margin-right: 0.5rem; /* mr-2 = 0.5rem */
  flex-shrink: 0; /* Prevent icon from shrinking */
`;

export const Hazing = () => {
  const { isDesktop, isMobile, isWidescreen } = useBreakpoint();
  const {
    hazingPolicies: HazingPoliciesContent,
    policyButtons: PolicyButtons,
  } = FSLData;
  return (
    <FluidContainer>
      <Typography variant="title" as="h2" size={isMobile ? 'xl' : '2xl'}>
        Stand Against Hazing
      </Typography>
      <FluidContainer
        backgroundColor="greyLightest"
        margin={isWidescreen ? '18px 0' : '36px 0'}
      >
        <Typography as="p" color="black">
          Here at Cal State LA, we create a safe, inclusive community where
          every member can thrive without fear. Hazing has no place in our
          organizations or on our campus.
        </Typography>
      </FluidContainer>
      <AlertBox role="alert" aria-live="polite">
        <FiAlertTriangle
          style={{
            color: '#dc2626',
            flexShrink: 0,
            width: '1.25rem',
            height: '1.25rem',
          }}
          aria-hidden="true"
        />
        <AlertContent>
          <AlertTitle>California Hazing Law</AlertTitle>
          <AlertDescription>
            <strong>
              Hazing is not permitted on Cal State LA&apos;s campus.
            </strong>{' '}
            Hazing is any action taken or situation created that causes or is
            likely to cause physical or psychological harm, regardless of a
            person&apos;s willingness to participate. This is in accordance with
            California law; the policies of California State University, Los
            Angeles, including the bylaws of all inter/national organizations
            represented on our campus. Hazing is not permitted. All acts of
            hazing by any organization, member, and/or alumni are specifically
            forbidden. Refer to the Student Handbook for information concerning
            Cal State LA&apos;s definition of hazing, California State law, and
            possible sanctions.
          </AlertDescription>
        </AlertContent>
      </AlertBox>
      <Typography
        as="h2"
        variant="title"
        size={isMobile ? 'xl' : '2xl'}
        margin={`${Spaces.lg} 0 ${Spaces.md}`}
      >
        What Constitutes as Hazing?
      </Typography>
      <br />
      <Typography as="p" color="black" margin={`0 0 ${Spaces.md}`}>
        Hazing includes, but is not limited to:
      </Typography>
      <HazingList>
        <li>
          <Typography>
            Physical abuse, sleep deprivation, or forced consumption of alcohol
            or drugs
          </Typography>
        </li>
        <li>
          <Typography>
            Psychological abuse, humiliation, or degradation
          </Typography>
        </li>
        <li>
          <Typography>
            Forced or coerced activities that interfere with academic
            performance
          </Typography>
        </li>
        <li>
          <Typography>
            Any activity that creates risk of physical or emotional harm
          </Typography>
        </li>
        <li>
          <Typography>
            Activities that violate federal, state, or local laws
          </Typography>
        </li>
      </HazingList>
      <Typography
        as="h2"
        variant="title"
        size={isMobile ? 'xl' : '2xl'}
        margin={`${Spaces.xl} 0 ${Spaces.md}`}
      >
        Dangers
      </Typography>
      <ResourceCardGrid>
        <HazeCard>
          <CardTitle>
            <FiAlertTriangle
              className="h-5 w-5"
              style={{ color: '#dc2626' }}
              aria-hidden="true"
            />
            Physical Harm
          </CardTitle>
          <CardDescription>
            Hazing can result in serious injury, hospitalization, or even death.
            Physical activities, forced consumption, and sleep deprivation pose
            severe health risks.
          </CardDescription>
        </HazeCard>
        <HazeCard>
          <CardTitle>
            <LuHeart
              className="h-5 w-5"
              style={{ color: '#dc2626' }}
              aria-hidden="true"
            />
            Mental Health
          </CardTitle>
          <CardDescription>
            Psychological trauma from hazing can lead to anxiety, depression,
            PTSD, and long-lasting emotional damage that affects academic and
            personal life.
          </CardDescription>
        </HazeCard>
        <HazeCard>
          <CardTitle>
            <LuUsers
              className="h-5 w-5"
              style={{ color: '#dc2626' }}
              aria-hidden="true"
            />
            Community Impact
          </CardTitle>
          <CardDescription>
            Hazing destroys trust, damages reputations, and can result in
            organizational suspension, legal consequences, and permanent harm to
            the Greek community.
          </CardDescription>
        </HazeCard>
      </ResourceCardGrid>

      {/* Resources and Support Section */}
      <Typography
        as="h2"
        variant="title"
        size={isMobile ? 'xl' : '2xl'}
        margin={`${Spaces['2xl']} 0 ${Spaces.md}`}
      >
        Resources and Support
      </Typography>
      <Typography as="p">
        If you or someone you know has experienced hazing, help is available.
        You are not alone, and reporting is confidential.
      </Typography>
      <FluidContainer padding="0">
        <ResourceGrid>
          <Card title="Emergency Assistance">
            <ResourceItem>
              <ResourceLabel>Campus Police</ResourceLabel>
              <Button
                variant="primary"
                href="tel:911"
                aria-label="Call 911 for emergency assistance"
              >
                <StyledPhoneContainer>
                  <StyledPhoneIcon aria-hidden="true" />
                  Call 911 (Emergency)
                </StyledPhoneContainer>
              </Button>
            </ResourceItem>
            <ResourceItem>
              <ResourceLabel>Campus Safety</ResourceLabel>
              <Button
                href="tel:555-0100"
                aria-label="Call Campus Safety at 555-010-0100"
              >
                <StyledPhoneContainer>
                  <StyledPhoneIcon aria-hidden="true" />
                  (555) 010-0100
                </StyledPhoneContainer>
              </Button>
            </ResourceItem>
          </Card>

          <Card title="Confidential Reporting">
            <ResourceItem>
              <ResourceLabel>Student Affairs Office</ResourceLabel>
              <Button
                href="mailto:studentaffairs@university.edu"
                aria-label="Email Student Affairs to report an incident"
              >
                Report Incident
              </Button>
            </ResourceItem>
            <ResourceItem>
              <ResourceLabel>Anonymous Hotline</ResourceLabel>
              <Button
                href="tel:555-0200"
                aria-label="Call anonymous hotline at 555-020-0200"
              >
                <StyledPhoneContainer>
                  <StyledPhoneIcon aria-hidden="true" />
                  (555) 020-0200
                </StyledPhoneContainer>
              </Button>
            </ResourceItem>
          </Card>

          <Card title="Counseling Services">
            <CardDescription style={{ marginBottom: '1rem' }}>
              Free, confidential counseling available to all students affected
              by hazing.
            </CardDescription>
            <Button
              href="tel:555-0300"
              aria-label="Call Counseling Services at 555-030-0300"
            >
              <StyledPhoneContainer>
                <StyledPhoneIcon aria-hidden="true" />
                (555) 030-0300
              </StyledPhoneContainer>
            </Button>
          </Card>

          <Card title="National Resources">
            <ResourceItem>
              <ResourceLabel>HazingPrevention.org</ResourceLabel>
              <Button
                href="https://hazingprevention.org"
                aria-label="Visit HazingPrevention.org website (opens in new tab)"
                isExternalLink
              >
                Visit Website
              </Button>
            </ResourceItem>
          </Card>
        </ResourceGrid>
      </FluidContainer>
      <Typography
        as="h2"
        variant="title"
        size={isMobile ? 'xl' : '2xl'}
        margin={`${Spaces['2xl']} 0 ${Spaces.md}`}
      >
        Sanctions
      </Typography>
      <Typography as="p" color="black" margin={`0 0 ${Spaces.md}`}>
        Sanctions for hazing will be determined based on the severity of the
        violation, whether bodily harm occurred, and the degree of
        responsibility of the individuals and/or organization involved.
      </Typography>
      <HazingPoliciesContentSection>
        {HazingPoliciesContent.map((policy) => (
          <Card
            key={policy.name}
            topBorder
            title={policy.name}
            margin={`${Spaces.sm}`}
            width={!isDesktop ? 'calc(30%)' : '100%'}
          >
            {policy.content}
          </Card>
        ))}
      </HazingPoliciesContentSection>
      <FluidContainer
        flex
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        {PolicyButtons.map((policy) => (
          <Button href={policy.href} margin={Spaces.sm} key={policy.href}>
            {policy.children}
          </Button>
        ))}
      </FluidContainer>
    </FluidContainer>
  );
};
