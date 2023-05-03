import React , { useState , useEffect } from "react";
import getOutline from "../../Functions/PDFSearch/getOutline";

function Outline({ docid , setNextquestion }) {

    const [outline, setOutline] = useState(null);

    useEffect(() => {
        async function getOutlineData() {
            const outlineData = await getOutline(docid);
            setOutline(outlineData);
        }
        getOutlineData();
    }, [docid]);

    const handleOutlineclick = (e) => {
        // const question = e.target.innerText;
        const key = e.currentTarget.getAttribute("value");
        const question = outline[key][1];
        setNextquestion(question);
    };

    return (
        <div className="outline">
            <h3>Outline</h3>
            { outline===null ? <p>Loading...</p> : <div className="outline-container">
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