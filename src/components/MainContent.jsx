import React from 'react'
import Chart from './Chart';


const MainContent = ({ chartData, selectedCurrencyPair, currencyPairs, setSelectedCurrencyPair }) => {
  return (
    <main className="App-main">
      <div className='currency-selector'>
        <label htmlFor="currency-select">Select Currency Pair:</label>
        <select id="currency-select" value={selectedCurrencyPair} onChange={(e) => setSelectedCurrencyPair(e.target.value)}>
          {currencyPairs.map((currencyPair) => (
            <option key={currencyPair} value={currencyPair}>
              {currencyPair}
            </option>
          ))}
        </select>
      </div>
      <div id="chart-container">
          <Chart chartData={chartData} />
      </div>
    </main>
  )
}

export default MainContent