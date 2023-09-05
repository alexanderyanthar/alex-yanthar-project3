import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Chart from './components/Chart';
import Footer from './components/Footer';
import MainContent from './components/MainContent';

function App() {
  const [selectedCurrencyPair, setSelectedCurrencyPair] = useState('EUR/USD');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = 'GEDZHAFMQCTPRQZN';

  const currencyPairs = ['EUR/USD', 'USD/CAD', 'USD/JPY', 'AUD/USD', 'GBP/USD', 'NZD/USD', 'USD/CHF'];

  const fetchData = async (currencyPair) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${currencyPair.substring(0, 3)}&to_symbol=${currencyPair.substring(4)}&outputsize=full&apikey=${apiKey}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();

      if (data['Time Series FX (Daily)'] === undefined) {
        throw new Error('API data limit reached. Wait 1 Minute and reload.');
      }

      const chartData = Object.entries(data['Time Series FX (Daily)']).map(([date, values]) => {
        const open = parseFloat(values['1. open']);
        const high = parseFloat(values['2. high']);
        const low = parseFloat(values['3. low']);
        const close = parseFloat(values['4. close']);

        return {
          date,
          open,
          high,
          low,
          close,
        };
      });

      setChartData(chartData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedCurrencyPair);
  }, [selectedCurrencyPair]);

  return (
    <div className="App">
      <Header />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {chartData === null && !loading && !error && <div>API data limit reached. Wait 1 minute before reloading.</div>}
      {chartData && !loading && !error && (
        <MainContent
          chartData={chartData}
          selectedCurrencyPair={selectedCurrencyPair}
          currencyPairs={currencyPairs}
          setSelectedCurrencyPair={setSelectedCurrencyPair}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
