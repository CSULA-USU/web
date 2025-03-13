import { FluidContainer, Typography } from '../components';
export const PhotoVideoDisclaimer = () => (
  <FluidContainer>
    <Typography variant="title" as="h2" margin="0 0 Spaces.md">
      Photo and Video Disclaimer
    </Typography>
    <FluidContainer backgroundColor="greyLightest">
      <Typography as="p" margin="0 0 16px 0">
        When you attend a California State University, Los Angeles event, you
        enter an area where photography, audio recording, and video recording
        may occur. By entering the event premises, you consent to such media
        recording and its release, publication, exhibition, or reproduction to
        be used for news, webcasts, promotional purposes, telecasts,
        advertising, and inclusion on websites.
      </Typography>
      <Typography as="p">
        You further waive all rights you may have to any claims in connection
        with any exhibition, streaming, webcasting, televising, or other
        publication of these materials, regardless of the purpose or sponsoring
        of such exhibiting, broadcasting, webcasting or other publication.
      </Typography>
    </FluidContainer>
  </FluidContainer>
);
