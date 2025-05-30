import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { AiOutlineFileText } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';
import { TabPanel } from 'react-tabs';
import { Spaces } from 'theme';
import { DocumentLink, Page } from 'modules';
import { useBreakpoint } from 'hooks';
import {
  Button,
  Card,
  DescriptionCard,
  Divider,
  Expandable,
  FluidContainer,
  Image,
  Panel,
  TabCluster,
  Typography,
} from 'components';
import chapters from 'data/fsl-chapters.json';

const AB524InfoSection = styled.div`
  margin: 0 0 ${Spaces.md} 0;
`;

const AB524ReportContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 ${Spaces.sm} 0;
`;

const TextCenter = styled.div`
  text-align: center;
`;

const AboutSection = styled.div``;

const ChaptersSection = styled.div``;

const HowToJoinSection = styled.div``;

const FamilyAndFriendsSection = styled.div``;

const CurrentMembersSection = styled.div``;

const ResourcesSection = styled.div``;

const LinkInner = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: ${Spaces.sm};
  }
`;

const HazingPoliciesContentSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ResourceButtonsSection = styled.div`
  width: calc(30%);
  @media (max-width: 900px) {
    width: calc(40%);
  }
  @media (max-width: 750px) {
    width: calc(100%);
  }
  margin: ${Spaces.sm};
`;

const NavItems = [
  'About Us',
  'Chapters',
  'How to Join',
  'Family and Friends',
  'Current Members',
  'Resources',
];

const WhatIsGreekLifeDescriptionCards = [
  {
    imgSrc: '/icons/giving-hand-icon.png',
    imgAlt: '',
    title: 'Friendship',
    children:
      ' The Greek Community provides a home-away-from-home environment you can proudly come back to after graduation. Being part of the Greek Community is a chance to be a part of something greater than yourself. You will also gain lifelong friendships, memories, and a strong sense of belonging.',
  },
  {
    imgSrc: '/icons/book-icon.png',
    imgAlt: '',
    title: 'Leadership',
    children:
      'The Greek Community offers endless opportunities for developing leadership skills in its members. Members hold positions within their chapter, ranging from chapter president to committee chair. Today, it takes more than a college degree to be successful. Employers want college graduates who have demonstrated leadership abilities and aren’t afraid to get involved. The Greek Community is able to provide its members with these opportunities.',
  },
  {
    imgSrc: '/icons/connecting-people-icon.png',
    imgAlt: '',
    title: 'Philanthrophy and Service',
    children:
      'Greeks take pride in community service and philanthropy. Each chapter has a foundation or charity they sponsor through philanthropic events. Sororities and fraternities sponsor a multitude of activities each year to impact the local community and raise money.',
  },
  {
    imgSrc: '/icons/book-icon.png',
    imgAlt: '',
    title: 'Scholarship',
    children:
      'Fraternities and sororities strive for high scholarship and developing academic excellence among their chapter members. Fraternities and sororities offer time management, study skills, and other programming to help members be successful in the classroom.',
  },
];

const HowToJoinContent = [
  {
    title: 'IFC Recruitment',
    content:
      'The formal recruitment process is strongly encouraged. This is an opportunity for men to meet all of the fraternities within IFC and then make decisions of who they would like to get to know further and join. This process takes place in the early fall and spring semesters. All prospective participants must register through the online registration system that can be found within the Cal State LA Fraternity and Sorority Life webpage. A participant’s eligibility will be based on his most recent completed academic semester, whether that be graduating from high school or ending a collegiate academic semester. To be eligible to join, men coming from High School must have an unweighted 2.75 High School GPA. If men are currently enrolled in college, men must have a 2.60 cumulative GPA based on 12 or more credits. We will not round up or make exceptions for those who are below this standard.',
  },
  {
    title: 'MGC Membership Intake',
    content:
      'Each chapter within MGC conducts their own membership intake after their National or Regional Office approves the process for bringing in new members. Students who are interested in joining an MGC organization are encouraged to attend the Fraternity & Sorority Info Night that takes place at the beginning of each semester. From there, interested students are encouraged to attend chapters’ events, educational forums and civic engagement opportunities to get to know more about the organizations and its members.',
  },
  {
    title: 'NPHC Membership Intake',
    content:
      'NPHC organization host membership intake after their National or Regional Office approves the process for bringing in new members. Students who are interested in joining an NPHC organization are encouraged to attend the Fraternity and Sorority Info Night that takes place at the beginning of each semester. There interested students can learn more about the joining requirements of the NPHC organizations on our campus as well as what it means to be a member of their organization. Students are encouraged to get to know organizations and their members through their attendance at chapter events, educational forums and civic engagement opportunities. The chapters along with their National and Regional Offices determine their own joining requirements and the minimal standards are 12 hours and a 2.5 GPA. However, some organizations may have higher standards for membership.',
  },
  {
    title: 'Panhellenic Recruitment',
    content:
      'The organizations within the Panhellenic Association will host recruitment primarily early in the fall semester. All interested and prospective members must register through the online registration form on the Cal State LA Fraternity and Sorority Life webpage. Recruitment will provide women with an understanding of what it means to be in a sorority and the expectations of membership.',
  },
];

