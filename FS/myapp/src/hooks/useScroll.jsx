import { useState, useEffect } from 'react';

export default function useScroll(top = 100) {
  const [isShow, setisShow] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop >= top) {
        setisShow(true);
      } else {
        setisShow(false);
      }
    };
  }, [top]);

  return {
    isShow,
  };
}
