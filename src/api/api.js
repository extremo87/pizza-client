import axios from 'axios';

const ServerResponseCode = {
  UNAUTHORIZED: 401,
  VALIDATION: 422
};


export const createAPI = (onError) => {
  const api = axios.create({
    baseURL: `http://pizza-server.test/api`,
    timeout: 5000
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (error) => {
    if (error.response) {
      if (error.response.status === ServerResponseCode.VALIDATION) {
        const errors = [];

        Object.keys(error.response.data.errors).map((key) => {
          errors.push(error.response.data.errors[key]);
        });

        onError(errors.join(`,`));

      } else {
        onError(error.message);
      }
    } else {
      onError(error.message);
    }
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
