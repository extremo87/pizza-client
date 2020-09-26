import NameSpace from "../name-space.js";

export const getUser = (state) => {
  return state[NameSpace.USER].user;
};

export const getUserOrders = (state) => {
  return state[NameSpace.USER].userOrders;
};

export const getRegistrationInProgressFlag = (state) => {
  return state[NameSpace.USER].registrationInProgress;
};

export const getLoggingInProgressFlag = (state) => {
  return state[NameSpace.USER].loggingInProgress;
};

export const getOrdersLoadingInProgressFlag = (state) => {
  return state[NameSpace.USER].ordersLoadingInProgress;
};

