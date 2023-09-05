import React, { useEffect } from 'react';
import { createChart } from 'lightweight-charts';

const Chart = ({ chartData }) => {
  useEffect(() => {
    if (chartData.length > 0) {
      createChartWithData(chartData);
    }
  }, [chartData]);

  const createChartWithData = (data) => {
    const chartContainer = document.getElementById('chart-container');
    chartContainer.innerHTML = ''; // Clear previous chart

    const chart = createChart(chartContainer, {
      autoSize: true,
      localizationOptions: {
        dateFormat: 'MMMM dd, yyyy',
      },
    });

    const formattedData = data.map(({ date, open, high, low, close }) => {
      const time = new Date(date).getTime();
      return {
        time: time / 1000, // Divide by 1000 to convert milliseconds to seconds
        open,
        high,
        low,
        close,
      };
    });

    formattedData.sort((a, b) => a.time - b.time);

    const candlestickSeries = chart.addCandlestickSeries();

    candlestickSeries.setData(formattedData);

    // Get the time scale API
    const timeScaleApi = chart.timeScale();

    // Customize the time scale
    timeScaleApi.applyOptions({
      timeVisible: true,
      secondsVisible: false,
    });

    timeScaleApi.subscribeVisibleTimeRangeChange(() => {
      // Format the dates on the time scale
      const visibleBars = timeScaleApi.getVisibleLogicalRange();
      const fromDate = formattedData[visibleBars.from]?.date;
      const toDate = formattedData[visibleBars.to]?.date;

      if (fromDate && toDate) {
        const formattedFromDate = new Date(fromDate).toLocaleDateString();
        const formattedToDate = new Date(toDate).toLocaleDateString();
        const formattedRange = `${formattedFromDate} - ${formattedToDate}`;

        timeScaleApi.options().timeVisibleRangeLabel = formattedRange;
      }
    });
  };

  return <div id="chart-container"></div>;
};

export default Chart;
