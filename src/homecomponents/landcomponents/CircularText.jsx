import React, { useEffect } from 'react';
import './CircularText.css'; // Make sure to create this CSS file

const CircularText = () => {
    useEffect(() => {
        
    }, []);

    const str = ".CONTACT NOW .CONTACT NOW";

    return (
        <div className="circularcontainer">
            <p className='circularp'>
                {str.split('').map((char, index) => (
                    <span className='circularspan' key={index} style={{ transform: `rotate(${index * (360 / str.length)}deg)` }}>
                        {char}
                    </span>
                ))}
            </p>
        </div>
    );
};

export default CircularText;
