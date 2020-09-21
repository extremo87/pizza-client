import NameSpace from "../name-space.js";

export const getErrorMessage = (state) => {
  return state[NameSpace.SERVICE].error;
};


