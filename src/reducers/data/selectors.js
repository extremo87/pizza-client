import NameSpace from "../name-space.js";

export const getProducts = (state) => {
  return state[NameSpace.DATA].products;
};

export const getCurrency = (state) => {
  return state[NameSpace.DATA].currency;
};

export const getCurrencies = (state) => {
  return state[NameSpace.DATA].currencies;
};

export const getFullCurrency = (state) => {
  return state[NameSpace.DATA].currencies[state[NameSpace.DATA].currency];
};

export const getDeliveryFee = (state) => {
  return state[NameSpace.DATA].deliveryFee;
};


