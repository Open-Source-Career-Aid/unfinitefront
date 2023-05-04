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
                <h3>Examples</h3>
            </div>
            <div className="examples-box-body">
                <div className="examples-box-body-example">
                    <a href="https://arxiv.org/pdf/2305.00993.pdf" target="_blank" onClick={handleExampleClick} rel="noreferrer">Haunted haloes: tracking the ghosts of subhaloes lost by halo finders</a>
                </div>
                <div className="examples-box-body-example">
                    <a href="https://arxiv.org/pdf/2303.10130.pdf" target="_blank" onClick={handleExampleClick} rel="noreferrer">GPTs are GPTs: An Early Look at the Labor Market Impact
Potential of Large Language Models</a>
                </div>
                {/* <div className="examples-box-body-example">
                    <p>And more...</p>
                </div> */}
            </div>
        </div>
    );
}

export default ExamplesBox;