import NameSpace from "../name-space.js";

export const getUser = (state) => {
  return state[NameSpace.USER].user;
};

export const getOrders = (state) => {
  return state[NameSpace.USER].orders;
};

export const getRegistrationInProgressFlag = (state) => {
  return state[NameSpace.USER].registrationInProgress;
};

export const getLoggingInProgressFlag = (state) => {
  return state[NameSpace.USER].loggingInProgress;
};
