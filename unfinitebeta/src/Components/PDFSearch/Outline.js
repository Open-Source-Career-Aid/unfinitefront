import React , { useState , useEffect } from "react";
import getOutline from "../../Functions/PDFSearch/getOutline";

function Outline({ docid , setNextquestion , answerisgenerating , setAnswerisgenerating }) {

    const [outline, setOutline] = useState(null);
    const [loadingtext, setLoadingtext] = useState(null);

    useEffect(() => {
        if (outline===null && answerisgenerating===false) {
            setLoadingtext("Loading outline...");
            async function getOutlineData() {
                const outlineData = await getOutline(docid);
                setOutline(outlineData);
            }
            getOutlineData();
        }
    }, [docid, answerisgenerating]);

    const handleOutlineclick = (e) => {
        // const question = e.target.innerText;
        const key = e.currentTarget.getAttribute("value");
        const question = outline[key][1];
        setNextquestion(question);
    };

    return (
        <div className="outline">
            <h3>Outline</h3>
            { outline===null ? <p>{loadingtext}</p> : <div className="outline-container">
                {outline && outline.map((item, index) => {
                    return (
                        <div className="outline-item">
                            <div className="outline-item-title" onClick={handleOutlineclick} value={index}>{index+1}{'. '}{item[0]}</div>
                        </div>
                    )
                })}
            </div>}
        </div>
    );

}

export default Outline;