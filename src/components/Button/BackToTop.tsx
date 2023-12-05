// import { Typography } from 'components';
// import styled from 'styled-components';
import { Colors } from 'theme';
import { useState, useEffect } from 'react';
// import { BiArrowToTop } from 'react-icons/bi';
// import { FaCircleArrowUp } from 'react-icons/fa6';
// import {FaArrowCircleUp} from 'react-icons/fa';
// import { BsArrowUpCircleFill } from "react-icons/bs";
import { TbCircleArrowUpFilled } from 'react-icons/tb';

// const StyledButton = styled.button`
//   background-color: ${Colors.greyLighter};
//   opacity: 0.7;
//   border: none;
//   border-radius: 35px;
//   width: 60px;
//   height: 60px;
//   text-align: center;
//   cursor: pointer;
//   justify-content: center;
//   align-items: center;
//   float: right;
//   position: fixed;
//   bottom: 70px;
//   right: 70px;
//   display: none;
// `;

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
    <TbCircleArrowUpFilled
      size={50}
      color={Colors.grey}
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        opacity: '0.75',
      }}
      display={visible ? 'flex' : 'none'}
      onClick={scrollToTop}
    ></TbCircleArrowUpFilled>
    // <StyledButton
    //   onClick={scrollToTop}
    //   style={{ display: visible ? 'flex' : 'none' }}
    // >
    //   {/* <Typography as="p" variant="copy" size="xl" color="greyDarker">
    //     ↑
    //   </Typography> */}

    // </StyledButton>
  );
};
