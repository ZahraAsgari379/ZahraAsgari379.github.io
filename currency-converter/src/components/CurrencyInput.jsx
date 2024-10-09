import React from "react";

const CurrencyInput = ({ amount, setAmount }) => {
  return (
    <div className="currency-input">
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="مقدار را وارد کنید"
      />
    </div>
  );
};

export default CurrencyInput;
