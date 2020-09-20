import {getTotalCart, recalculateCart} from '../../utils/utils';

export const ActionType = {
  ADD_TO_CART: `ADD_TO_CART`,
  REMOVE_FROM_CART: `REMOVE_FROM_CART`,
  INCREMENT_PRODUCT: `INCREMENT_PRODUCT`,
  DECREMENT_PRODUCT: `DECREMENT_PRODUCT`,
  REPLACE_CART: `REPLACE_CART`,

};

const initialState = {
  cart: {},
  total: 0
};

const ActionCreator = {
  addToCart: (product) => {
    return {
      type: ActionType.ADD_TO_CART,
      payload: product
    };
  },

  incrementProduct: (product) => {
    return {
      type: ActionType.INCREMENT_PRODUCT,
      payload: product
    };
  },

  decrementProduct: (product) => {
    return {
      type: ActionType.DECREMENT_PRODUCT,
      payload: product
    };
  },

  replaceCart: (rate) => {
    return {
      type: ActionType.REPLACE_CART,
      payload: rate
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.ADD_TO_CART:

      const { id, image, title, price } = action.payload;
      const cart = {...state.cart};
      cart[id] = cart[id] || action.payload;
      cart[id].qty = 1;
      const total = getTotalCart(cart);

      return Object.assign({}, state, {
         cart,
         total
      });

    case ActionType.INCREMENT_PRODUCT:
      const cartToIncrement = {...state.cart};
      cartToIncrement[action.payload.id].qty = cartToIncrement[action.payload.id].qty + 1;

      return Object.assign({}, state, {
          cart: cartToIncrement,
          total: getTotalCart(cartToIncrement)
      });

    case ActionType.DECREMENT_PRODUCT:
      const cartToDecrement = {...state.cart};
      cartToDecrement[action.payload.id].qty = cartToDecrement[action.payload.id].qty - 1;

      if (cartToDecrement[action.payload.id].qty <= 0) { 
        delete cartToDecrement[action.payload.id]; 
      }

      return Object.assign({}, state, {
          cart: cartToDecrement,
          total: getTotalCart(cartToDecrement)
        });

    case ActionType.REPLACE_CART:

      const cartToUpdate = {...state.cart};
      const updatedCart = recalculateCart(cartToUpdate, action.payload)

      return Object.assign({}, state, {
          cart: updatedCart,
          total: getTotalCart(updatedCart)
        });
    default:
      return state;
  }
};



export {reducer, ActionCreator};
