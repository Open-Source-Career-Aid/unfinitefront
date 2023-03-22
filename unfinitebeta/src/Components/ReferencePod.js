import React from 'react';
import { useState , useEffect } from 'react';
import '../css/ReferencePod.css';

const ReferencePod = ({ link , isSummaryurl}) => {

    return (
        <>
        {isSummaryurl ? 
        <div className='reference-pod-summaryurl'>
            <p className='reference-url'><a className='reference-pod-link' href={link} target='_blank'>{link}</a></p>
        </div>
        : <div className='reference-pod'>
            <p className='reference-url'><a className='reference-pod-link' href={link} target='_blank'>{link}</a></p>
        </div>}
        </>
    );
}

export default ReferencePod;