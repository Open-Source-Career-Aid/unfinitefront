import React, { useState , useEffect } from "react";

function ProcessURL({ dataloaded, setDataloaded, setDocid , url , setUrl }) {

    const [alert, setAlert] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (processing) {
            return;
        }
        const url = document.getElementsByName('url')[0].value;
        setUrl(url);
    }

    useEffect(() => {
        if (url !== null && url.slice(-4) === '.pdf') {
            console.log('send pdf')
            setAlert('Please wait while we process your PDF...it might take a while');
            setProcessing(true);
            setDataloaded(true);
            setDocid(1);
        }
        else if (url !== null && url.slice(-4) !== '.pdf') {
            setAlert('Please enter a valid PDF URL');
            setDataloaded(false);
            setDocid(null);
        }
    }, [url]);


    return (
        <div className='processurl'>
            {/* a search bar that takes in a url and a button */}
            <div className='searchbar'>
                { processing ? <div className='loader'>{alert}</div> : 
                <form onSubmit={handleSubmit} className="urlsubmit">
                    <input type='text' placeholder='Enter a URL that ends with .pdf. PLEASE ONLY LOAD PUBLICLY AVAILABLE PDFs.' name="url" />
                    <button type="submit">Analyse</button>
                </form>
                }
            </div>
        </div>
        )
    }

export default ProcessURL;