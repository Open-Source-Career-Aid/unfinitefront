import React from 'react';
import '../css/Button.css';
import { useState , useEffect } from 'react';

const Button = ({ Title , onClick , buttonclassName , inputname , inputtype , inputvalue }) => {
    
    return (
        <div className='button-container'>
            <div className={buttonclassName} onClick={onClick}>
                {Title}
            </div>
        </div>
    );
    }

export default Button;