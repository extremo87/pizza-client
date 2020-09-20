import NameSpace from "../name-space.js";

export const getErrorMessage = (state) => {
  return state[NameSpace.SERVICE].error;
};

export const getCommentStatus = (state) => {
  return state[NameSpace.SERVICE].isCommentLoading;
};

export const getCommentSent = (state) => {
  return state[NameSpace.SERVICE].isCommentSent;
};


