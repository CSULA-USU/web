import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';
import { breakpoints } from 'theme';

const getBreakpointName = (width: number) => {
  if (width < breakpoints.mini) {
    return 'mini';
  } else if (width >= breakpoints.mini && width < breakpoints.mobile) {
    return 'mobile';
  } else if (width >= breakpoints.mobile && width <= breakpoints.tablet) {
    return 'tablet';
  } else if (width > breakpoints.tablet && width < breakpoints.desktop) {
    return 'desktop';
  } else if (width >= breakpoints.desktop && width < breakpoints.widescreen) {
    return 'widescreen';
  }
  return 'uhd';
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] =
    useState<keyof typeof breakpoints>('desktop');
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

  interface BreakpointMap {
    mini: any;
    mobile: any;
    tablet: any;
    desktop: any;
    widescreen: any;
    uhd: any;
  }

  const returnByBreakpoint = (breakpointMap: Partial<BreakpointMap>) => {
    const bpNames: (typeof breakpoint)[] = [
      'mini',
      'mobile',
      'tablet',
      'desktop',
      'widescreen',
      'uhd',
    ];
    const fullMap = {} as BreakpointMap;
    let currentValue: any;
    const findNextValue = () => {
      const remainingBreakpoints = bpNames.filter(
        (n) => !Object.keys(fullMap).includes(n),
      );
      for (let i = 0; i < remainingBreakpoints.length; i++) {
        const currBpName = remainingBreakpoints[i];
        if (breakpointMap[currBpName]) return breakpointMap[currBpName];
      }
    };
    bpNames.forEach((bpName) => {
      currentValue = breakpointMap[bpName] || findNextValue() || currentValue;
      fullMap[bpName] = currentValue;
    });

    return fullMap[breakpoint];
  };

  return {
    isMini,
    isMobile,
    isTablet,
    isDesktop,
    breakpoint,
    returnByBreakpoint,
  };
};
