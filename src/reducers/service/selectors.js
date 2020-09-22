import NameSpace from "../name-space.js";

export const getErrorMessage = (state) => {
  return state[NameSpace.SERVICE].error;
};

export const getOrderLoadingStatus = (state) => {
  return state[NameSpace.SERVICE].isOrderLoading;
};


