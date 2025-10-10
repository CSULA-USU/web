import styled from 'styled-components';
import {
  Button,
  Card,
  FluidContainer,
  StyledLink,
  Typography,
} from 'components';
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
  const { isMobile, isWidescreen } = useBreakpoint();
  const { policyButtons: PolicyButtons } = FSLData;
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
          At Cal State LA, we create a safe, inclusive community where every
          member can thrive without fear. Hazing has no place on our campus.
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
            Physical harm (beating, striking, shocking, harmful substances)
          </Typography>
        </li>
        <li>
          <Typography>
            Forced exhaustion (sleep deprivation, extreme exercise, confinement,
            exposure to elements)
          </Typography>
        </li>
        <li>
          <Typography>
            Forced consumption (food, alcohol, drugs, or other substances)
          </Typography>
        </li>
        <li>
          <Typography>Sexual acts or coercion</Typography>
        </li>
        <li>
          <Typography>Threats, intimidation, or criminal activity</Typography>
        </li>
        <li>
          <Typography>
            <StyledLink
              href="https://www.calstatela.edu/deanofstudents/hazing-federal-definition"
              isExternalLink
              isInverseUnderlineStyling
            >
              Federal definition of hazing
            </StyledLink>
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
            PTSD, and long&ndash;lasting emotional damage that affects academic
            and personal life.
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
      <br />
      <Typography as="p" color="black" margin={`0 0 ${Spaces.md}`}>
        If you or someone you know has experienced hazing, help is available.
      </Typography>
      <FluidContainer padding="0">
        <ResourceGrid>
          <Card title="Emergency Assistance">
            <ResourceItem>
              <ResourceLabel>Emergency</ResourceLabel>
              <Button
                variant="primary"
                href="tel:911"
                aria-label="Call 911 for emergency assistance"
              >
                <StyledPhoneContainer>
                  <StyledPhoneIcon aria-hidden="true" />
                  Call 911
                </StyledPhoneContainer>
              </Button>
            </ResourceItem>
            <ResourceItem>
              <ResourceLabel>Campus Safety</ResourceLabel>
              <Button
                href="tel:323&ndash;343&ndash;3700"
                aria-label="Call Campus Safety at 323&ndash;343&ndash;3700"
              >
                <StyledPhoneContainer>
                  <StyledPhoneIcon aria-hidden="true" />
                  (323) 343&ndash;3700
                </StyledPhoneContainer>
              </Button>
            </ResourceItem>
          </Card>

          <Card title="Reporting">
            <ResourceItem>
              <ResourceLabel>Hazing Incident Report Form</ResourceLabel>
              <Button
                href="https://nam10.safelinks.protection.outlook.com/?url=https%3A%2F%2Fcm.maxient.com%2Freportingform.php%3FCSULosAngeles%26layout_id%3D14&data=05%7C02%7Cjyasis%40calstatela.edu%7Ca32cc2977b3848ec1e1a08ddfc49d6b3%7Cce8a2002448f4f5882b1d86f73e3afdd%7C0%7C0%7C638944116238621158%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=je8Hrn5cfLimX5RbqZ56k1V2%2FMFyeNdMN3E90oHudFk%3D&reserved=0"
                aria-label="Link to hazing incident report form (opens in new tab)"
                isExternalLink
              >
                Report Incident
              </Button>
            </ResourceItem>
          </Card>

          <Card title="Anti&ndash;Hazing Policy and Resources">
            <CardDescription style={{ marginBottom: '1rem' }}>
              Click to learn more about hazing.
            </CardDescription>
            <Button
              href="https://www.calstatela.edu/deanofstudents/anti-hazing-information"
              aria-label="external link to anti-hazing information"
              isExternalLink
            >
              Anti&ndash;hazing Info
            </Button>
            <CardDescription style={{ marginBottom: '1rem' }}>
              Standards of conduct
            </CardDescription>
            <Button
              href="https://www.calstatela.edu/deanofstudents/cal-state-la-standards-conduct-and-disciplinary-procedures-university-recognized"
              aria-label="external link to anti-hazing information"
              isExternalLink
            >
              Disciplinary Procedures
            </Button>
          </Card>

          <Card title="National Resources">
            <ResourceItem>
              <CardDescription style={{ marginBottom: '1rem' }}>
                hazingprevention.org
              </CardDescription>
              <Button
                href="https://hazingprevention.org"
                aria-label="Visit HazingPrevention.org website (opens in new tab)"
                isExternalLink
              >
                Visit Website
              </Button>
            </ResourceItem>
            <ResourceItem>
              <CardDescription style={{ marginBottom: '1rem' }}>
                stophazing.org
              </CardDescription>
              <Button
                href="https://stophazing.org"
                aria-label="Visit StopHazing.org website (opens in new tab)"
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
        Policies
      </Typography>
      <FluidContainer
        flex
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        padding="0"
      >
        {PolicyButtons.map((policy) => (
          <Button
            href={policy.href}
            margin={Spaces.sm}
            key={policy.href}
            variant="black"
            isExternalLink
          >
            {policy.children}
          </Button>
        ))}
      </FluidContainer>
    </FluidContainer>
  );
};
