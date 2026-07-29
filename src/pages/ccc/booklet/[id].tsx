import {
  Button,
  FluidContainer,
  PageMeta,
  Typography,
  Image,
} from 'components';
import CulturalGradsData from 'data/cgc-data.json';
import { Page } from 'modules';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Spaces } from 'theme';

type Grad = (typeof CulturalGradsData)['info-cards'][number];

type Props = {
  grad?: Grad;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = CulturalGradsData['info-cards'].map((grad) => ({
    params: { id: grad.id },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id;
  const grad = CulturalGradsData['info-cards'].find((grad) => grad.id === id);
  return {
    props: {
      grad,
    },
  };
};

export default function CulturalGrad({ grad }: Props) {
  if (!grad) {
    return (
      <Page>
        <Typography>Not a valid graduation.</Typography>
      </Page>
    );
  }

  return (
    <Page>
      <PageMeta
        title={`${grad.title} | Cal State LA U-SU`}
        description={`${grad.title} for ${grad.subheader} graduates at Cal State LA. Program booklet, ceremony details, and live captions.`}
        path={`/ccc/booklet/${grad.id}`}
        imageUrl={grad.bookletHero}
        imageAlt={`${grad.title} program booklet cover`}
      />
      <FluidContainer
        flex
        flexDirection="column"
        gap={Spaces.md}
        alignItems="center"
      >
        <Image src={grad.bookletHero} alt="" width="100%" maxWidth="1200px" />
        {Array.isArray(grad.button) &&
          grad.button.slice(1).map((btn) => (
            <Button
              key={btn.buttonText}
              href={btn.buttonLink}
              aria-label={btn.buttonPlaceholder}
              variant="black"
              isExternalLink
            >
              {btn.buttonText}
            </Button>
          ))}
      </FluidContainer>
    </Page>
  );
}
