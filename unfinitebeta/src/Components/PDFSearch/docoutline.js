import React from "react";


function DocOutline() {
    const docoutline = ['Introduction' , 'Background' , 'Related Work' , 'Methodology' , 'Results' , 'Conclusion' , 'References' , 'Appendix'];
    const handleOutlineClick = (event) => {
        event.preventDefault();
        // const url = event.target.href;
        // setUrl(url);
    }

    return (
        <div className="doc-outline">
            <div className="doc-outline-header">
                <h3>DOCUMENT OUTLINE</h3>
            </div>
            <div className="doc-outline-body">
                {docoutline.map((item, index) => {
                    return (
                        <div className="doc-outline-body-item" key={index}>
                            <a href={item.url} target="_blank" onClick={handleOutlineClick} rel="noreferrer">{item}</a>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default DocOutline;