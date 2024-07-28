import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { easings } from '@react-spring/web';

const AnimatedNumber = ({ value, duration = 7000 }) => { // Default duration set to 5000ms (5 seconds)
    const props = useSpring({ 
        from: { number: 0 }, 
        to: { number: value }, 
        config: { duration, easing: easings.linear } 
    });

    return <animated.span>{props.number.to(n => n.toFixed(0))}</animated.span>;
};

export default AnimatedNumber;
