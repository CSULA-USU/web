import Head from 'next/head';
import { Page, HeaderWithVideo } from 'modules';
import OPSHeroVideo from '/videos/u-krew-header-video.mp4?thumbnailTime=0';
import MobileOPSHeroVideo from '/videos/mobile-u-krew-header-video.mp4?thumbnailTime=0';

export default function UKrew() {
  return (
    <Page>
      <Head>
        <title>U-Krew</title>
        <meta name="author" content="University-Student Union, Cal State LA" />
        <meta
          name="keywords"
          content="Cal State LA, CSULA, U-SU, University-Student Union, Staff, Directors, Administration, Center for Student Involvement, CSI, Cross Cultural Centers, CCC, Graffix, Operations, Recreation, Coordinator, Dean, Technician, Assistant, Web Designer, Executive, Employee"
        />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderWithVideo
        desktopSrc={OPSHeroVideo}
        mobileSrc={MobileOPSHeroVideo}
      />
    </Page>
  );
}
