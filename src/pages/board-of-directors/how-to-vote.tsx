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
import { useBreakpoint } from 'hooks';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const NavItemContainer = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  *:hover,
  *:active,
  *:focus {
    color: ${Colors.gold};
  }
`;
const NavItems = ['How to Vote on GET', 'How to Vote on Mobile'];
const InstructionCard = (props: any) => {
  const { isTablet } = useBreakpoint();

  return (
    <Panel topBorder>
      {props.title && (
        <Typography variant="titleSmall" as="h3">
          {props.title}
        </Typography>
      )}
      {props.content &&
        props.content.map((t: string) => <Typography key={t}>{t}</Typography>)}
      <Image
        src={props.src}
        alt={props.alt}
        width={!isTablet ? props.width && Number(props.width) : '100%'}
      ></Image>
    </Panel>
  );
};
export default function HowToVote() {
  const [buttonName, setButtonName] = useState('How to Vote on GET');
  const { isTablet } = useBreakpoint();

  const VotingNav = () => {
    return (
      <FluidContainer
        flex
        justifyContent="space-evenly"
        backgroundColor="greyLightest"
      >
        {NavItems.map((item) => (
          <NavItemContainer
            tabIndex={0}
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
        <title>How To Vote</title>
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Board of Directors, Board, Directors, Student, Leader, ASI, Vote, Elections, Office, Candidate, Elect, Representative"
          key="keywords"
        />
      </Head>
      <FluidContainer
        backgroundColor="black"
        flex
        justifyContent="space-between"
        flexWrap={!isTablet ? 'nowrap' : 'wrap'}
      >
        <HeaderContainer>
          <Typography
            variant="pageHeader"
            color="white"
            as="h1"
            margin={isTablet ? 'auto' : ''}
          >
            <NonBreakingSpan>How to Vote</NonBreakingSpan>
          </Typography>
          <Typography color="white" lineHeight="1.8" as="p">
            The University-Student Union&apos;s Board of Directors is the
            governing board of the Union. The purpose of the Board is to
            establish policy for the Union as a student body center for the
            benefit of students, faculty, staff and alumni at Cal State Los
            Angeles.
          </Typography>
        </HeaderContainer>
        <Image
          src="/student-leader-elections/sle-vote-hero.svg"
          alt="student leader header"
          margin={Spaces.sm}
          width={isTablet ? '100%' : '50%'}
        />
      </FluidContainer>
      <VotingNav />
      <FluidContainer>
        {buttonName === 'How to Vote on GET' ? (
          <div>
            {' '}
            <Typography variant="title" as="h2" margin={`${Spaces.md} 0`}>
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
            <Typography variant="title" as="h2" margin={`${Spaces.md} 0`}>
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
