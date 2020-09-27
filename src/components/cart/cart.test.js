import React from 'react';
import Cart from './cart';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import NameSpace from "../../reducers/name-space.js";
import thunk from 'redux-thunk';
import {createAPI} from "../../api/api";
import {BrowserRouter} from 'react-router-dom';


const api = createAPI(() => {});

const mockStore = configureStore([thunk.withExtraArgument(api)]);


const cart = {
  1: {
    id: 1,
    title: `MARGHERITA`,
    ingredients: `Tomatoes, mozzarella, ricotta, bacon, onion`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: `https://static.nnc.kz/pizza1.jpg`,
    price: 18,
    created_at: `2020-09-21 13:18:35`,
    updated_at: `2020-09-21 13:18:35`,
    qty: 2
  },
  2: {
    id: 2,
    title: `QUATTRO FROMAGGI`,
    ingredients: `Gorgonzola, ricotta, mozzarella, taleggio`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: `https://static.nnc.kz/pizza2.jpg`,
    price: 24,
    created_at: `2020-09-21 13:18:35`,
    updated_at: `2020-09-21 13:18:35`,
    qty: 1
  }
};

const store = mockStore({
  [NameSpace.CART]: {
    cart,
  },
  [NameSpace.DATA]: {
    currency: `EUR`,
    deliveryFee: 4,
    currencies: {
      USD: {
        rates: {
          EUR: {
            symbol: `€`,
            rate: 1.18
          }
        },
        symbol: `$`
      },
      EUR: {
        rates: {
          USD: {
            symbol: `$`,
            rate: 0.84
          }
        },
        symbol: `€`
      }
    }
  }
});


it(`Cart conponent renders correctly`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <Cart
              cart={cart}
              deliveryFee={5}
              key={1}
              currency={`USD`}
            />
          </BrowserRouter>
        </Provider>

    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
