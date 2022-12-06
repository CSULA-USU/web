import styled from 'styled-components';
import { Header, Footer } from 'modules';
import { Colors } from 'theme';
import { isPropertySignature } from 'typescript';
import { link } from 'fs';
import { Typography, Button } from 'components';

const NavContainer = styled.div`
  width: 100vw;
  display:flex;
  justify-content: center;
  margin: 1em 0;
`;

type LinkProps = {
  url: string;
  title: string;
}

type LinksList = {
    linkList: LinkProps[];
}


export const DepartmentPageNav = ({linkList} : LinksList) => {
    let list = linkList.map((obj) => {
        return <Button margin="0 24px 0 0" variant='outline' key={obj.url} href={obj.url}>
                  <Typography>{obj.title}</Typography>
               </Button>
    })
    return (
          <NavContainer>
            {list}
          </NavContainer>
)};


