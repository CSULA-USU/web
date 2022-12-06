import styled from 'styled-components';
import { Colors } from 'theme';
import { isPropertySignature } from 'typescript';
import {
  DepartmentTextContainer,
  DepartmentPageNav,
  DepartmentProgramSection,
} from 'modules';
import { Typography } from 'components';

type LinkProps = {
  url: string;
  title: string;
};

type CardProps = {
  title: string;
  description: string;
};
interface DepartmentPage {
  URLS: LinkProps[];
  title: string;
  description: string;
  missionTitle: string;
  missionBackgroundColor?: string;
  missionCards: CardProps[];
  programTitle: string;
  programDescription: string;
  programBackgroundColor?: string;
  programMissionCards: CardProps[];
  programMissionTitle: string;
}

const ImageContainer = styled.span`
  width: 100vw;
`;

export const DepartmentPage = ({ ...props }: DepartmentPage) => (
  <div>
    <img
      src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=700&w=1915&q=80"
      alt="department logo"
    />
    <DepartmentPageNav linkList={props.URLS}></DepartmentPageNav>
    <DepartmentTextContainer
      title={props.title}
      description={props.description}
    ></DepartmentTextContainer>
    <DepartmentProgramSection
      backgroundColor={props.missionBackgroundColor}
      cardList={props.missionCards}
      title={props.missionTitle}
    ></DepartmentProgramSection>
    <DepartmentTextContainer
      title={props.programTitle}
      description={props.programDescription}
    ></DepartmentTextContainer>
    <DepartmentProgramSection
      backgroundColor={props.programBackgroundColor}
      cardList={props.programMissionCards}
      title={props.programMissionTitle}
    ></DepartmentProgramSection>
    <img
      src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=700&w=1915&q=80"
      alt="department logo"
    />
  </div>
);
