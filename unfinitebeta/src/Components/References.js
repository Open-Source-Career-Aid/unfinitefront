import React from "react";
import { useState, useEffect } from "react";
import "../css/ReferencePod.css";
import ReferencePod from "./ReferencePod";

const References = ({ references, source }) => {
  console.log("References: ", references);
  return (
    <>
      <div className="reference-container">
        <h1 className="header">References</h1>
        <div className="references">
          {references.map((reference, index) => (
            <ReferencePod
              key={index}
              link={reference}
              source={source}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default References;
