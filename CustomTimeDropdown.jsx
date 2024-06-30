import React from "react";

const CustomTimeDropdown = ({ label, options, value, onChange }) => (
  <div className="flex flex-col items-center">
    <label className="text-sm font-semibold mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      style={{ maxHeight: "200px", overflowY: "scroll" }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default CustomTimeDropdown;
