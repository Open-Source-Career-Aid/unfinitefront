import React from "react";

function ProcessURL({ dataloaded, setDataloaded, setDocid }) {



    return (
        <div className='processurl'>
            {/* a search bar that takes in a url and a button */}
            <div className='searchbar'>
                <input type='text' placeholder='Enter a URL' />
                <button>Search</button>
            </div>
        </div>
        )
    }

export default ProcessURL;