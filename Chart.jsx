import React from "react";
import {
  Pie,
  Bar,
  Line,
  Doughnut,
  Scatter,
  Radar,
  PolarArea,
  Bubble,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title,
  registerables,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title,
  ...registerables
);

const ChartComponent = ({ chartData, options, chartType }) => {
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <Bar data={chartData} options={options} />;
      case "line":
        return <Line data={chartData} options={options} />;
      case "doughnut":
        return <Doughnut data={chartData} options={options} />;
      case "pie":
        return <Pie data={chartData} options={options} />;
      case "radar":
        return <Radar data={chartData} options={options} />;
      case "polarArea":
        return <PolarArea data={chartData} options={options} />;
      default:
        return <Pie data={chartData} options={options} />;
    }
  };

  return (
    <div
      className="chart-container"
      style={{ height: "500px", width: "800px" }}
    >
      {renderChart()}
    </div>
  );
};

export default ChartComponent;
