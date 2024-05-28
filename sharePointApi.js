import axios from 'axios';

const sharePointApi = axios.create({
  baseURL: 'https://<site>/_api/web/lists/getbytitle(\'Incidents\')/items',
  headers: {
    'Accept': 'application/json;odata=verbose',
    'Authorization': 'Bearer ' + 'your-access-token'
  }
});

export const fetchIncidents = async () => {
  const response = await sharePointApi.get();
  return response.data.d.results;
};
