import React, { useEffect, useRef } from 'react';
import BetterScroll from 'better-scroll';

export default function MBetterScroll({ children, dep }) {
  const scrollRef = useRef();

  useEffect(() => {
    const bs = new BetterScroll(scrollRef.current, {
      scrollX: true,
      probeType: 3, // listening scroll event
    });
    bs.on('scrollStart', () => {
      console.log('scrollStart-');
    });
    bs.on('scroll', ({ y }) => {
      console.log('scrolling-');
    });
    bs.on('scrollEnd', () => {
      console.log('scrollingEnd');
    });
    return () => {
      bs.destroy();
    };
  }, [dep]);

  return (
    <div
      className="scroll-wrapper"
      ref={scrollRef}
      style={{
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        paddingLeft: 15,
      }}
    >
      <ul
        className="scroll-content"
        style={{
          display: 'inline-block',
        }}
      >
        <div style={{ display: 'flex' }}>{children}</div>
      </ul>
    </div>
  );
}
