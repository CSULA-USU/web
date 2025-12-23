import styled from 'styled-components';
import { Colors } from 'theme';

const StyledTextarea = styled.textarea`
  background-color: white;
  border: 2px solid black;
  border-radius: 4px;
  display: inline-flex;
  font-size: 14px;
  height: 100px;
  line-height: 1;
  padding: 0 10px;
  width: 100%;

  &:focus {
    box-shadow: 0 0 0 2px black;
  }
  &::selection {
    background-color: ${Colors.primary};
  }
`;

export const TextArea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) => <StyledTextarea {...props} />;