const FamilyAndFriendsCostOfMembershipConent = [
  {
    title: 'What are the financial obligations?',
    children:
      'Your student will have financial responsibilities when it comes to joining a fraternity or sorority. In most organizations, there is a one-time new member/initiation fee as well as semester membership dues. Depending on which organization your student wants to join will determine the amount of dues they will have to pay each semester. If your student is interested in becoming a member of an organization, we suggest that you sit down with them and work out a college budget to determine whether or not joining a fraternity or sorority is within reason.The dues that are paid cover a wide range of areas to keep the organizations in existence. These dues are used to pay for community service and philanthropic projects, social events, parent and alumni events, insurance and national fees as well as general chapter expenses. We encourage students who are interested in joining to ask questions to clarify what is expected of them before they join.',
  },
  {
    title: 'Recruitment/Intake Rules',
    children:
      'At Cal State LA, the joining process for each organization is based on their governing council and their National and Regional Offices. The process to join an organization is different for each governing council.',
  },
  {
    title: 'IFC Recruitment',
    children:
      'The formal recruitment process is strongly encouraged. This is an opportunity for men to meet all of the fraternities within IFC and then make decisions of who they would like to get to know further and join. This process takes place in the early fall and spring semesters. All prospective participants must register through the online registration system that can be found within the Cal State LA Fraternity and Sorority Life webpage. A participant’s eligibility will be based on his most recent completed academic semester, whether that be graduating from high school or ending a collegiate academic semester. To be eligible to join, men coming from High School must have an unweighted 2.75 High School GPA. If men are currently enrolled in college, men must have a 2.60 cumulative GPA based on 12 or more credits. We will not round up or make exceptions for those who are below this standard.',
  },
  {
    title: 'MGC Membership Intake',
    children:
      'Each chapter within MGC conducts their own membership intake after their National or Regional Office approves the process for bringing in new members. Students who are interested in joining an MGC organization are encouraged to attend the Fraternity and Sorority Info Night that takes place at the beginning of each semester. From there interested students are encouraged to attend chapters’ events, educational forums and civic engagement opportunities to get to know more about the organizations and its members.',
  },
  {
    title: 'NPHC Membership Intake',
    children:
      'NPHC organization host membership intake after their National or Regional Office approves the process for bringing in new members. Students who are interested in joining an NPHC organization are encouraged to attend the Fraternity and Sorority Info Night that takes place at the beginning of each semester. There interested students can learn more about the joining requirements of the NPHC organizations on our campus as well as what it means to be a member of their organization. Students are encouraged to get to know organizations and their members through their attendance at chapter events, educational forums and civic engagement opportunities.',
  },
  {
    title: 'Panhellenic',
    children:
      'The organizations within the Panhellenic Association will host recruitment primarily early in the fall semester. All interested and prospective members must register through the online registration form on the Cal State LA Fraternity and Sorority Life webpage. Recruitment will provide women with an understanding of what it means to be in a sorority and the expectations of membership.',
  },
];

