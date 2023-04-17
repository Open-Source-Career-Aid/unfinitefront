import React from 'react';
import { useState , useEffect } from 'react';
import '../css/ReferencePod.css';

const ReferencePod = ({ link , isSummaryurl , index}) => {

    console.log(link, isSummaryurl, index);

    return (
        <>
        {isSummaryurl ? 
        <div className='reference-pod-summaryurl'>
            <p className='reference-url'><span className='reference-key'>{index+1}</span><a className='reference-pod-link' href={link} target='_blank'>{link}</a></p>
        </div>
        : <div className='reference-pod'>
            <p className='reference-url'><span className='reference-key'>{index+1}</span><a className='reference-pod-link' href={link} target='_blank'>{link}</a></p>
        </div>}
        </>
    );
}

export default ReferencePod;