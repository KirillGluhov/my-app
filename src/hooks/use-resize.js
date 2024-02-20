import { useState, useEffect } from 'react';
import {
  SM,
  MD,
  LG,
  XL,
  XXL,
} from '../const/const-breackpoints';

const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isScreenSm: width >= SM,
    isScreenMd: width >= MD,
    isScreenLg: width >= LG,
    isScreenXl: width >= XL,
    isScreenXxl: width >= XXL,
  };
};

export default useResize;