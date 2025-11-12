import styled from 'styled-components';
import { Colors } from 'theme';

const StyledTextarea = styled.textarea`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 10px;
  height: 100px;
  font-size: 14px;
  line-height: 1;
  background-color: white;
  padding: 10px;
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
  &::selection {
    background-color: ${Colors.primary};
  }
`;

export const TextArea = (props: any) => <StyledTextarea {...props} />;
