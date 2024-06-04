import React, { useEffect } from 'react';
import { animated, useSpring } from 'react-spring';

export default function Animated({ children, props }) {
  const [{ scale }, set] = useSpring(() => ({ scale: 1 }));

  useEffect(() => {
    const popAnimation = () => {
      set({ scale: 0 });
      set({ scale: 1.1 });
      set({ scale: 1 });
    };

    popAnimation();
  }, [set]);

  return (
    <animated.div style={{ transform: scale.interpolate((s) => `scale(${s})`) }}>
      {children}
    </animated.div>
  );
}
