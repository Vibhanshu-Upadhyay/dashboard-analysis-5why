// src/Components/Filters.jsx

import React from "react";

const Filters = ({
  filterOptions,
  setFilterOptions,
  resetFilters,
  getUniqueValues,
  groupBy,
  setGroupBy,
}) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <div className="relative">
        <select
          className="bg-white text-gray-700 py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
          value={filterOptions.severity}
          onChange={(e) =>
            setFilterOptions({ ...filterOptions, severity: e.target.value })
          }
        >
          <option value="">Filter by Severity</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="relative">
        <select
          className="bg-white text-gray-700 py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
          value={filterOptions.appName}
          onChange={(e) =>
            setFilterOptions({ ...filterOptions, appName: e.target.value })
          }
        >
          <option value="">Filter by App Name</option>
          {getUniqueValues("appName").map((appName, index) => (
            <option key={index} value={appName}>
              {appName}
            </option>
          ))}
        </select>
      </div>
      <div className="relative">
        <select
          className="bg-white text-gray-700 py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
          value={filterOptions.channelName}
          onChange={(e) =>
            setFilterOptions({ ...filterOptions, channelName: e.target.value })
          }
        >
          <option value="">Filter by Channel Name</option>
          {getUniqueValues("channelName").map((channelName, index) => (
            <option key={index} value={channelName}>
              {channelName}
            </option>
          ))}
        </select>
      </div>
      <div className="relative">
        <select
          className="bg-white text-gray-700 py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
        >
          <option value="appName">Group by App Name</option>
          <option value="severity">Group by Severity</option>
          <option value="channelName">Group by Channel Name</option>
        </select>
      </div>
      <button
        className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none"
        onClick={resetFilters}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
