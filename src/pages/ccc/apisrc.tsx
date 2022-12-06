import Head from 'next/head';
import { Colors } from 'theme';
import { Page, DepartmentPage } from 'modules';

export default function Home() {
  type LinkProps = {
    url: string;
    title: string;
  };

  type CardProps = {
    title: string;
    description: string;
  };
  let urls: LinkProps[] = [
    {
      url: 'https://www.instagram.com/apisrc.ccc/',
      title: 'Instagram',
    },
    {
      url: 'https://forms.office.com/Pages/ResponsePage.aspx?id=AiCKzo9EWE-Csdhvc-Ov3XX3NLq1a5dKvfC0NcpuYFBUMVNQRExUV0dMSVFDUkdYUVhRM1U2TExISy4u',
      title: 'P.A.L.S',
    },
    {
      url: 'https://forms.office.com/pages/responsepage.aspx?id=AiCKzo9EWE-Csdhvc-Ov3XmCNpTA3T5AiUt4YCUxHc1URE1OQTU0UU5WMzlQMVpNODJTN09XUDZWQyQlQCN0PWcu',
      title: 'Grad Commitee',
    },
    {
      url: 'https://discord.gg/quZwGJqsMm',
      title: 'Discord',
    },
    {
      url: 'https://forms.office.com/Pages/ResponsePage.aspx?id=AiCKzo9EWE-Csdhvc-Ov3XX3NLq1a5dKvfC0NcpuYFBUMVNQRExUV0dMSVFDUkdYUVhRM1U2TExISy4u',
      title: 'LinkTree',
    },
  ];

  let missionCards: CardProps[] = [
    {
      title: 'Cultural Education',
      description:
        'Provide scholarly and cultural education programs. Approaching cultural diversity from an academic perspective that provides the entire campus community with an opportunity to culturally engage and learn outside of the classroom',
    },
    {
      title: 'Cultural Engagement',
      description:
        'Provide opportunities for students, staff, faculty, and community members to be part of the practice, celebration, and demonstration of cultural celebration and joy',
    },
    {
      title: 'Cultural Student Development',
      description:
        'Provide students with opportunities to develop their academic, professional, and personal growth during their undergraduate experience',
    },
    {
      title: 'Cultural Environment Enhancement',
      description:
        ' Provide a safe space on campus for APIDA-identified students where they see themselves reflected, embraced, celebrated, and validated. Resources available within the center',
    },
  ];

  let programMissionCards: CardProps[] = [
    {
      title: 'PEER',
      description:
        'New students will be matched with a continuing student, developing a peer-to-peer relationship to support the new students transition to CSULA',
    },
    {
      title: 'ADVOCACY',
      description:
        'Addressing the needs and concerns of the APIDA community through critical dialogue and raising awareness',
    },
    {
      title: 'LEADERSHIP',
      description:
        'Gain leadership and professional development skills and experience through supporting new students and engaging with staff and faculty',
    },
    {
      title: 'SOLIDARITY',
      description:
        'Building a community of APIDA-identified students through intentional connection to foster solidarity among the APIDA diaspora at CSULA',
    },
  ];

  return (
    <Page>
      <Head>
        <title>University-Student Union</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, student, organizations, MORE, Cross Cultural Centers, Center For Student Involvement, Fitness Center, The Pit, The Gameroom, Student orgnizations, Calendar, Events, Gender and sexuality resource center, Pan African resource center, Asian Pacific islander, Chicana Latina, Information and Event Services, Distinguished Women, awards, Cultural Graduate Celebrations, LOUDmouth Zine, S.T.A.R.S. Program, Employment Opportunities, Board of Directors, Jobs, "
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DepartmentPage
        URLS={urls}
        title="ASIAN PACIFIC ISLANDER STUDENT RESOURCE CENTER"
        description="The Asian Pacific Islander Student Resource Center is one of the four identity-based centers within the Cross Cultural Centers at the University-Student Union. The APISRC was established in 1993 to address the growing needs and concerns of the Asian, Pacific Islander, and Desi American student population while enriching and raising social awareness for the entire campus community. The APISRC provides services and support for students who identity as, or are interested in, AA, PI, and DA community and cultural issues."
        missionTitle="Today,the APISRC continues to serve the mission through 4 components:"
        missionCards={missionCards}
        missionBackgroundColor={Colors.primary}
        programBackgroundColor={Colors.black}
        programTitle="APIDA P.A.L.S Mentorship Program"
        programDescription="The Asian Pacific Islander Desi American (APIDA) P.A.L.S. (Peer, Advocacy, Leadership, and Solidarity) Mentorship Program is dedicated to supporting APIDA-identified students through cultural identity development while cultivating a sense of community support, belonging, and inclusivity on Cal State Los Angeles’ campus"
        programMissionTitle="APIDA P.A.L.S commitment to achievement through 4 components:"
        programMissionCards={programMissionCards}
      />
    </Page>
  );
}
