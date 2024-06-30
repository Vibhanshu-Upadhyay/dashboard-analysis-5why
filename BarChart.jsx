// src/components/IncidentBarChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import initialData from "../../Database";

const BarChart = () => {
  // Count incidents by app names
  const appCounts = {};
  initialData.forEach((incident) => {
    if (!appCounts[incident.appName]) {
      appCounts[incident.appName] = 0;
    }
    appCounts[incident.appName]++;
  });

  const data = {
    labels: Object.keys(appCounts),
    datasets: [
      {
        label: "Number of Incidents",
        data: Object.values(appCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Incidents",
        },
      },
    },
  };

  return (
    <div className="chart-container mt-4 border-2 w-1/3 h-[40vh] p-2 rounded-lg bg-white shadow-lg">
      <h2>Number of Incidents by App Names</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
