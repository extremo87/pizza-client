import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import NameSpace from "../../reducers/name-space.js";
import thunk from 'redux-thunk';
import {createAPI} from "../../api/api";


const api = createAPI(() => {});

const mockStore = configureStore([thunk.withExtraArgument(api)]);


const store = mockStore({

  [NameSpace.CART]: {
    cart: {}
  },

  [NameSpace.USER]: {
    user: {}
  },

  [NameSpace.DATA]: {
    currency: `EUR`,
    deliveryFee: 4,
    products: [
      {
        id: 1,
        title: `MARGHERITA`,
        ingredients: `Tomatoes, mozzarella, ricotta, bacon, onion`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        image: `https://static.nnc.kz/pizza1.jpg`,
        price: 18,
        created_at: `2020-09-21 13:18:35`,
        updated_at: `2020-09-21 13:18:35`
      },
      {
        id: 2,
        title: `QUATTRO FROMAGGI`,
        ingredients: `Gorgonzola, ricotta, mozzarella, taleggio`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        image: `https://static.nnc.kz/pizza2.jpg`,
        price: 24,
        created_at: `2020-09-21 13:18:35`,
        updated_at: `2020-09-21 13:18:35`
      },
      {
        id: 3,
        title: `SALMONE E PESTO DI NOCI`,
        ingredients: `Salmon, walnut pesto, onion, garlic sauce`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        image: `https://static.nnc.kz/pizza3.jpg`,
        price: 26,
        created_at: `2020-09-21 13:18:35`,
        updated_at: `2020-09-21 13:18:35`
      },
      {
        id: 4,
        title: `POMODORI PANCETTA`,
        ingredients: `Tomatoes, bacon, onion, garlic sauce`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        image: `https://static.nnc.kz/pizza4.jpg`,
        price: 22,
        created_at: `2020-09-21 13:18:35`,
        updated_at: `2020-09-21 13:18:35`
      },
      {
        id: 5,
        title: `CHEESY GARLIC PIZZA`,
        ingredients: `Mozzarella, & garlic sauce on a crème fraiche base, ect`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        image: `https://static.nnc.kz/pizza1.jpg`,
        price: 28,
        created_at: `2020-09-21 13:18:35`,
        updated_at: `2020-09-21 13:18:35`
      },
      {
        id: 6,
        title: `CHEESY GARLIC BRUSCHETTA`,
        ingredients: `Lots of pepperoni & mozzarella, garlic sauce`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        image: `https://static.nnc.kz/pizza2.jpg`,
        price: 17,
        created_at: `2020-09-21 13:18:35`,
        updated_at: `2020-09-21 13:18:35`
      },
      {
        id: 7,
        title: `GRAND SUPREME`,
        ingredients: `Baby spinach, smoked leg ham, olives, mozzarella, ect`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        image: `https://static.nnc.kz/pizza3.jpg`,
        price: 15,
        created_at: `2020-09-21 13:18:35`,
        updated_at: `2020-09-21 13:18:35`
      },
      {
        id: 8,
        title: `PACHINO PICCANTE`,
        ingredients: `Marinated cherry tomatoes, garlic sauce`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        image: `https://static.nnc.kz/pizza4.jpg`,
        price: 15,
        created_at: `2020-09-21 13:18:35`,
        updated_at: `2020-09-21 13:18:35`
      }
    ],

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

  }});


it(`App conponent renders correctly`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            loadProducts={() => {}}
            loadCurrencies={() => {}}
          >
            <h1>Test</h1>
          </App>
        </Provider>

    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
