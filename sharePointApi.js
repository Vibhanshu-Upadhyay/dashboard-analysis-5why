import axios from 'axios';

// Create an axios instance configured for SharePoint API
const sharePointApi = axios.create({
  baseURL: 'https://<site>/_api/web/lists/getbytitle(\'Incidents\')/items', // Replace <site> with your SharePoint site URL
  headers: {
    'Accept': 'application/json;odata=verbose',
    'Authorization': 'Bearer ' + 'your-access-token' // Replace with your SharePoint access token
  }
});

// Function to fetch incidents from SharePoint
export const fetchIncidents = async () => {
  try {
    const response = await sharePointApi.get();
    return response.data.d.results.map(item => ({
      number: item.IncidentNumber, // Assuming 'IncidentNumber' is the field name in SharePoint
      severity: item.Severity,     // Assuming 'Severity' is the field name in SharePoint
      application: item.Application // Assuming 'Application' is the field name in SharePoint
    }));
  } catch (error) {
    console.error('Error fetching incidents from SharePoint:', error);
    throw error;
  }
};
