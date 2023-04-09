import React, { useState , useEffect } from 'react';
import '../css/PDFSearch.css';
import isAuthenticated from '../Functions/isAuthenticated';
import { useNavigate } from "react-router-dom";
import ProcessURL from '../Components/PDFSearch/ProcessURL';
// import ReactGA from 'react-ga';
// ReactGA.initialize('G-8YXPLS55QD');

function PDFSearch() {

    // const [userstatus , setUserstatus] = useState(null);
    const navigate = useNavigate();
    const [dataloaded , setDataloaded] = useState(false);
    const [docid , setDocid] = useState(null);

    // useEffect(() => {
    //     ReactGA.pageview(window.location.pathname + window.location.search);
    //   }
    //     , []);

    // useEffect(() => {
    //     console.log("PDFSearch page loaded");
    //     const checkUserStatus = async () => {
    //         const authenticated = await isAuthenticated();
    //         setUserstatus(authenticated);
    //         if (!authenticated) {
    //             navigate('/login');
    //         }
    //     }
    //     checkUserStatus();
    // }, [userstatus]);

    return (
        <div className='pdfsearchpage'>
            <div className='header'>
                <h1 className='logo'>unfinite</h1>
            </div>
            <div className='body'>
                <div className='pdfurlcontainer'>
                    <ProcessURL dataloaded={dataloaded} setDataloaded={setDataloaded} setDocid={setDocid}/>
                </div>
                <div className='chatcontainer'>
                </div>
            </div>
            <div className='footer'>
            </div>
        </div>
    );
}

export default PDFSearch;