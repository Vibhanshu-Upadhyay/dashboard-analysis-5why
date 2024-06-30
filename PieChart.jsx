// src/components/IncidentPieChart.jsx
import React from "react";
import {
  PieChart as PieC,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import initialData from "../../Database";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

const PieChart = () => {
  // Aggregate data by severity
  const data = [
    {
      name: "Critical",
      value: initialData.filter((incident) => incident.severity === "Critical")
        .length,
    },
    {
      name: "High",
      value: initialData.filter((incident) => incident.severity === "High")
        .length,
    },
    {
      name: "Medium",
      value: initialData.filter((incident) => incident.severity === "Medium")
        .length,
    },
    {
      name: "Low",
      value: initialData.filter((incident) => incident.severity === "Low")
        .length,
    },
  ];

  return (
    <div className="chart-container mt-4 border-2 w-1/3 h-[40vh] p-2 rounded-lg bg-white shadow-lg">
      <h2>Incidents by Severity</h2>
      <ResponsiveContainer width="90%" height={250}>
        <PieC>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={(entry) => entry.name}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#333" }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieC>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
