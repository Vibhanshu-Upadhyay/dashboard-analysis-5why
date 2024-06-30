import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomTimeDropdown from "./CustomTimeDropdown";

const DatePickers = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  showStartDatePicker,
  showEndDatePicker,
  setShowStartDatePicker,
  setShowEndDatePicker,
  handleSearch,
}) => {
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [startHours, setStartHours] = useState(
    startDate ? startDate.getHours() : 0
  );
  const [startMinutes, setStartMinutes] = useState(
    startDate ? startDate.getMinutes() : 0
  );
  const [startSeconds, setStartSeconds] = useState(
    startDate ? startDate.getSeconds() : 0
  );

  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [endHours, setEndHours] = useState(endDate ? endDate.getHours() : 0);
  const [endMinutes, setEndMinutes] = useState(
    endDate ? endDate.getMinutes() : 0
  );
  const [endSeconds, setEndSeconds] = useState(
    endDate ? endDate.getSeconds() : 0
  );

  const timeOptions = Array.from({ length: 60 }, (_, i) => i);

  const handleStartDateTimeSubmit = () => {
    const updatedDate = new Date(tempStartDate);
    updatedDate.setHours(startHours, startMinutes, startSeconds);
    setStartDate(updatedDate);
    setShowStartDatePicker(false);
  };

  const handleEndDateTimeSubmit = () => {
    const updatedDate = new Date(tempEndDate);
    updatedDate.setHours(endHours, endMinutes, endSeconds);
    setEndDate(updatedDate);
    setShowEndDatePicker(false);
  };

  return (
    <div className="flex w-full justify-center space-x-12 rounded-lg">
      <div className="flex space-x-4">
        <div className="relative">
          <button
            className="text-red-500 border-2 border-red-500 px-4 py-2 mt-4 my-auto rounded-lg shadow-md transition-transform transform hover:scale-105 hover:text-white hover:bg-red-500 focus:outline-none"
            onClick={() => setShowStartDatePicker(!showStartDatePicker)}
          >
            Start Date
          </button>
          {showStartDatePicker && (
            <div className="absolute z-10 mt-2 bg-white border-2 p-2">
              <DatePicker
                selected={tempStartDate}
                onChange={(date) => setTempStartDate(date)}
                inline
                className="rounded-lg shadow-lg"
              />
              <div className="flex space-x-2 mt-2">
                <CustomTimeDropdown
                  label="Hours"
                  options={timeOptions.slice(0, 24)}
                  value={startHours}
                  onChange={setStartHours}
                />
                <CustomTimeDropdown
                  label="Minutes"
                  options={timeOptions}
                  value={startMinutes}
                  onChange={setStartMinutes}
                />
                <CustomTimeDropdown
                  label="Seconds"
                  options={timeOptions}
                  value={startSeconds}
                  onChange={setStartSeconds}
                />
              </div>
              <div className="flex">
                <button
                  className=" bg-red-500 text-white px-4 py-2 mt-2 mx-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none"
                  onClick={handleStartDateTimeSubmit}
                >
                  Set
                </button>
              </div>
            </div>
          )}
        </div>
        {startDate && (
          <div className="flex flex-col bg-gray-100 border-2 text-gray-800 px-4 rounded-lg shadow-lg">
            <div className="flex text-lg font-semibold">
              <div className="text-4xl font-bold">
                {startDate.toLocaleDateString("en-GB", {
                  day: "2-digit",
                })}
              </div>
              <div className="pl-1 mt-3">
                {startDate.toLocaleDateString("en-GB", {
                  month: "long",
                })}
              </div>
              <div className="mt-3">
                '
                {startDate.toLocaleDateString("en-GB", {
                  year: "2-digit",
                })}
              </div>
            </div>
            <div className="text-sm flex mx-auto font-lg">
              {startDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </div>
          </div>
        )}
      </div>
      <div className="flex space-x-4">
        <div className="relative">
          <button
            className="text-red-500 border-2 border-red-500 px-4 py-2 mt-4 my-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:text-white hover:bg-red-500 focus:outline-none"
            onClick={() => setShowEndDatePicker(!showEndDatePicker)}
          >
            End Date
          </button>
          {showEndDatePicker && (
            <div className="absolute z-10 mt-2 bg-white border-2 p-2">
              <DatePicker
                selected={tempEndDate}
                onChange={(date) => setTempEndDate(date)}
                inline
                className="rounded-lg shadow-lg"
              />
              <div className="flex space-x-2 mt-2">
                <CustomTimeDropdown
                  label="Hours"
                  options={timeOptions.slice(0, 24)}
                  value={endHours}
                  onChange={setEndHours}
                />
                <CustomTimeDropdown
                  label="Minutes"
                  options={timeOptions}
                  value={endMinutes}
                  onChange={setEndMinutes}
                />
                <CustomTimeDropdown
                  label="Seconds"
                  options={timeOptions}
                  value={endSeconds}
                  onChange={setEndSeconds}
                />
              </div>
              <div className="flex">
                <button
                  className=" bg-red-500 text-white px-4 py-2 mt-2 mx-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none"
                  onClick={handleEndDateTimeSubmit}
                >
                  Set
                </button>
              </div>
            </div>
          )}
        </div>
        {endDate && (
          <div className="flex flex-col bg-gray-100 border-2 text-gray-800 px-4 pb-2 shadow-md rounded-lg ">
            <div className="flex text-lg font-semibold">
              <div className="text-4xl font-bold">
                {endDate.toLocaleDateString("en-GB", {
                  day: "2-digit",
                })}
              </div>
              <div className="pl-1 mt-3">
                {endDate.toLocaleDateString("en-GB", {
                  month: "long",
                })}
              </div>
              <div className="mt-3">
                '
                {endDate.toLocaleDateString("en-GB", {
                  year: "2-digit",
                })}
              </div>
            </div>
            <div className="text-sm flex mx-auto font-lg">
              {endDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </div>
          </div>
        )}
      </div>

      <button
        className="text-red-500 border-2 border-red-500 px-4 py-2 mt-4 my-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:text-white hover:bg-red-500 focus:outline-none"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default DatePickers;
