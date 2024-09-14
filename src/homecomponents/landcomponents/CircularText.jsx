import React, { useEffect } from 'react';
import './CircularText.css'; // Make sure to create this CSS file
import center from './../../assets/images/ws3.png';

const CircularText = () => {
    useEffect(() => {
        
    }, []);

    const str = "CONTACT NOW . CONTACT NOW . ";

    return (
        <div className="circularcontainer">
            <p className='circularp'>
                {str.split('').map((char, index) => (
                    <span className='circularspan' key={index} style={{ transform: `rotate(${index * (360 / str.length)}deg)` }}>
                        {char}
                    </span>
                ))}
            </p>
            <div className="centerlogocon"><img src={center} alt="center logo" className="center-image" /></div>
        </div>
    );
};

export default CircularText;
