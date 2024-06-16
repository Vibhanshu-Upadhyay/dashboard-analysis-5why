// src/Components/Chart.jsx

import React from "react";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// const Chart = ({ chartData, options }) => {
//   return <Pie data={chartData} options={options} />;
// };

const Chart = ({ chartData, options, chartType }) => {
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <Bar data={chartData} options={options} />;
      case "line":
        return <Line data={chartData} options={options} />;
      case "doughnut":
        return <Doughnut data={chartData} options={options} />;
      case "pie":
      default:
        return <Pie data={chartData} options={options} />;
    }
  };

  return <div>{renderChart()}</div>;
};

export default Chart;
