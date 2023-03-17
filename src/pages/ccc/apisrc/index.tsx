import Head from 'next/head';
import styled from 'styled-components';
import { Header, OfficeHours, Page } from 'modules';
import { FluidContainer, Image } from 'components';
import { useBreakpoint } from 'hooks';
import { Colors, FontSizes, Spaces } from 'theme';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaDiscord, FaTiktok } from 'react-icons/fa';

const buttons = [
  { text: 'APIDA Grad', href: '#apida-grad' },
  {
    text: 'Volunteer',
    href: 'https://forms.office.com/pages/responsepage.aspx?id=AiCKzo9EWE-Csdhvc-Ov3SKXNpO6eVxLkvnb3NWEIOBUNjIzMUxQNjVERkhDWUY4NURMTjZLUEkwSC4u',
  },
];
const hours = [
  {
    title: 'Office Hours',
    times: [
      'Monday - Thursday: 8:30 AM - 7:00 PM',
      'Friday: 8:30 AM - 4:00 PM',
    ],
  },
];

export default function APISRC() {
  const { isDesktop } = useBreakpoint();

  const HeaderContainer = styled.div`
    background: url(/bod-cta-background.jpg) no-repeat;
  `;

  const HeaderLeftContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: ${Spaces.xl};
  `;

  return (
    <Page>
      <Head>
        <title>U-SU APISRC</title>
        <meta name="author" content="apisrc coordinator" />
        <meta
          name="keywords"
          content="csula cal state la student union cross cultural centers asian pacific islander student resource ccc u-su university-student"
        />
        <meta
          name="description"
          content="The Asian Pacific Islander Student Resource Center is one of the four identity-based centers within the Cross Cultural Centers at the University-Student Union"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderContainer>
        <FluidContainer flex justifyContent="flex-end">
          <a
            style={{ color: Colors.black, margin: `0 ${Spaces.sm}` }}
            href="https://discord.com/invite/quZwGJqsMm"
          >
            <FaDiscord
              fontSize={FontSizes['2xl']}
              aria-label="apisrc discord icon"
            />
          </a>
          <a
            style={{ color: Colors.black, margin: `0 ${Spaces.sm}` }}
            href="https://www.instagram.com/apisrc.ccc/"
          >
            <AiOutlineInstagram
              fontSize={FontSizes['2xl']}
              aria-label="apisrc instagram icon"
            />
          </a>
          <a
            href="https://linktr.ee/apisrc.ccc"
            style={{ margin: `auto ${Spaces.sm}` }}
          >
            <Image
              alt="linktree icon"
              src="/departments/logos/linktree.svg"
              height="29px"
              width="32px"
            />
          </a>
          <a
            style={{ color: Colors.black, margin: `0 ${Spaces.sm}` }}
            href="https://www.tiktok.com/@usugraffix?is_from_webapp=1&sender_device=pc"
          >
            <FaTiktok fontSize={FontSizes.xl} aria-label="apisrc tiktok icon" />
          </a>
        </FluidContainer>
        <HeaderLeftContainer>
          <Header
            title="Asian Pacific Islander Student Resource Center"
            buttons={buttons}
          >
            The APISRC is one of the four identity-based centers within the
            Cross Cultural Centers at the University-Student Union. The APISRC
            was established in 1993 to address the growing needs and concerns of
            the Asian, Pacific Islander, and Desi American student population
            while enriching and raising social awareness for the entire campus
            community. The APISRC provides services and support for students who
            identity as, or are interested in, AA, PI, and DA community and
            cultural issues.
          </Header>
          {!isDesktop && (
            <Image
              src="/departments/ccc/apisrc/apisrc-sticker-2.svg"
              alt="students"
              width={400}
              height={500}
            ></Image>
          )}
        </HeaderLeftContainer>
        <FluidContainer backgroundColor="transparent">
          <OfficeHours
            address="5154 State University Dr, Los Angeles, CA 90032 Room 206"
            phoneNumber="(323)-343-5001"
            hours={hours}
          ></OfficeHours>
        </FluidContainer>
      </HeaderContainer>
      <FluidContainer flex justifyContent="center">
        <Image
          alt="center for student involvement logo"
          src="/departments/ccc/apisrc-header.png"
        />
      </FluidContainer>
    </Page>
  );
}
