import React from 'react';
import AddToCartButton from './add-to-cart-button';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import NameSpace from "../../reducers/name-space.js";
import thunk from 'redux-thunk';
import {createAPI} from "../../api/api";


const api = createAPI(() => {});

const mockStore = configureStore([thunk.withExtraArgument(api)]);

const product = {
  id: 1,
  title: `MARGHERITA`,
  ingredients: `Tomatoes, mozzarella, ricotta, bacon, onion`,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  image: `https://static.nnc.kz/pizza1.jpg`,
  price: 18,
  created_at: `2020-09-21 13:18:35`,
  updated_at: `2020-09-21 13:18:35`
};


const store = mockStore({
  [NameSpace.CART]: {
    cart: {},
  }
});


it(`Add to cart button conponent renders correctly`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <AddToCartButton
            addToCart={() => {}}
            increment={() => {}}
            decrement={() => {}}
            product={product}
            cart={{}}
          />
        </Provider>

    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
