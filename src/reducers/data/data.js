import {recalculateProducts, convertCurrency} from '../../utils/utils';
import {ActionCreator as CartAcrionCreator} from '../cart/cart';
import {DELIVERY_FEE} from '../../config/config';


export const ActionType = {
  SET_PRODUCTS: `SET_PRODUCTS`,
  SET_CURRENCIES: `SET_CURRENCIES`,
  SET_CURRENCY: `SET_CURRENCY`,
  SET_DELIVERY_FEE: `SET_DELIVERY_FEE`
};

const initialState = {
  products: [],
  currencies: {},
  currentProduct: null,
  currency: `USD`,
  deliveryFee: DELIVERY_FEE
};

const ActionCreator = {
  setProducts: (products) => {
    return {
      type: ActionType.SET_PRODUCTS,
      payload: products
    };
  },

  setCurrencies: (currencies) => {
    return {
      type: ActionType.SET_CURRENCIES,
      payload: currencies
    };
  },

  setCurrency: (currency) => {
    return {
      type: ActionType.SET_CURRENCY,
      payload: currency
    };
  },
  setDeliveryFee: (value) => {
    return {
      type: ActionType.SET_DELIVERY_FEE,
      payload: value
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_PRODUCTS:
      return {...state, products: action.payload};
    
    case ActionType.SET_CURRENCIES:
        return {...state, currencies: action.payload};

    case ActionType.SET_DELIVERY_FEE:
        const newDeliveryFee = convertCurrency(state.deliveryFee, action.payload);
        return {...state, deliveryFee: newDeliveryFee};

    case ActionType.SET_CURRENCY:

      const products = {...state.products};
      const currencies = {...state.currencies};
      const newCurrency = currencies[action.payload];
      const rate = newCurrency.rates[state.currency].rate;
      const updatedProducts = recalculateProducts(products, rate);

      return {...state, currency: action.payload, products: updatedProducts};

    default:
      return state;
  }
};

const Operation = {

  loadProducts: () => (dispatch, getState, api) => {
    return api.get(`/products`)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.setProducts(response.data));
        }
      });
  },

  loadCurrencies: () => (dispatch, getState, api) => {
    return api.get(`/currencies`)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.setCurrencies(response.data));
        }
      });
  }
};


export {reducer, Operation, ActionCreator};