const FamilyAndFriendsCostFAQs = [
  {
    header: 'What is involved in Membership?',
    children:
      'Joining a fraternity or sorority is a lifelong commitment and an excellent investment for your child’s future. Our students are leaders on campus and are often heavily involved in community service and philanthropic projects. Fraternity and sorority members enjoy the friendship of their “brothers” and “sisters” for life. They are highly involved, academically committed, and well-rounded.',
  },
  {
    header: 'What are the benefits of joining a Fraternity/Sorority?',
    children: (
      <Typography as="p">
        There are many benefits to being a member of a fraternity or sorority.
        Below is a list of how membership can shape your student’s college
        experience at Cal State LA.
        <ul>
          <li>Offers a home-away-from-home environment.</li>
          <li>
            Enhances education that happens in the classroom through academic
            achievement and plans to support members as well as hold them
            accountable.
          </li>
          <li>
            Provides opportunities to give back to the surrounding community,
            help others and raise awareness to causes through hands-on service
            and philanthropic donations.
          </li>
          <li>
            Increases the student&apos;s involvement on campus and within the
            community.
          </li>
          <li>
            Provides leadership skills, activities and experiences that
            aren&apos;t available to non-affiliated students.
          </li>
          <li>
            Gives members an advantage of networking with distinguished alumni.
          </li>
          <li>
            Develop lifelong friendships, memories and a strong sense of
            accomplishment.
          </li>
          <li>
            Allow students to be part of something greater than themselves.
          </li>
        </ul>
      </Typography>
    ),
  },
  {
    header: 'How does involvement in a Fraternity/Sorority affect academics?',
    children:
      'The number one goal for your student at Cal State LA, should be to graduate. Fraternities and sororities can help your student achieve this as long as they work hard and commit themselves to being successful in the classroom. Most Greek organizations not only have a minimum GPA requirement to join but also to remain a member. Typically, each individual chapter has an elected official who is responsible for keeping track of members and their academic performance. Furthermore, many fraternities and sororities have educational programs, such as tutoring and study sessions, which can assist the entire chapter in excelling academically. Most chapters also offer member scholarships. Since obtaining a degree is the main reason for attending college, our organizations are working to help all of their members be successful in the classroom.',
  },
  {
    header: 'What are the financial obligations?',
    children:
      'Your student will have financial responsibilities when it comes to joining a fraternity or sorority. In most organizations, there is a one-time new member/initiation fee as well as semester membership dues. Depending on which organization your student wants to join will determine the amount of dues they will have to pay each semester. If your student is really interested in becoming a member of an organization, we suggest that you sit down with them and work out a college budget to determine whether or not joining a fraternity or sorority is within reason. The dues that are paid cover a wide range of areas to keep the organizations in existence. These dues are used to pay for community service and philanthropic projects, social events, parent and alumni events, insurance and national fees as well as general chapter expenses. We encourage students who are interested in joining to ask questions to clarify what is expected of them before they join.',
  },
  {
    header: 'What about hazing?',
    children:
      'At California State University, Los Angeles, your student’s safety is a top priority. The University forbids hazing and all other activities that interfere with the personal liberty of an individual. Hazing may include the actions that produce bodily harm or danger, mental or physical discomfort, embarrassment, harassment, fright, or ridicule. Today, all fraternity and sorority policies strictly prohibit any type of hazing activity. And with the California Hazing Law (Penal Code 245.6) hazing can be charged as a misdemeanor or a felony. If you feel that your student may be participating in inappropriate activities associated with hazing, please call the Center for Student Involvement at (323) 343-5110.',
  },
  {
    header: 'What is Pledging?',
    children:
      'Pledging is an outdated term used for the new member education process. This period of time usually lasts 6-10 weeks and is designed to educate new members on chapter/organizational operations, fraternity and sorority culture on campus and the values of the organization.',
  },
  {
    header: 'What are the benefits of membership after college?',
    children:
      'In addition to the numerous benefits during college, fraternities and sororities provide myriad opportunities to their members after graduation. Fraternities and sororities provide a strong network for your student locally, nationally and abroad for career development and advancement. Furthermore, the leadership and organizational skills members learn in college will be invaluable in their future careers, and the friends they make will surely last a lifetime.',
  },
  {
    header: 'How much time is involved when joining a fraternity or sorority?',
    children:
      'On average, your student should expect to contribute a few hours per week for meetings and activities. If your student has the time and desire, they can also choose to participate in optional activities, such as holding an office, attending social events, helping out with various projects, etc. Some organizations require more time than others. Advise your child to ask questions regarding time commitments during their recruitment/intake process.',
  },
  {
    header: 'What is Philanthropy?',
    children:
      'Philanthropic events are events in which fraternity and sorority members will raise money for a particular charitable cause. Many chapters hold events to raise money for campus-wide events and most have charities associated with their (inter)national headquarters.',
  },
  {
    header: "Who is in charge of my student's fraternity/sorority?",
    children:
      'At Cal State LA, Fraternity and Sorority Life is staffed by Ian Prieto, FSL Coordinator and supported by the Center for Student Involvement. In addition to the support provided by CSI, chapters also elect undergraduate chapter officers to run the day-to-day operations, have alumni advisors, and are responsible to report to a(n) (inter)national headquarters.',
  },
];

const MembershipIntakeForms = [
  {
    href: 'https://www.dropbox.com/s/wr90x4ndg7mvrlr/membership-intake-checklist.pdf?e=1&raw=1',
    title: 'Membership Intake Check List',
  },
  {
    href: 'https://www.dropbox.com/s/3hawv1fwjq25z5z/notice-of-membership-intake.pdf?e=1&raw=1',
    title: 'Notice of Membership Intake',
  },
];

