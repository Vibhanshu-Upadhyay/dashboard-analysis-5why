import axios from 'axios';

// Create an axios instance configured for ServiceNow API
const serviceNowApi = axios.create({
  baseURL: 'https://<instance>.service-now.com/api/now/table',
  auth: {
    username: 'your-username', // Replace with your ServiceNow username
    password: 'your-password'  // Replace with your ServiceNow password
  }
});

// Function to fetch incidents from ServiceNow
export const fetchIncidents = async () => {
  try {
    const response = await serviceNowApi.get('/incident', {
      params: {
        sysparm_fields: 'number,severity,application' // Fetch specific fields
      }
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching incidents from ServiceNow:', error);
    throw error;
  }
};
