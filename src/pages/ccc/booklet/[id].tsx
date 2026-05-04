import { Button, FluidContainer, Typography, Image } from 'components';
import CulturalGradsData from 'data/cgc-data.json';
import { Page } from 'modules';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
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
      <Head>
        <title>{`Cultural Grads | Cal State LA U-SU`}</title>
      </Head>
      <Image
        src="/departments/ccc/clsrc/nuestra-grad/nuestra-grad-participants.jpg"
        alt="Cultural Grad Image"
        width="100%"
      ></Image>
      <FluidContainer flex flexDirection="column" gap={Spaces.md}>
        {Array.isArray(grad.button) &&
          grad.button.slice(1).map((btn) => (
            <Button
              key={btn.buttonText}
              href={btn.buttonLink}
              aria-label={btn.buttonPlaceholder}
            >
              {btn.buttonText}
            </Button>
          ))}
      </FluidContainer>
    </Page>
  );
}
