import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Chart from './components/Chart';
import Footer from './components/Footer';
import MainContent from './components/MainContent';

function App() {
  const [chartData, setChartData] = useState([]);
  const apiKey = 'GEDZHAFMQCTPRQZN';

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=${apiKey}`
      );
      const data = await response.json();

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
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <MainContent chartData={chartData}/>
      <Footer />
    </div>
  );
}

export default App;
