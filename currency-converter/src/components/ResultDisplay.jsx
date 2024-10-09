import React from "react";

const ResultDisplay = ({ result }) => {
  return (
    <div className="result-input">
      <input
        type="text"
        id="result"
        value={result}
        placeholder="نتیجه"
        readOnly
      />
    </div>
  );
};

export default ResultDisplay;
