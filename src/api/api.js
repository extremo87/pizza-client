import axios from 'axios';


const ServerResponseCode = {
  UNAUTHORIZED: 401,
  VALIDATION: 422,
  INVALID_CREDEMTIALS: 400,
};

export const createAPI = (onError) => {
  const api = axios.create({
    baseURL: process.env.API_URL,
    timeout: 5000
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (error) => {
    if (error.response) {
      const errors = [];
      switch (error.response.status) {
        case ServerResponseCode.VALIDATION:
          Object.keys(error.response.data.errors).map((key) => {
            errors.push(error.response.data.errors[key]);
          });

          onError(errors.join(`,`));
          break;

        case ServerResponseCode.INVALID_CREDEMTIALS:
        case ServerResponseCode.UNAUTHORIZED:
          onError(error.response.data.message);
          break;

        default:
          onError(error.message);
      }
    } else {
      onError(error.message);
    }
  };

  api.interceptors.response.use(onSuccess, onFail);

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem(`token`);
    if (token) {
      config.headers[`Authorization`] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
  );

  return api;
};
