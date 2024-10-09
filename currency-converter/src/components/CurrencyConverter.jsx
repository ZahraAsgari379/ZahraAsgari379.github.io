import React, { useState } from "react";
import CurrencyInput from "./CurrencyInput";
import CurrencySelect from "./CurrencySelect";
import ResultDisplay from "./ResultDisplay";
import { GoArrowSwitch } from "react-icons/go";
import { CgMathEqual } from "react-icons/cg";

const exchangeRates = {
  USD: { EUR: 0.85, IRR: 62000 },
  EUR: { USD: 1.18, IRR: 69000 },
  IRR: { USD: 0.000024, EUR: 0.00002 },
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("IRR");
  const [result, setResult] = useState("");

  const convertCurrency = () => {
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || isNaN(parsedAmount)) {
      alert("لطفاً مقدار معتبری وارد کنید.");
      return;
    }

    if (fromCurrency === toCurrency) {
      setResult(parsedAmount);
      return;
    }

    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = parsedAmount * rate;

    setResult(convertedAmount);
  };

  return (
    <main>
      <div className="container">
        <h1>تبدیل ارز</h1>

        <div className="currency-select-container">
          <CurrencySelect
            currency={fromCurrency}
            setCurrency={setFromCurrency}
          />

          <button
            className="goArrowSwitch-btn"
            onClick={() => {
              setFromCurrency(toCurrency);
              setToCurrency(fromCurrency);
            }}
          >
            <GoArrowSwitch />
          </button>

          <CurrencySelect currency={toCurrency} setCurrency={setToCurrency} />
        </div>

        <div className="currency-input-container">
          <CurrencyInput amount={amount} setAmount={setAmount} />

          <button className="conversion-btn" onClick={convertCurrency}>
            <CgMathEqual />
          </button>

          <ResultDisplay result={result} />
          
        </div>
      </div>
    </main>
  );
};

export default CurrencyConverter;
