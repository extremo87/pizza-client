import NameSpace from "../name-space.js";

export const getCart = (state) => {
  return state[NameSpace.CART].cart;
};

export const getOrders = (state) => {
  return state[NameSpace.CART].orders;
};


