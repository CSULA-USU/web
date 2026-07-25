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
  transition: background-color 0.3s ease-in-out;
  z-index: 99;

  &:hover {
    background-color: ${Colors.black};
  }
`;

const StyledBackToTopIcon = styled(TbCircleArrowUpFilled)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  color: ${Colors.grey};
  font-size: 50px;
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    color: ${Colors.primary};
    transform: scale(1.1);
  }

  &:active {
    position: fixed;
    bottom: 40px;
    right: 40px;
    transform: scale(1);
  }
`;

const scrollToTop = () => {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera and others

  // programatically move focus to the top of the page so keyboard users
  // aren't stranded on the fixed button after the scroll
  const topElement =
    document.getElementById('nav-logo-desktop') ||
    document.getElementById('nav-logo-mobile') ||
    document.body;
  topElement.setAttribute('tabindex', '-1');
  topElement.focus();
};

export const BackToTop = () => {
  return (
    <ButtonBackground
      onClick={scrollToTop}
      aria-label="Back to Top"
      tabIndex={0}
    >
      <StyledBackToTopIcon title="Back to Top" size={50} />
    </ButtonBackground>
  );
};
