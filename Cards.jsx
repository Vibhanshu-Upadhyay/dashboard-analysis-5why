import React, { useState } from "react";
import initialData from "../../Database"; // Ensure the path to your data file is correct

const Cards = () => {
  const [severityFilter, setSeverityFilter] = useState("");
  const [appNameFilter, setAppNameFilter] = useState("");
  const [channelNameFilter, setChannelNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [filteredData, setFilteredData] = useState(initialData);

  const handleSearch = () => {
    const newFilteredData = initialData.filter(
      (issue) =>
        (severityFilter ? issue.severity === severityFilter : true) &&
        (appNameFilter ? issue.appName === appNameFilter : true) &&
        (channelNameFilter ? issue.channelName === channelNameFilter : true) &&
        (categoryFilter ? issue.category === categoryFilter : true)
    );
    setFilteredData(newFilteredData);
  };

  const handleReset = () => {
    setSeverityFilter("");
    setAppNameFilter("");
    setChannelNameFilter("");
    setCategoryFilter("");
    setFilteredData(initialData);
  };

  const totalIncidents = calculateTotalIncidents(filteredData);
  const resolvedIncidents = calculateResolvedIncidents(filteredData);
  const avgResolutionTime = calculateAvgResolutionTime(filteredData);
  const mostCommonRootCause = calculateMostCommonRootCause(filteredData);

  return (
    <div className="mt-4 border-2 w-2/3 p-2 rounded-lg bg-white shadow-lg">
      <div className="font-bold text-xl">Incident summary</div>
      <div className="mb-6">Incident summary</div>
      <div className="flex space-x-8 justify-center h-[20vh]">
        <div className="border-2 w-1/5">
          <div>Total Incidents</div>
          <div>{totalIncidents}</div>
        </div>
        <div className="border-2 w-1/5">
          <div>Resolved Incidents</div>
          <div>{resolvedIncidents}</div>
        </div>
        <div className="border-2 w-1/5">
          <div>Avg Resolution Time (days)</div>
          <div>{avgResolutionTime}</div>
        </div>
        <div className="border-2 w-1/5">
          <div>Most Common Root Cause</div>
          <div>{mostCommonRootCause}</div>
        </div>
        <div className="filters mb-4 flex flex-col">
          <button onClick={handleReset}>Reset</button>
          <select
            onChange={(e) => setSeverityFilter(e.target.value)}
            value={severityFilter}
          >
            <option value="">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            onChange={(e) => setAppNameFilter(e.target.value)}
            value={appNameFilter}
          >
            <option value="">All Apps</option>
            {/* Generate unique app names dynamically */}
            {Array.from(new Set(initialData.map((issue) => issue.appName))).map(
              (appName) => (
                <option key={appName} value={appName}>
                  {appName}
                </option>
              )
            )}
          </select>
          <select
            onChange={(e) => setChannelNameFilter(e.target.value)}
            value={channelNameFilter}
          >
            <option value="">All Channels</option>
            {/* Generate unique channel names dynamically */}
            {Array.from(
              new Set(initialData.map((issue) => issue.channelName))
            ).map((channelName) => (
              <option key={channelName} value={channelName}>
                {channelName}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setCategoryFilter(e.target.value)}
            value={categoryFilter}
          >
            <option value="">All Categories</option>
            {/* Generate unique categories dynamically */}
            {Array.from(
              new Set(initialData.map((issue) => issue.category))
            ).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

// Include the helper functions
const calculateTotalIncidents = (data) => data.length;

const calculateResolvedIncidents = (data) =>
  data.filter((issue) => issue.resolutionDate).length;

const calculateAvgResolutionTime = (data) => {
  const resolvedIncidents = data.filter((issue) => issue.resolutionDate);
  const totalResolutionTime = resolvedIncidents.reduce((total, issue) => {
    const issueDate = new Date(issue.issueDate);
    const resolutionDate = new Date(issue.resolutionDate);
    const resolutionTime = (resolutionDate - issueDate) / (1000 * 60 * 60 * 24); // in days
    return total + resolutionTime;
  }, 0);
  return resolvedIncidents.length
    ? (totalResolutionTime / resolvedIncidents.length).toFixed(2)
    : 0;
};

const calculateMostCommonRootCause = (data) => {
  const rootCauseCount = data.reduce((acc, issue) => {
    acc[issue.lessonLearned] = (acc[issue.lessonLearned] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(rootCauseCount).reduce(
    (a, b) => (rootCauseCount[a] > rootCauseCount[b] ? a : b),
    ""
  );
};

export default Cards;
