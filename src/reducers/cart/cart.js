import {getTotalCart, recalculateCart} from '../../utils/utils';
import history from '../../history'

export const ActionType = {
  ADD_TO_CART: `ADD_TO_CART`,
  REMOVE_FROM_CART: `REMOVE_FROM_CART`,
  INCREMENT_PRODUCT: `INCREMENT_PRODUCT`,
  DECREMENT_PRODUCT: `DECREMENT_PRODUCT`,
  REPLACE_CART: `REPLACE_CART`,
  CLEAR_CART: `CLEAR_CART`,
  SET_ORDERS: `SET_ORDERS`,

};

const initialState = {
  cart: {},
  total: 0,
  orders: []
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

  setOrders: (order) => {
    return {
      type: ActionType.SET_ORDERS,
      payload: order
    };
  },

  clearCart: () => {
    return {
      type: ActionType.CLEAR_CART,
      payload: {}
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


    case ActionType.SET_ORDERS:
      const orders = [...state.orders];

      const order = action.payload.data;

      orders.push(order);

      return {...state, orders};

    case ActionType.CLEAR_CART:
      return {...state, cart: {}};
      

    default:
      return state;
  }
};

const Operation = {

  makeOrder: (data) => (dispatch, getState, api) => {
    return api.post(`/orders`, data)
      .then((res) => {
        dispatch(ActionCreator.setOrders(res.data));
        dispatch(ActionCreator.clearCart());
        history.push(`success/${res.data.data.id}`);
      }).catch((error) => {
       console.log(error);
      });
  },

};



export {reducer, ActionCreator, Operation};
