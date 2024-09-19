import styled from 'styled-components';
import { Colors } from 'theme';
import { TbCircleArrowUpFilled } from 'react-icons/tb';

const ButtonBackground = styled.button`
  background-color: white;
  border: none;
  border-radius: 35px;
  cursor: pointer;
  width: 39px;
  height: 39px;
  text-align: center;
  justify-content: center;
  align-items: center;
  float: right;
  position: fixed;
  bottom: 46px;
  right: 46px;
`;

const scrollToTop = () => {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera and others

  // programatically set focus on top-level item
  const topElement = document.getElementById('nav-logo') || document.body;
  topElement.focus();
};

export const BackToTop = () => {
  return (
    <ButtonBackground
      onClick={scrollToTop}
      aria-label="Back to Top"
      tabIndex={0}
    >
      <TbCircleArrowUpFilled
        title="Back to Top"
        size={50}
        color={Colors.grey}
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
        }}
      />
    </ButtonBackground>
  );
};
