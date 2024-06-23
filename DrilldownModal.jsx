import React from "react";

const Modal = ({ title, data, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          onClick={closeModal}
        >
          &times;
        </button>
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <ul>
          {data.map((incident, index) => (
            <li key={index} className="mb-2">
              <strong>Date:</strong> {incident.issueDate}
              <br />
              <strong>Severity:</strong> {incident.severity}
              <br />
              <strong>App Name:</strong> {incident.appName}
              <br />
              <strong>Channel Name:</strong> {incident.channelName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
