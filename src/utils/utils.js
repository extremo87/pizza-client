export const getTotalCart = (cart) => {
  const keys = Object.keys(cart);
  if (cart.lenght) {
    return 0;
  }
  return keys.reduce((price, key) => (price + (cart[key].price * cart[key].qty)), 0);
};

export const getCartItemsCount = (cart) => {
  const keys = Object.keys(cart);
  if (keys.lenght) {
    return 0;
  }
  return keys.reduce((count, key) => (count + cart[key].qty), 0);
};

export const recalculateProducts = (products, rate) => {
  const keys = Object.keys(products);
  return keys.map((key) => {
    products[key].price = Math.round(products[key].price * rate);
    return products[key];
  });
};

export const recalculateCart = (cart, rate) => {
  const cartObject = Object.entries(cart);
  cartObject.forEach((item) => {
    item[1].price = Math.round(item[1].price * rate);
  });

  return Object.fromEntries(cartObject);
};

export const convertCurrency = (value, rate) => {
  return Math.round(value * rate);
};

export const isValidPhone = (value) => {
  const regExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/i;
  return regExp.test(value);
};

export const prepareOrderData = (state, cart, currency, deliveryFee) => {
  state.deliveryFee = deliveryFee;
  state.currency = currency;

  return Object.assign({}, state, {cart});
};


export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(`savedState`);
    if (serializedState === null) {
      return undefined;
    }

    const stateToReturn = JSON.parse(serializedState);
    return stateToReturn;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`savedState`, serializedState);
    return true;
  } catch (err) {
    return undefined;
  }
};

export const emailIsValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const getOrderItemsAsString = (items) => {
  const titles = Object.keys(items).map((key) => items[key].title);
  return titles.join(`, `);
};


