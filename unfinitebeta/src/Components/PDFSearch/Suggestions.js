import React from "react";
import { useState } from "react";
import gscholarresults from "../../Functions/PDFSearch/gscholarresults";
import { useNavigate } from "react-router-dom";

const SuggestedBox = ({ suggested , setUrl , setAnswer , setQnA, setDataloaded , setDocid , setThreadid }) => {

    const navigate = useNavigate();

    const handleResultClick = (e) => {
        e.preventDefault();
        console.log('clicked');
        const url = e.target.href;
        setAnswer("");
        setQnA(new Map());
        setDataloaded(false);
        setDocid(null);
        setThreadid(null);
        setUrl(url);
        // navigate(`/?url=${url}`);
    }

    return (
        <div className="suggested-box">
        <div className="suggested-box-body">
            {suggested.map((s) => (
            <div className="suggested-box-item" key={s}>
                <p>{s[0]}</p>
                <a href={s[1]} className="loadsearchresult" onClick={handleResultClick}>Load</a>
            </div>
            ))}
        </div>
        </div>
    );
    }

function Suggestions({ setUrl , setAnswer , setQnA, setDataloaded , setDocid , setThreadid}) {

    const [suggested, setSuggested] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = e.target[0].value;
        async function getResults() {
            const results = await gscholarresults(query);
            console.log('results', results);
            setSuggested(results);
            console.log('suggested', suggested);
        }
        getResults();
        // make the input box empty
        e.target[0].value = "";
    };

    return (
        <div className="suggested">
            <h3>Search google scholar</h3>
            <form className="suggested-input" onSubmit={handleSubmit}>
                <input className='scholarinput' type="text" placeholder="Search" />
                <button className="scholarbutton" type="submit">Search</button>
            </form>
            <SuggestedBox
            suggested={suggested}
            setUrl={setUrl}
            setAnswer={setAnswer}
            setQnA={setQnA}
            setDataloaded={setDataloaded}
            setDocid={setDocid}
            setThreadid={setThreadid}
            />
        </div>
    );
}

export default Suggestions;