import { Divider, FluidContainer, Typography } from 'components';
import { Spaces } from 'theme';

export const BODDownloads = () => (
  <FluidContainer>
    <Typography variant="titleSmall" as="h2" color="gold">
      Agenda
    </Typography>
    <Divider color="grey" margin={`${Spaces.xl} 0`} />
    <Typography>download module here</Typography>
  </FluidContainer>
);
