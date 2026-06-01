import styled from 'styled-components';
import { FluidContainer, Typography } from 'components';
import { Colors } from 'theme';
import { PhotoGallery, type PhotoGallerySection } from 'modules/Gallery';

interface UAwardsGalleryYear {
  year: number;
  theme: string;
  coverFallbackSrc?: string;
  photos: PhotoGallerySection['photos'];
}

interface UAwardsGalleryProps {
  years: UAwardsGalleryYear[];
}

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin: 0 auto;
  @media (max-width: 700px) {
    padding: 56px 20px 24px;
  }
`;

const Kicker = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: 12px;
`;

const KickerRule = styled.span`
  width: 28px;
  height: 2px;
  background: ${Colors.primary};
  opacity: 0.85;
  margin-right: 12px;
`;

const toCloudinaryThumb = (src: string): string | undefined => {
  if (!src.includes('res.cloudinary.com')) return undefined;
  return src.replace('/upload/', '/upload/w_200,h_112,c_fill,q_auto,f_auto/');
};

export const UAwardsGallery = ({ years }: UAwardsGalleryProps) => {
  const sections: PhotoGallerySection[] = years.map((year) => ({
    id: String(year.year),
    label: String(year.year),
    subLabel: 'Theme',
    heading: year.theme,
    coverFallbackSrc: year.coverFallbackSrc,
    photos: year.photos.map((photo) => ({
      ...photo,
      alt: photo.alt || photo.caption,
      thumbUrl: toCloudinaryThumb(photo.src),
    })),
  }));

  return (
    <FluidContainer
      backgroundColor="greyDarkest"
      padding="96px 36px"
      paddingDesktop="72px 24px"
      paddingMobile="64px 16px"
    >
      <GalleryContainer>
        <Header>
          <Kicker>
            <KickerRule aria-hidden />
            <Typography
              as="span"
              variant="cta"
              color="primary"
              letterSpacing="0.14em"
              uppercase
            >
              Inside the Ceremony
            </Typography>
          </Kicker>

          <Typography
            as="h2"
            variant="titleLarge"
            size="3xl"
            weight="700"
            lineHeight="1.1"
            color="greyLightest"
          >
            Photo Gallery
          </Typography>

          <Typography
            as="p"
            variant="copy"
            size="md"
            color="greyLightest"
            margin="16px 0 0"
          >
            A look at the U-Awards ceremony: speeches, surprises, the cohort
            photo, the dessert table. Pick a year and experience the magic.
          </Typography>
        </Header>

        <PhotoGallery
          sections={sections}
          variant="dark"
          tabsLabel="Select gallery year"
        />
      </GalleryContainer>
    </FluidContainer>
  );
};
