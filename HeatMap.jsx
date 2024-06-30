import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import initialData from "../../Database";

Chart.register(MatrixController, MatrixElement);

const HeatMap = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // Define severity levels and channels
    const severities = ["Low", "Medium", "High", "Critical"];
    const channels = [...new Set(initialData.map((d) => d.channelName))];

    // Aggregate data by channelName and severity
    const dataMatrix = channels.map((channel) => {
      const severityData = Array(severities.length).fill(0);
      initialData.forEach((incident) => {
        if (incident.channelName === channel) {
          const severityIndex = severities.indexOf(incident.severity);
          if (severityIndex !== -1) {
            severityData[severityIndex] += 1;
          }
        }
      });
      return { label: channel, data: severityData };
    });

    // Prepare heatmap data
    const heatmapData = dataMatrix.flatMap((channelData, i) =>
      channelData.data.map((count, j) => ({
        x: j + 1, // Severity index
        y: i + 1, // Channel index
        v: count, // Number of incidents
      }))
    );

    console.log("before datamatrix");
    console.log(heatmapData);
    console.log("after datamatrix");

    // Create chart
    const myChart = new Chart(ctx, {
      type: "matrix",
      data: {
        datasets: [
          {
            label: "Basic matrix",
            data: heatmapData,
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.5)",
            // backgroundColor: "rgba(200,200,0,0.3)",
            backgroundColor(context) {
              const value = context.dataset.data[context.dataIndex].v;
              const alpha = Math.min(0.1 + value / 10, 1); //add according to the max value present in a cell
              return `rgba(255, 0, 0, ${alpha})`;
            },
            width: ({ chart }) =>
              (chart.chartArea || {}).width / severities.length - 1,
            height: ({ chart }) =>
              (chart.chartArea || {}).height / channels.length - 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              title: (context) => {
                const severityIndex =
                  context[0].dataset.data[context[0].dataIndex].x;
                return severities[severityIndex - 1];
              },
              label: (context) => {
                const channelIndex = context.dataset.data[context.dataIndex].y;
                const channelName = dataMatrix[channelIndex - 1].label;
                const incidents = context.dataset.data[context.dataIndex].v;
                return `${channelName}: ${incidents} incidents`;
              },
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: true,
            min: 0.5,
            max: severities.length + 0.5,
            offset: false,
            ticks: {
              callback: (value) => severities[value - 1], // Display severity labels
            },
          },
          y: {
            display: true,
            min: 0.5,
            max: channels.length + 0.5,
            offset: false,
            ticks: {
              callback: (value) => channels[value - 1], // Display channels labels
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="chart-container mt-4 border-2 w-1/3 h-[40vh] p-2 rounded-lg bg-white shadow-lg">
      <h2>Incidents Heatmap by Channel Name and Severity</h2>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default HeatMap;
