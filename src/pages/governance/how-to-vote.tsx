import Head from 'next/head';
import { Page } from 'modules';
import {
  FluidContainer,
  Image,
  NonBreakingSpan,
  Panel,
  Typography,
} from 'components';
import styled from 'styled-components';
import webInstructions from 'data/howToVoteWeb.json';
import mobileInstructions from 'data/howToVoteMobile.json';
import { Spaces, Colors } from 'theme';
import { useState } from 'react';
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const NavItemContainer = styled.div`
  *:hover {
    color: ${Colors.gold};
  }

  *:active {
    color: ${Colors.gold};
  }
`;
const NavItems = ['How to Vote on GET', 'How to Vote on Mobile'];
const InstructionCard = (props: any) => {
  return (
    <Panel topBorder>
      {props.title && (
        <Typography variant="titleSmall">{props.title}</Typography>
      )}
      {props.content &&
        props.content.map((t: string) => <Typography key={t}>{t}</Typography>)}
      <Image
        src={props.src}
        alt={props.alt}
        width={props.width && Number(props.width)}
      ></Image>
    </Panel>
  );
};
export default function HowToVote() {
  const [buttonName, setButtonName] = useState('How to Vote on GET');
  console.log(buttonName);

  const VotingNav = () => {
    return (
      <FluidContainer
        flex
        justifyContent="space-evenly"
        backgroundColor="greyLightest"
      >
        {NavItems.map((item) => (
          <NavItemContainer
            key={item}
            onClick={() => {
              setButtonName(item);
            }}
          >
            <Typography color="black" variant="copy" weight="700">
              {item}
            </Typography>
          </NavItemContainer>
        ))}
      </FluidContainer>
    );
  };

  return (
    <Page>
      <Head>
        <title>University-Student Union</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Board of Directors, Board, Directors, student, leader, asi "
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FluidContainer
        backgroundColor="black"
        flex
        justifyContent="space-between"
      >
        <HeaderContainer>
          <Typography variant="pageHeader" color="white">
            <NonBreakingSpan>How to Vote</NonBreakingSpan>
          </Typography>
          <Typography color="white" lineHeight="1.8">
            The University-Student Union&apos;s Board of Directors is the
            governing board of the Union. The purpose of the Board is to
            establish policy for the Union as a student body center for the
            benefit of students, faculty, staff and alumni at Cal State Los
            Angeles.
          </Typography>
        </HeaderContainer>
        <Image
          src="/student-leader-elections/student-leader-header.png"
          alt="student leader header"
          width={800}
        ></Image>
      </FluidContainer>
      <VotingNav></VotingNav>
      <FluidContainer>
        {buttonName === 'How to Vote on GET' ? (
          <div>
            {' '}
            <Typography variant="title" margin={`${Spaces.md} 0`}>
              Voting on GET
            </Typography>
            {webInstructions.map((props) => (
              <InstructionCard
                key={props.title}
                title={props.title}
                content={props.content}
                src={props.src}
                alt={props.alt}
                width={props.width}
              />
            ))}
          </div>
        ) : (
          <div>
            {' '}
            <Typography variant="title" margin={`${Spaces.md} 0`}>
              Voting on GET Mobile
            </Typography>
            {mobileInstructions.map((props) => (
              <InstructionCard
                key={props.title}
                title={props.title}
                content={props.content}
                src={props.src}
                alt={props.alt}
                width={props.width}
              />
            ))}
          </div>
        )}
      </FluidContainer>
    </Page>
  );
}
