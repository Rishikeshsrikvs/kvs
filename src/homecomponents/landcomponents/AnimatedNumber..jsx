import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { easings } from '@react-spring/web';
import './AnimatedNumber.css';

const AnimatedNumber = ({ value, duration }) => {
    const props = useSpring({ 
        from: { number: 0 }, 
        to: { number: value }, 
        config: { duration, easing: easings.linear } 
    });

    return <animated.span className="animated-number">{props.number.to(n => n.toFixed(0))}</animated.span>;
};

export default AnimatedNumber;
