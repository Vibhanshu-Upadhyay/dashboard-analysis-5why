// src/pages/Reports.jsx

import React, { useState, useEffect } from "react";
import initialData from "../Database";
import DatePickers from "../Components/DatePickers";
import Filters from "../Components/Filters";
import Chart from "../Components/Chart";
import Modal from "../Components/DrilldownModal";
import "../styles.css"; // Import the CSS file

const Reports = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    severity: "",
    appName: "",
    channelName: "",
  });
  const [selectedSector, setSelectedSector] = useState(null);
  const [groupBy, setGroupBy] = useState("appName"); // Default value
  const [showVisualization, setShowVisualization] = useState(false); // New state
  const [error, setError] = useState(null); // New state for errors
  const [chartType, setChartType] = useState("pie"); // New state for chart type

  const [modalData, setModalData] = useState(null); // New state for modal data

  const filterData = () => {
    if (!startDate || !endDate) {
      setError("Start date and end date are required.");
      return;
    }

    let filtered = initialData.filter((incident) => {
      const issueDate = new Date(incident.issueDate);
      return (
        (!startDate || issueDate >= startDate) &&
        (!endDate || issueDate <= endDate) &&
        (!filterOptions.severity ||
          incident.severity === filterOptions.severity) &&
        (!filterOptions.appName ||
          incident.appName === filterOptions.appName) &&
        (!filterOptions.channelName ||
          incident.channelName === filterOptions.channelName)
      );
    });

    if (filtered.length === 0) {
      setError("No incidents found between the selected dates.");
    } else {
      setError(null);
    }

    setFilteredData(filtered);
  };

  //newly added
  const handleFilterSearch = () => {
    filterData();
  };

  //newly added
  const handleVisualizationSearch = () => {
    filterData();
    setShowVisualization(true);
  };

  //   const handleSearch = () => {
  //     setShowVisualization(true);
  //     filterData();
  //   };

  const getChartData = () => {
    const groupValues = filteredData.map((incident) => incident[groupBy]);
    const uniqueGroupValues = [...new Set(groupValues)];

    const groupCounts = uniqueGroupValues.map(
      (value) => groupValues.filter((item) => item === value).length
    );

    return {
      labels: uniqueGroupValues,
      datasets: [
        {
          label: "# of Incidents",
          data: groupCounts,
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
            "rgba(102, 204, 102, 0.8)",
            "rgba(255, 102, 178, 0.8)",
            "rgba(51, 153, 255, 0.8)",
            "rgba(255, 153, 51, 0.8)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(102, 204, 102, 1)",
            "rgba(255, 102, 178, 1)",
            "rgba(51, 153, 255, 1)",
            "rgba(255, 153, 51, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const getUniqueValues = (key) => {
    return [...new Set(initialData.map((incident) => incident[key]))];
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,

    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataIndex = tooltipItem.dataIndex;
            const dataset = tooltipItem.dataset;
            const value = dataset.data[dataIndex];
            const label = dataset.label;
            const percentage = (
              (value / dataset.data.reduce((a, b) => a + b)) *
              100
            ).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        const sectorValue = getChartData().labels[elementIndex];
        const incidentsInSector = filteredData.filter(
          (incident) => incident[groupBy] === sectorValue
        );
        setSelectedSector(sectorValue);
        setFilteredData(incidentsInSector);
        setModalData({
          title: `Incidents in ${sectorValue}`,
          data: incidentsInSector,
        });
      } else {
        setSelectedSector(null);
        filterData();
      }
    },
  };
  if (chartType === "radar" || chartType === "polarArea") {
    options.scales = {
      r: {
        beginAtZero: true,
      },
    };
  } else if (chartType === "bar" || chartType === "line") {
    options.scales = {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    };
  }

  const resetFilters = () => {
    setFilterOptions({
      severity: "",
      appName: "",
      channelName: "",
    });
    setGroupBy("appName");
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Reports</h2>
      <DatePickers
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        showStartDatePicker={showStartDatePicker}
        showEndDatePicker={showEndDatePicker}
        setShowStartDatePicker={setShowStartDatePicker}
        setShowEndDatePicker={setShowEndDatePicker}
        // handleSearch={handleSearch} // Pass handleSearch to DatePickers
        handleSearch={handleVisualizationSearch} //newly added
      />
      {error && <div className="text-red-500 text-center">{error}</div>}

      {showVisualization && (
        <div className="flex">
          <div>
            {/* Different type of visualization */}
            <div className="flex justify-center mt-4">
              <select
                className="bg-white text-gray-700 py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
              >
                <option value="pie">Pie Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="doughnut">Doughnut Chart</option>
                <option value="radar">Radar Chart</option>
                <option value="polarArea">Polar Area Chart</option>
              </select>
            </div>
            {groupBy && (
              <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  {selectedSector
                    ? `Incidents in ${selectedSector}`
                    : `Incidents by ${
                        groupBy.charAt(0).toUpperCase() + groupBy.slice(1)
                      }`}
                </h3>
                <div className="chart-container">
                  <Chart
                    chartData={getChartData()}
                    options={options}
                    chartType={chartType}
                  />
                </div>
              </div>
            )}
          </div>
          <Filters
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            resetFilters={resetFilters}
            getUniqueValues={getUniqueValues}
            groupBy={groupBy}
            setGroupBy={setGroupBy}
          />
          {/* filter search button */}
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={handleFilterSearch}
            >
              Show Visualization
            </button>
          </div>
        </div>
      )}
      {modalData && (
        <Modal
          title={modalData.title}
          data={modalData.data}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Reports;
