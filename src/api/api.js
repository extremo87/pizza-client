import axios from 'axios';

export const createAPI = () => {
  const api = axios.create({
    baseURL: `http://pizza-server.test/api`,
    timeout: 5000
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (error) => {
    return error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
