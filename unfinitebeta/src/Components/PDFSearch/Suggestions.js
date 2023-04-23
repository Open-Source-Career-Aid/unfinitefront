import React, { useEffect } from "react";
import { useState } from "react";
import gscholarresults from "../../Functions/PDFSearch/gscholarresults";
import arxivresults from "../../Functions/PDFSearch/arxivresults";
import unfiniteresults from "../../Functions/PDFSearch/unfiniteresults";
import { useNavigate } from "react-router-dom";

const SuggestedBox = ({ suggested , setUrl , setAnswer , setQnA, setDataloaded , setDocid , setThreadid , isRow }) => {

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
            {isRow ?  
            <div className="suggested-box-body-row">
            {suggested.map((s) => (
            <div className="suggested-box-item" key={s}>
                <p>{s[0]}</p>
                <a href={s[1]} className="loadsearchresult" onClick={handleResultClick}>Load</a>
            </div>
            ))}
        </div> : <div className="suggested-box-body">
            {suggested.map((s) => (
            <div className="suggested-box-item" key={s}>
                <p>{s[0]}</p>
                <a href={s[1]} className="loadsearchresult" onClick={handleResultClick}>Load</a>
            </div>
            ))}
        </div>}
        
        </div>
    );
    }

function Suggestions({ setUrl , setAnswer , setQnA, setDataloaded , setDocid , setThreadid , isRow }) {

    const [suggested, setSuggested] = useState([]);
    const [engine, setEngine] = useState("gscholar");
    const [query, setQuery] = useState(null);

    useEffect(() => {
        console.log('query', query);
        if (query === null) {
            return;
        }
        async function getResults() {
            if (engine === "gscholar") {
                const results = await gscholarresults(query);
                console.log('results', results);
                setSuggested(results);
            }
            else if (engine === "arxiv") {
                const results = await arxivresults(query);
                console.log('results', results);
                setSuggested(results);
            }
            else if (engine === "unfinite") {
                const results = await unfiniteresults(query);
                console.log('results', results);
                setSuggested(results);
            }
        }
        if (query) {
            getResults();
        }
    }, [query]);

    const handleSubmit = (e) => {

        setQuery(null);
        e.preventDefault();
        // get query from input type text
        const query = e.target[3].value;
        setQuery(query);
        console.log('query::', query);
        
    };

    useEffect(() => {
        console.log('engine', engine);
    }, [engine]);

    const handleEngineradio = (e) => {
        setEngine(e.target.value);
        setQuery(null);
    }

    return (
        <div className="suggested">
            <h3>Search articles</h3>
            <form className="suggested-input" onSubmit={handleSubmit}>
                <div className="radio-group">
                    <div className="radio-item">
                        { engine==='gscholar' ? <label htmlFor="gscholar" className="labelselected">Google Scholar</label> : 
                        <label htmlFor="gscholar">Google Scholar</label>}
                        <input type="radio" id="gscholar" name="engine" value="gscholar" onClick={handleEngineradio} defaultChecked />
                    </div>
                    <div className="radio-item">
                    { engine==='arxiv' ? <label htmlFor="arxiv" className="labelselected">ArXiv</label> : 
                        <label htmlFor="arxiv">ArXiv</label>}
                        <input type="radio" id="arxiv" name="engine" value="arxiv" onClick={handleEngineradio} />
                    </div>
                    <div className="radio-item">
                    { engine==='unfinite' ? <label htmlFor="unfinite" className="labelselected">Unfinite (Semantic Search)</label> : 
                        <label htmlFor="unfinite">Unfinite (Semantic Search)</label>}
                        <input type="radio" id="unfinite" name="engine" value="unfinite" onClick={handleEngineradio} />
                    </div>
                </div>
                <div className="input-group">
                    <input className='scholarinput' type="text" placeholder="Search" />
                    <button className="scholarbutton" type="submit">Search</button>
                    {/* <p>*semantic search is limited</p> */}
                </div>
            </form>
            <SuggestedBox
            suggested={suggested}
            setUrl={setUrl}
            setAnswer={setAnswer}
            setQnA={setQnA}
            setDataloaded={setDataloaded}
            setDocid={setDocid}
            setThreadid={setThreadid}
            isRow={isRow}
            />
        </div>
    );
}

export default Suggestions;