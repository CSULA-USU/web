import styled from 'styled-components';
import { Colors } from 'theme';
import { useState, useEffect } from 'react';
import { TbCircleArrowUpFilled } from 'react-icons/tb';

const Background = styled.div`
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
  document.documentElement.scrollTop = 0; // chrome, and others
};

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Background style={{ display: visible ? 'flex' : 'none' }}>
      <TbCircleArrowUpFilled
        title="Back to Top"
        size={50}
        color={Colors.grey}
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
        }}
        onClick={scrollToTop}
      ></TbCircleArrowUpFilled>
    </Background>
  );
};
