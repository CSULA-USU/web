import styled from 'styled-components';
import { Colors } from 'theme';
import { useState, useEffect } from 'react';
import { TbCircleArrowUpFilled } from 'react-icons/tb';

const ButtonBackground = styled.button`
  background-color: white;
  border: none;
  border-radius: 35px;
  width: 39px;
  height: 39px;
  text-align: center;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  float: right;
  position: fixed;
  bottom: 46px;
  right: 46px;
  display: none;
`;

const scrollToTop = () => {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera and others

  // programatically set focus on top-level item
  const topElement = document.getElementById('main') || document.body;
  topElement.focus();
};

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isBottom = scrollTop + windowHeight >= documentHeight;
      setVisible(isBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ButtonBackground
      style={{ display: visible ? 'flex' : 'none' }}
      onClick={scrollToTop}
      aria-label="Back to Top"
      tabIndex={1}
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
