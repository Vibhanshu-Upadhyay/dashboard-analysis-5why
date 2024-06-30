import React from "react";
import { Line } from "react-chartjs-2";
import initialData from "../../Database";

const LineChart = () => {
  // Initialize an object to store incident counts by year and month
  const incidentCounts = {};

  // Loop through initialData to count incidents by year and month
  initialData.forEach((incident) => {
    const issueDate = new Date(incident.issueDate);
    const year = issueDate.getFullYear();
    const month = issueDate.getMonth() + 1; // getMonth() returns 0-indexed month

    // Initialize count for the year if not already present
    if (!incidentCounts[year]) {
      incidentCounts[year] = Array(12).fill(0); // Initialize counts for each month of the year
    }

    // Increment count for the specific month
    incidentCounts[year][month - 1]++;
  });

  // Prepare data for Chart.js
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: Object.keys(incidentCounts).map((year) => ({
      label: year,
      data: incidentCounts[year],
      fill: false,
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
    })),
  };

  // Chart.js options
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
    <div className="mt-4 border-2 w-1/3 p-2 rounded-lg bg-white shadow-lg">
      <h2 className="font-semibold">Incidents per Month </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
