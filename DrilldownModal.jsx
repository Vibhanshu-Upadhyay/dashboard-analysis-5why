// import React from "react";
// import { Modal } from "react-bootstrap";
// import { Bar } from "react-chartjs-2";

// const DrilldownModal = ({ show, handleClose, incidents, filter }) => {
//   const processDataForChart = () => {
//     if (!incidents) return {};
//     const groupedData = incidents.reduce((acc, incident) => {
//       const key = incident[filter];
//       if (!acc[key]) acc[key] = 0;
//       acc[key]++;
//       return acc;
//     }, {});
//     return {
//       labels: Object.keys(groupedData),
//       datasets: [
//         {
//           label: `Incidents by ${filter}`,
//           data: Object.values(groupedData),
//           backgroundColor: "rgba(153,102,255,0.6)",
//           borderColor: "rgba(153,102,255,1)",
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Drilldown Report</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Bar data={processDataForChart()} />
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default DrilldownModal;
