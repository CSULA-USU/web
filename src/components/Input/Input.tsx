import styled from 'styled-components';

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
  background-color: var(--black-a5);
  box-shadow: 0 0 0 1px var(--black-a9);
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
  &::selection {
    background-color: var(--black-a9);
    color: white;
  }
`;

export const Input = (props: any) => <StyledInput {...props} />;
