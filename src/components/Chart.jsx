import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const Chart = ({ historicalData }) => {
    const chartContainerRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (!chartInstanceRef.current) {
            const chart = createChart(chartContainerRef.current, {
                width: 800,
                height: 500,
            });
            chartInstanceRef.current = chart;

            const mainPane = chartInstanceRef.current.addPane();

            const mainSeries = mainPane.addCandlestickSeries();

            mainSeries.applyOptions({
                priceFormat: {
                    type: 'price',
                    precision: 2,
                },
            });
        }

        if (historicalData && historicalData.length > 0) {
            const sortedData = historicalData.slice().sort((a, b) => a.time - b.time);

            const candleSeries = chartInstanceRef.current.mainSeries().priceScale().series();
            candleSeries.setData(sortedData);
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.remove();
            }
        };
    }, [historicalData])

  return (
    <div ref={chartContainerRef} style={{ height: '500px' }}></div>
  )
}

export default Chart