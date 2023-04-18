import React from "react";
import "../../css/ExamplesBox.css";

function ExamplesBox( { setUrl } ) {

    // display examples of links to PDFs on clicking which the user can see the working of the app

    const handleExampleClick = (event) => {
        event.preventDefault();
        const url = event.target.href;
        setUrl(url);
    }

    return (
        <div className="examples-box">
            <div className="examples-box-header">
                <h3>USE CASES</h3>
            </div>
            <div className="examples-box-body">
                <div className="examples-box-body-example">
                    Access a Patent - <a href="https://patentimages.storage.googleapis.com/e7/07/72/15d7078f24c7c2/US11417091.pdf" target="_blank" onClick={handleExampleClick}>Use of co-ordinated local user devices during a shared augmented reality session</a>
                </div>
                <div className="examples-box-body-example">
                    Access a Research Paper - <a href="https://arxiv.org/pdf/1706.03762.pdf" target="_blank" onClick={handleExampleClick}>Attention is all you need</a>
                </div>
                <div className="examples-box-body-example">
                    Access a White Paper - <a href="https://bitcoin.org/bitcoin.pdf" target="_blank" onClick={handleExampleClick}>Bitcoin: A Peer-to-Peer Electronic Cash System</a>
                </div>
                <div className="examples-box-body-example">
                    <p>And more...</p>
                </div>
            </div>
        </div>
    );
}

export default ExamplesBox;