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
  const keys = Object.keys(cart);
  if (cart.lenght) {
    return 0;
  }
  return keys.map((key) => {
    cart[key].price = Math.ceil(cart[key].price * rate);
    return cart[key];
  });
};
