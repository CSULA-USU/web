import styled from 'styled-components';
import { Button, Card, FluidContainer, Typography } from 'components';
import { Spaces } from 'theme';
import { useBreakpoint } from 'hooks';
import { FiAlertTriangle } from 'react-icons/fi';
// import { LuHeart, LuUsers } from "react-icons/lu";
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
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.h3`
  font-weight: 600;
  color: #dc2626;
  margin: 0; /* Reset margin to avoid extra space */
`;

const AlertDescription = styled.p`
  color: #374151;
  font-size: 0.875rem;
`;

const HazingPoliciesContentSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Hazing = () => {
  const { isDesktop, isMobile } = useBreakpoint();
  const {
    hazingPolicies: HazingPoliciesContent,
    policyButtons: PolicyButtons,
  } = FSLData;
  return (
    <FluidContainer>
      <Typography variant="title" as="h2" size={isMobile ? 'xl' : '2xl'}>
        Stand Against Hazing
      </Typography>
      <Typography as="p" color="black">
        Here at Cal State LA, we create a safe, inclusive community where every
        member can thrive without fear. Hazing has no place in our organizations
        or on our campus.
      </Typography>
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
      <Typography as="p" margin={`${Spaces.md} 0`}>
        Sanctions include:
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