const HazingPoliciesContent = [
  {
    name: 'Individual',
    content:
      'No less than disciplinary probation for one academic year, no more than permanent separation from the university. In addition, the individual(s) including officers of the chapter could face criminal charges.',
  },
  {
    name: 'Organizations',
    content:
      'No less than suspension of privileges for one academic year, no more than indefinite disbanding of the organization.',
  },
  {
    name: 'Hazing',
    content:
      'California Penal Code §245.6 states the following: any method of initiative or preinitiation into a student body or organization, which is likely to cause serious bodily injury to any current, former, or prospective student of any school, community college, college, university, or educational institution in the state. This law applies to any student body or school-related organization regardless of whether it is officially recognized by an educational institution.',
  },
];

const FSLExpansionContent = [
  {
    content:
      'National or International fraternity and sorority headquarters may not solicit or recruit Cal State LA students to establish new chapters without informing the appropriate umbrella organization and the Center for Student Involvement.',
  },
  {
    content:
      'New fraternities and sororities must be approved for expansion by the appropriate governing council in accordance with established expansion policies or, in the absence of a governing council, the Center for Student Involvement.',
  },
  {
    content:
      'Once a group has membership and is granted permission to expand from the appropriate governing council and/or Cal State LA, a new fraternity or sorority must register as a student organization with the Center for Student Involvement, provide contact information for chapter officers and advisors(s), and submit a roster of members to the Fraternity and Sorority Life Coordinator.',
  },
  {
    content:
      'Expansion for Interfraternity Council fraternities must be in accordance with the standards of the North American Interfraternity conference. Expansion for Panhellenic Conference sororities must be in accordance with the National Panhellenic Conference.',
  },
];

const PolicyButtons = [
  {
    href: 'https://www.calstatela.edu/academicsenate/handbook/ch5a#honesty',
    children: 'Academic Policies',
  },

  {
    href: 'https://www.calstatela.edu/studentservices/california-code-regulations-standards-student-conduct',
    children: 'University Code of Conduct',
  },
];

const ResourceButtons = [
  {
    href: 'http://www.calstatela.edu/univ/advise/',
    title: 'Academic Advisement',
    children:
      'The University Academic Advisement Center serves as a great source of information for general education and course selection. There you can get help regarding university policies and procedures, transfer credits, and general education petitions.',
  },
  {
    href: 'http://www.calstatela.edu/univ/admiss/',
    title: 'Admissions',
    children:
      'Through this office, you can get expert advice and information specifically targeted for students interested in being admitted to Cal State LA and those who were recently admitted.',
  },
  {
    href: 'http://calstate-la.bncollege.com/webapp/wcs/stores/servlet/TBWizardView?catalogId=10001&storeId=30556&langId=-1',
    title: 'Bookstore',
    children:
      'The university bookstore is a great place to begin searching for course materials that you will need including textbooks.',
  },
  {
    href: 'http://www.calstatela.edu/univ/cdc/',
    title: 'Career Center',
    children:
      'At the Career Center, they will help you establish goals, plan for your future career and aid in getting and keeping a job.',
  },
  {
    href: 'http://www.calstatela.edu/studenthealthcenter/caps',
    title: 'Couseling & Psychological Services (CAPS)',
    children:
      'CAPS offers professional and non-judgmental help with your personal growth and psychological wellness. They specialize in mental health services which can help you express thoughts and feelings, gain perspective, alleviate emotional symptoms, improving coping skills, and make healthy changes in your life.',
  },
  {
    href: 'http://www.calstatela.edu/univ/finaid/',
    title: 'Financial Aid',
    children:
      'At the Center for Financial Aid, you can receive help finding available federal, state, and institutional sources for financing your education.',
  },
  {
    href: 'http://www.calstatela.edu/univ/hlth_ctr/',
    title: 'Health Center',
    children:
      'The Student Health Center serves as the primary health resource for the campus community. Here you can find high-quality health care and health education in order to maximize your potential for academic success and personal development.',
  },
  {
    href: 'http://www.calstatela.edu/univ/housing/',
    title: 'Housing Services',
    children:
      'Housing Services serves as a source of comfortable living for many Cal State LA students. Here you can find applications, deadlines, and services offered for students that live on campus.',
  },
  {
    href: 'https://www.calstatela.edu/academic-success',
    title: 'Tutoring Services',
    children:
      'At the University Tutorial Center you can benefit from different services such as subject-area appointment tutoring, math walk-in tutoring, study skills presentations, and coaching projects.',
  },
  {
    href: 'https://www.calstatela.edu/academic-success',
    title: 'Center for Academic Success',
    children:
      'At the writing center they aim to help students become better writers by helping you understand assignments, organize, and revise your paper at any stage of the writing process. This can be best accomplished by having a one-on-one appointment.',
  },
  {
    href: 'https://www.calstatela.edu/vets',
    title: "Veteran's Resources Center",
    children:
      'This center is aimed to help veteran and active duty students navigate the certification and application processes, make the transition to university life easier, and prepare them to reach their career and life goals. Through this program one can find help begging the enrollment process, applying for educational benefits, and completing the enrollment certification process.',
  },
];

