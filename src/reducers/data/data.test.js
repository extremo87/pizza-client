

/* eslint-disable camelcase */
import MockAdapter from "axios-mock-adapter";
import {reducer} from './data';
import {ActionType, Operation, ActionCreator} from '../../reducers/data/data';
import {createAPI} from "../../api/api";
import {DELIVERY_FEE} from '../../config/config';


const api = createAPI(() => {});

const currencies = {
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
};


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    products: [],
    currencies: {},
    currentProduct: null,
    currency: `USD`,
    deliveryFee: DELIVERY_FEE
  });
});

describe(`actions`, () => {
  it(`Set products`, () => {
    const products = [
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
      }
    ];

    const expectedAction = {
      type: ActionType.SET_PRODUCTS,
      payload: products
    };

    expect(ActionCreator.setProducts(products)).toEqual(expectedAction);
  });

  it(`Set currencies`, () => {
    const expectedAction = {
      type: ActionType.SET_CURRENCIES,
      payload: currencies
    };

    expect(ActionCreator.setCurrencies(currencies)).toEqual(expectedAction);
  });

  it(`Set currency`, () => {

    const expectedAction = {
      type: ActionType.SET_CURRENCY,
      payload: `USD`
    };

    expect(ActionCreator.setCurrency(`USD`)).toEqual(expectedAction);
  });

  it(`Set delivery fee`, () => {

    const expectedAction = {
      type: ActionType.SET_DELIVERY_FEE,
      payload: 10
    };

    expect(ActionCreator.setDeliveryFee(10)).toEqual(expectedAction);
  });

});

const mockApiResponseDataProducts = [{
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
];


describe(`Pulling products is working`, () => {
  it(`Should make a correct API call to /products`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const productsLoader = Operation.loadProducts();

    apiMock
      .onGet(`/products`)
      .reply(200, mockApiResponseDataProducts);

    return productsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.SET_PRODUCTS,
          payload: mockApiResponseDataProducts,
        });

      });
  });
});


describe(`Fetching currencies is working`, () => {
  it(`Should make a correct API call to /currencies`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const currenciesLoader = Operation.loadCurrencies();

    apiMock
      .onGet(`/currencies`)
      .reply(200, currencies);

    return currenciesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.SET_CURRENCIES,
          payload: currencies,
        });

      });
  });
});
