import { useState, useEffect } from 'react'
import axios from 'axios';


function App() {

  const [historicalData, setHistoricalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {

    const apiKey = 'GEDZHAFMQCTPRQZN';

    const symbol = 'EURUSD';

    if (!apiCalled) {
      axios.get(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=${apiKey}`)
      .then((res) => {
        const timeSeriesData = res.data['Time Series FX (Daily)'];
        const parsedData = Object.entries(timeSeriesData).map(([date, prices]) => ({
          date,
          open: parseFloat(prices['1. open']),
          high: parseFloat(prices['2. high']),
          low: parseFloat(prices['3. low']),
          close: parseFloat(prices['4. close']),
        }));
        console.log(parsedData);
        setHistoricalData(parsedData);
        setIsLoading(false);
        setApiCalled(true);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
        setIsLoading(false);
      });
    }
  }, [apiCalled]);

  return (
    <>
      <h1>EURUSD PRICES</h1>
      {isLoading && <div>Loading...</div>}

      {!isLoading && historicalData && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
            </tr>
          </thead>
          <tbody>
            {historicalData.map((dataPoint) => (
              <tr key={dataPoint.date}>
                <td>{dataPoint.date}</td>
                <td>{dataPoint.open}</td>
                <td>{dataPoint.high}</td>
                <td>{dataPoint.low}</td>
                <td>{dataPoint.close}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default App
