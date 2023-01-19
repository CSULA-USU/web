import { Divider, FluidContainer, Typography } from 'components';
import { Spaces } from 'theme';

export const StudentOrganizationCategories = () => (
  <FluidContainer>
    <Typography variant="titleSmall" as="h2">
      Student Organization Categories
    </Typography>
    <Divider color="grey" margin={`${Spaces.xl} 0`} />
    <Typography>download module here</Typography>
  </FluidContainer>
);
