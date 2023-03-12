import React from 'react';
import './Progress.css';

const Progress = ({ list }) => {
  const percent = (list.filter(x => x === 1).length / list.length) * 100;
  const completeWidth = `${percent}%`;
  const incompleteWidth = `${100 - percent}%`;

  return (
    <div className="progress">
      <div className="progress-percent">{`${percent.toFixed(2)}%`}</div>
      <div className="progress-bar">
        <div className="progress-complete" style={{ width: completeWidth }}></div>
        <div className="progress-incomplete" style={{ width: incompleteWidth }}></div>
      </div>
    </div>
  );
};

export default Progress;
