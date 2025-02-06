import styled from 'styled-components';

const ContentBarNavContainer = styled.div`
  height: 64px;
  width: 100%;
  background-color: red;

  display: flex;
  align-items: center;
`;

export const ContentBoardNav = () => {
  return <ContentBarNavContainer>Hello Navbar</ContentBarNavContainer>;
};