export default function FSL() {
  const { isMini, isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>Student Organizations FSL</title>
        <meta
          name="author"
          content="The University Student Union Center for Student Involvement"
          key="author"
        />
        <meta
          name="keywords"
          content="CSULA, Cal State LA Student Union, U-SU, Center for Student Involvement, CSI, University Student, Fraternity, Sorority, Co-Ed, Greek Life, FSL, IFC Recruitment, MGC Membership Intake, NPHC Membership Intake, Panhellenic Recruitment"
          key="keywords"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
          key="description"
        />
      </Head>
      <FluidContainer
        flex
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        backgroundImage="/subtle-background-1.jpg"
      >
        <TextCenter>
          <h1>
            <Image
              src="/departments/csi/fsl/fsl-header.png"
              alt="Fraternity and Sorority Life California State University, Los Angeles"
              height={isMini ? 100 : isMobile ? 150 : 280}
              marginBottom={Spaces.lg}
            />
          </h1>
        </TextCenter>
        <TextCenter>
          <Typography as="p">
            Fraternities and sororities have been a part of the Cal State LA
            experience since 1948! We have over 25 fraternities and sororities
            on campus from which students experience relationships, community
            service, leadership development, networking, and personal growth.
            Our community includes organizations that are community service
            based, culturally focused, social, and everything between so
            there&apos;s a place for everyone in our growing community! See the
            pages below to learn more about our community, its members,
            opportunities, and events. Be sure to follow us on Instagram.
          </Typography>
        </TextCenter>
      </FluidContainer>
      <TabCluster tabItems={NavItems}>
        <TabPanel>
          <AboutSection>
            <FluidContainer>
              <Expandable
                indicator={<BiChevronRight size={36} />}
                header={
                  <Typography variant="titleSmall" as="h2">
                    What is Greek Life?
                  </Typography>
                }
              >
                <Typography as="p" margin={`${Spaces.md} 0 `}>
                  Fraternities and sororities provide an enriching student
                  experience that helps individuals to grow and develop as
                  students who have leadership and social skills, who prioritize
                  their academics and service to community. Membership in a
                  fraternity or sorority is life-long and provides connections
                  long after graduation. Membership experiences focus around the
                  following pillars of fraternity/sorority life
                </Typography>
                <FluidContainer flex flexWrap="wrap" justifyContent="center">
                  {WhatIsGreekLifeDescriptionCards.map((props) => (
                    <DescriptionCard
                      rounded
                      hoverable
                      margin="24px 8px"
                      key={`${props.children}`}
                      width={!isTablet ? 'calc(45%)' : '100%'}
                      minHeight="280px"
                      imgSrc={props.imgSrc}
                      imgAlt={props.imgAlt}
                    >
                      <Typography weight="700">{props.title}</Typography>
                      <Typography>{props.children}</Typography>
                    </DescriptionCard>
                  ))}
                </FluidContainer>
              </Expandable>
              <Divider margin={`${Spaces.md} 0`} />
              <Expandable
                indicator={<BiChevronRight size={36} />}
                header={
                  <Typography variant="titleSmall" as="h2">
                    Community Reports
                  </Typography>
                }
              >
                <Typography as="p" margin={`0 0 ${Spaces.md} 0 `}>
                  Community reports are created to demonstrate academic,
                  service, and philanthropic efforts of the Greek community.
                </Typography>
                <Typography variant="subheader" as="h3">
                  Campus-Recognized Sorority And Fraternity Transparency Act -
                  AB524
                </Typography>
                <Typography as="p" margin={`0 0 ${Spaces.md} 0`}>
                  The Annual Campus-Recognized Sorority and Fraternity
                  Transparency Report, which offers insights about recognized
                  fraternities and sororities Cal State LA during the previous
                  academic year, is now available. You can access the report
                  here by clicking the button below.
                </Typography>
                <AB524InfoSection>
                  <Typography as="p">
                    This report is shared annually in October in compliance with{' '}
                    <Link
                      href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB524"
                      aria-label="AB-524 Postsecondary education: Campus-Recognized Sorority and Fraternity Transparency Act information"
                    >
                      <strong>
                        Assembly Bill 524; Sections 66310-66312 of the
                        California Education Code
                      </strong>
                    </Link>
                    , which requires that institutions in California with
                    fraternities and sororities compile and maintain details
                    about each organization, including information about the
                    organizations, their members, and their conduct.
                  </Typography>
                </AB524InfoSection>
                <AB524ReportContainer>
                  <DocumentLink href="https://www.dropbox.com/scl/fi/bk41ypgbsdjvt0zq9nx5q/2022-2023-AB-524-Report.pdf?rlkey=blktva7fvvqkrlobxcp4j4kuh&st=y05rbrpi&raw=1">
                    FY 22-23 Report
                  </DocumentLink>
                  <DocumentLink href="/departments/csi/fsl/AB524/2023-2024 AB 524 Report.pdf">
                    FY 23-24 Report
                  </DocumentLink>
                </AB524ReportContainer>
                <Typography variant="subheader" as="h3">
                  Chapter Status
                </Typography>
                <Typography as="p">
                  In an effort to be as transparent as possible with our
                  community, the Center for Student Involvement has published
                  the chapter status of each chapter chartered at California
                  State University, Los Angeles.
                </Typography>
                <Typography weight="700" as="h4" margin={`${Spaces.sm} 0 0`}>
                  <strong>University Status Key for FSl Groups</strong>
                </Typography>
                <ul>
                  <li>
                    <Typography as="p">
                      <strong>Good Standing: </strong> the organization is
                      officially recognized by the university. These
                      organizations have the privileges of using University
                      facilities and equipment, holding meetings and programs on
                      campus, recruiting members that will be recognized by the
                      University, participating in University-sponsored
                      activities and events, and other benefits outlined in the
                      Cal State LA Student Organization Handbook.
                    </Typography>
                  </li>
                  <li>
                    <Typography as="p">
                      <strong>Unrecognized: </strong> the organization is not in
                      good standing and is no longer associated with the
                      University, their HQs, or council. The organization and
                      its members do not receive any support or advisement from
                      the University. Unrecognized organizations may not
                      participate in any university-sponsored activity and may
                      not utilize any property owned, operated, leased, or
                      managed by Cal State LA. The University has severed its
                      relationship with these organizations due to significant
                      and serious concerns over the health and safety of our
                      students and university community, and the University
                      would strongly discourage maintaining or seeking
                      membership in these organizations.
                    </Typography>
                  </li>
                  <li>
                    <Typography as="p">
                      <strong>Probation: </strong>places the organization on
                      probation for a period of time during which the
                      organization is expected to demonstrate exemplary
                      compliance with University policies. Probation may include
                      conditions that the organization must meet to be removed
                      from probation. The probationary conditions may specify
                      the sanctions to be imposed should the organization not
                      comply with the term(s) of probation.
                    </Typography>
                  </li>
                </ul>
                <abbr title="Fraternity and Sorority Scoresheet">
                  <Button href="https://csula.sharepoint.com/:x:/s/CenterForStudentInvolvement/EVRwQIqtOeFAnArKx6PdXiwBT0QETtyq41vdycvduqprgQ?e=CEVBdS">
                    FSL Scoresheet
                  </Button>
                </abbr>
              </Expandable>
              <Divider margin={`${Spaces.md} 0`} />
              <Expandable
                indicator={<BiChevronRight size={36} />}
                header={
                  <Typography variant="titleSmall" as="h2">
                    Visit Us
                  </Typography>
                }
              >
                <Typography as="p" margin={`${Spaces.md} 0 `}>
                  The CSI staff is available during the work week and can be
                  seen on campus at night and weekends for meetings and programs
                  to assist you in your fraternity and sorority experience.
                  Please email us or stop by our office for more information.
                </Typography>
                <Typography weight="700" as="h3">
                  Contact Us
                </Typography>
                <Typography as="p">Phone: 323-343-5113</Typography>
                <Typography as="p">Email: iprieto7@calstatela.edu</Typography>
              </Expandable>
              <Divider margin={`${Spaces.md} 0`} />
            </FluidContainer>
          </AboutSection>
        </TabPanel>
        <TabPanel>
          <ChaptersSection>
            <FluidContainer>
              {chapters.map((obj: any) =>
                Object.keys(obj).map((item) => (
                  <>
                    <Expandable
                      indicator={<BiChevronRight size={36} />}
                      header={
                        <Typography variant="titleSmall"> {item}</Typography>
                      }
                    >
                      <FluidContainer
                        flex
                        justifyContent="center"
                        flexWrap="wrap"
                      >
                        {obj[item].map((p: any) => (
                          <Card
                            rounded
                            title={p.name}
                            key={p.name}
                            width={
                              isMobile
                                ? '100%'
                                : isTablet
                                ? 'calc(45%)'
                                : 'calc(33.33% - 8px)'
                            }
                            margin={` 0 ${Spaces.xs} ${Spaces.sm}`}
                          >
                            <Image
                              marginBottom={Spaces.lg}
                              src={p.crest}
                              alt=""
                              width="90%"
                            />
                            <Typography as="span">
                              <strong>Values: </strong>
                              {p.values.map((value: string) => value + ' ')}
                              <br />
                              <strong>Founding: </strong>
                              {p.founding}
                              <br />
                              {p.communityService && (
                                <Typography as="span">
                                  <strong>Community Service:</strong>
                                  {p.communityService.map(
                                    (service: string) => service + ' ',
                                  )}
                                </Typography>
                              )}
                              <strong>Colors:</strong>
                              {p.colors.map((color: string) => color + ' ')}
                              <br />
                              <strong>Symbol:</strong>
                              {p.symbol}
                            </Typography>
                          </Card>
                        ))}
                      </FluidContainer>
                    </Expandable>
                    <Divider margin={`${Spaces.md} 0`} />
                  </>
                )),
              )}
            </FluidContainer>
          </ChaptersSection>
        </TabPanel>
        <TabPanel>
          <HowToJoinSection>
            <FluidContainer>
              <Typography as="p" color="white" margin={`${Spaces.sm} 0`}>
                At Cal State LA, the joining process for each organization is
                based on their governing council and their National and Regional
                Offices. The process to join an organization is different for
                each governing council.
              </Typography>
              {HowToJoinContent.map((item) => (
                <FluidContainer flex flexWrap="wrap" key={item.title}>
                  <Card title={item.title} width="100%" topBorder>
                    {item.content}
                  </Card>
                </FluidContainer>
              ))}
            </FluidContainer>
          </HowToJoinSection>
        </TabPanel>
        <TabPanel>
          <FamilyAndFriendsSection>
            <FluidContainer>
              <Typography
                variant="titleSmall"
                color="gold"
                as="h2"
                margin={`${Spaces.md} 0`}
              >
                Welcome to Fraternity & Sorority Life at Cal State LA!
              </Typography>
              <Typography as="p">
                Your student has embarked upon a great adventure and opportunity
                by choosing to attend California State University, Los Angeles.
                Your student has many opportunities ahead of them while at Cal
                State LA. By joining a fraternity or sorority, they are joining
                a number of other new members in their search for a sense of
                community at the university. Being in a new environment can
                cause students to feel overwhelmed. and for many parents, the
                Greek community conjures up images of Animal House. That’s
                simply not the reality! There are many myths about the Greek
                community, but the reality is that men and women in fraternities
                and sororities are committed to their academics, volunteer time
                in the community, develop and strengthen their leadership
                skills, and form a campus network with other Greeks. Our Greek
                community consists of over 20 different organizations and over
                500 students. As the Center for Student Involvement staff, we
                work closely with the recognized organizations to enhance the
                overall Greek experience by upholding their values, community
                standards and university Policies.
              </Typography>
              <Typography
                variant="titleSmall"
                as="h2"
                margin={`${Spaces.md} 0`}
              >
                Your Role as a Parent/Family Member. Get Connected, Stay
                Informed, Support Your Students.
              </Typography>
              <Typography as="p">
                Students need support throughout the process of
                recruitment/intake and new member education. Be supportive and
                learn as much as you can about Greek life by asking questions of
                your student as they meet members in fraternities and
                sororities. If you have questions about what your student is
                saying, call the Center for Student Involvement. We&apos;re
                happy to answer any questions.
                <br />
                <br />
                Keep an open mind. Greek life is not for everyone. Just because
                you may have been a fraternity or sorority member doesn&apos;t
                mean that it is the right choice for your student and vice
                versa. Fraternities and sororities are different on every
                campus. Groups that may have been strong on the campus where you
                attended school or that you&apos;ve experienced may not have the
                same reputation at Cal State LA. Let your student choose the
                group that they feel the most comfortable joining.
                <br />
                <br />
                Talk to your student beforehand about the financial obligation.
                Determine who will pay for what and where the limits are.
                <br />
                <br />
                You do not want to become too involved in the sorority and
                fraternity recruitment/intake process - this is your
                student&apos;s decision. There will be plenty of activities and
                events for you to attend once your student joins one of our
                organizations.
                <br />
                <br />
                Too often, parents do not give their students the autonomy to
                navigate their own experience as a college student. It helps the
                student mature and gain some assertiveness when they feel the
                need to call various offices with questions or concerns about
                their decision to go Greek.
                <br />
                <br />
                If you have any questions or concerns about Greek Life on Cal
                State LA&apos;s campus, please contact us!
              </Typography>
              <Typography weight="700" as="h3" margin={`${Spaces.md} 0 0`}>
                Contact Us
              </Typography>
              <Typography as="p">
                Phone: 323-343-5709 <br /> Email: iprieto7@calstatela.edu
              </Typography>
              <Typography
                variant="titleSmall"
                as="h2"
                margin={`${Spaces.md} 0`}
              >
                Cost of Membership
              </Typography>

              {FamilyAndFriendsCostOfMembershipConent.map((card) => (
                <Card
                  key={card.title}
                  {...card}
                  topBorder
                  margin={`${Spaces.md} 0`}
                />
              ))}
            </FluidContainer>
          </FamilyAndFriendsSection>
        </TabPanel>
        <TabPanel>
          <CurrentMembersSection>
            <FluidContainer>
              <Typography variant="title" as="h2">
                Membership Intake Forms
              </Typography>
              <FluidContainer
                flex
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
                padding="0"
              >
                {MembershipIntakeForms.map((form) => (
                  <Button
                    variant="outline"
                    href={form.href}
                    key={form.title}
                    margin={Spaces.sm}
                  >
                    <LinkInner>
                      <AiOutlineFileText size="24px" />
                      {form.title}
                    </LinkInner>
                  </Button>
                ))}
              </FluidContainer>
              <Typography variant="title" as="h2" margin={`${Spaces.sm} 0`}>
                Policies
              </Typography>
              <Typography variant="cta" as="h3">
                California Hazing Law
              </Typography>
              <Typography>
                <strong>
                  Hazing is not permitted on Cal State LA&apos;s campus.{' '}
                </strong>
                This is in accordance with California law; the policies of
                California State University, Los Angeles, including the bylaws
                of all inter/national organizations represented on our campus,
                hazing is not permitted. All acts of hazing by any organization,
                member, and/or alumni are specifically forbidden. Refer to the
                Student Handbook for information concerning Cal State LA&apos;s
                definition of hazing, California State law, and possible
                sanctions.
              </Typography>
              <Typography as="p" margin={`${Spaces.md} 0`}>
                At Cal State LA, the sanctions for hazing include:
              </Typography>
              <HazingPoliciesContentSection>
                {HazingPoliciesContent.map((policy) => (
                  <Card
                    key={policy.name}
                    topBorder
                    title={policy.name}
                    margin={`${Spaces.sm}`}
                    width={!isDesktop ? 'calc(30%)' : '100%'}
                  >
                    {policy.content}
                  </Card>
                ))}
              </HazingPoliciesContentSection>
              <FluidContainer
                flex
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
              >
                {PolicyButtons.map((policy) => (
                  <Button
                    href={policy.href}
                    margin={Spaces.sm}
                    key={policy.href}
                  >
                    {policy.children}
                  </Button>
                ))}
              </FluidContainer>
              <Typography variant="title" as="h2">
                {' '}
                Expansion of New Fraternities and Sororities
              </Typography>
              {FSLExpansionContent.map((item) => (
                <Panel key={item.content} margin={`${Spaces.md} 0`}>
                  <Typography>{item.content}</Typography>
                </Panel>
              ))}
            </FluidContainer>
          </CurrentMembersSection>
        </TabPanel>
        <TabPanel>
          <ResourcesSection>
            <Typography variant="title" as="h1">
              Resources
            </Typography>
            <FluidContainer justifyContent="center" flex flexWrap="wrap">
              {ResourceButtons.map((resource) => (
                <ResourceButtonsSection key={resource.title}>
                  <a href={resource.href}>
                    <Card
                      topBorder
                      minHeight={isMobile ? '320px' : '100%'}
                      title={resource.title}
                      hoverable
                      rounded
                    >
                      <Typography>{resource.children}</Typography>
                    </Card>
                  </a>
                </ResourceButtonsSection>
              ))}
            </FluidContainer>
          </ResourcesSection>
        </TabPanel>
      </TabCluster>
      <FluidContainer backgroundColor="black">
        <Typography
          variant="title"
          color="gold"
          as="h2"
          margin={`0 0 ${Spaces.md} `}
        >
          Frequently Asked Questions
        </Typography>
        {FamilyAndFriendsCostFAQs.map((faq) => (
          <div key={faq.header}>
            <Expandable
              indicator={<BiChevronRight size={36} color="white" />}
              header={
                <Typography color="white" variant="titleSmall" as="h3">
                  {faq.header}
                </Typography>
              }
            >
              <Typography color="white" margin={`${Spaces.md} 0`}>
                {faq.children}
              </Typography>
            </Expandable>
            <Divider color="gold" margin={`${Spaces.md} 0`} />
          </div>
        ))}
      </FluidContainer>
    </Page>
  );
}
