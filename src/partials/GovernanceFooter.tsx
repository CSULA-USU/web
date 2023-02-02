import { Divider, FluidContainer, Typography } from 'components';
import { Spaces } from 'theme';

export const GovernanceFooter = () => (
  <FluidContainer innerMaxWidth="1200px" backgroundColor="greyDarkest">
    <Typography variant="title" color="white">
      The University-Student Union&apos;s Board of Directors is the governing
      board of the Union.{' '}
      <Typography as="span" variant="title" color="primary">
        Become a Student Leader
      </Typography>
    </Typography>
    <Divider color="grey" margin={`${Spaces.lg} 0 0`} />
  </FluidContainer>
);
