import React from 'react';
import Roadmap from './Roadmap';
import './ResultsPage.css';

/* function that takes in a list of items and lists them on the left as a clickable list */

function ResultsPage({items}) {
    return (
        <div>
            <Roadmap />
        </div>
    )
}

export default ResultsPage;