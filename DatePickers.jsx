// src/Components/DatePickers.jsx

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickers = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  showStartDatePicker,
  showEndDatePicker,
  setShowStartDatePicker,
  setShowEndDatePicker,
  handleSearch, // Receive handleSearch as a prop
}) => {
  return (
    <div className="flex flex-col items-center space-y-4 mb-6">
      <div className="flex space-x-4">
        <div className="relative">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none"
            onClick={() => setShowStartDatePicker(!showStartDatePicker)}
          >
            Select Start Date
          </button>
          {showStartDatePicker && (
            <div className="absolute z-10 mt-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setShowStartDatePicker(false);
                }}
                inline
                className="rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
        <div className="relative">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none"
            onClick={() => setShowEndDatePicker(!showEndDatePicker)}
          >
            Select End Date
          </button>
          {showEndDatePicker && (
            <div className="absolute z-10 mt-2">
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  setShowEndDatePicker(false);
                }}
                inline
                className="rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex space-x-4">
        {startDate && (
          <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-lg">
            Start Date: {startDate.toLocaleDateString()}
          </div>
        )}
        {endDate && (
          <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-lg">
            End Date: {endDate.toLocaleDateString()}
          </div>
        )}
      </div>
      <button
        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none"
        onClick={handleSearch} // Call handleSearch on button click
      >
        Search
      </button>
    </div>
  );
};

export default DatePickers;
