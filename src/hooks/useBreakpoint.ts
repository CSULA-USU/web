import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';
import { breakpoints } from 'theme';

const getBreakpointName = (width: number) => {
  if (width < breakpoints.mini) {
    return 'mini';
  } else if (width >= breakpoints.mini && width < breakpoints.mobile) {
    return 'mobile';
  } else if (width >= breakpoints.mobile && width < breakpoints.tablet) {
    return 'tablet';
  } else if (width >= breakpoints.tablet && width < breakpoints.desktop) {
    return 'desktop';
  } else if (width >= breakpoints.desktop && width < breakpoints.widescreen) {
    return 'widescreen';
  }
  return 'uhd';
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('desktop');
  const resize = throttle(() => {
    setBreakpoint(getBreakpointName(window.innerWidth));
  });

  useEffect(() => {
    if (window) {
      resize();
    }
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  const isMini = breakpoint === 'mini';
  const isMobile = ['mini', 'mobile'].includes(breakpoint);
  const isTablet = ['mini', 'tablet', 'mobile'].includes(breakpoint);
  const isDesktop = ['mini', 'tablet', 'mobile', 'desktop'].includes(
    breakpoint,
  );
  return {
    isMini,
    isMobile,
    isTablet,
    isDesktop,
    breakpoint,
  };
};
