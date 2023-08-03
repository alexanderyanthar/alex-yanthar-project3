import React from 'react'
import Chart from './Chart';


const MainContent = ({ chartData }) => {
  return (
    <main className="App-main">
        <div id="chart-container">
            <Chart chartData={chartData} />
        </div>
    </main>
  )
}

export default MainContent