import axios from 'axios';

const serviceNowApi = axios.create({
  baseURL: 'https://<instance>.service-now.com/api/now/table',
  auth: {
    username: 'your-username',
    password: 'your-password'
  }
});

export const fetchIncidents = async () => {
  const response = await serviceNowApi.get('/incident');
  return response.data.result;
};
