import styled from 'styled-components';
import { Colors } from 'theme';

const StyledInput = styled.input`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 10px;
  height: 35px;
  font-size: 14px;
  line-height: 1;
  background-color: white;
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
  &::selection {
    background-color: ${Colors.primary};
  }
`;

export const Input = (props: any) => <StyledInput {...props} />;
