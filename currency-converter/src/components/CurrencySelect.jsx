import React from "react";

const CurrencySelect = ({ currency, setCurrency }) => {
  return (
    <div className="currency-select">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="USD">دلار آمریکا</option>
        <option value="EUR">یورو</option>
        <option value="IRR">ریال ایران</option>
      </select>
    </div>
  );
};

export default CurrencySelect;
