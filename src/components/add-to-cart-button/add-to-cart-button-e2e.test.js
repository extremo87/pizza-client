import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AddToCartButton} from './add-to-cart-button';

configure({adapter: new Adapter()});


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

const cart = {
  1: {
    id: 1,
    title: `MARGHERITA`,
    ingredients: `Tomatoes, mozzarella, ricotta, bacon, onion`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: `https://static.nnc.kz/pizza1.jpg`,
    price: 18,
    created_at: `2020-09-21 13:18:35`,
    updated_at: `2020-09-21 13:18:35`
  }

};

describe(`Cart buttons e2e`, () => {
  it(`Click on add to cart button`, () => {
    const clickFn = jest.fn();

    const main = shallow(
        <AddToCartButton
          addToCart={clickFn}
          increment={() => {}}
          decrement={() => {}}
          product={product}
          cart={{}}
        />
    );

    const button = main.find(`.add-to-cart`);

    button.simulate(`click`, {
      preventDefault: () => {}
    });

    expect(clickFn).toHaveBeenCalledTimes(1);

  });


  it(`Click on increment product in cart button`, () => {
    const clickFn = jest.fn();

    const main = shallow(
        <AddToCartButton
          addToCart={() => {}}
          increment={clickFn}
          decrement={() => {}}
          product={product}
          cart={cart}
        />
    );

    const button = main.find(`.increment`);

    button.simulate(`click`, {
      preventDefault: () => {}
    });

    expect(clickFn).toHaveBeenCalledTimes(1);

  });

  it(`Click on decrement product in cart button`, () => {
    const clickFn = jest.fn();

    const main = shallow(
        <AddToCartButton
          addToCart={() => {}}
          increment={() => {}}
          decrement={clickFn}
          product={product}
          cart={cart}
        />
    );

    const button = main.find(`.decrement`);

    button.simulate(`click`, {
      preventDefault: () => {}
    });

    expect(clickFn).toHaveBeenCalledTimes(1);

  });
});
