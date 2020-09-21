import React from 'react';
import {ProductType} from '../../types/types';

const CartItemLight = ({product}) => {

  const {title, ingredients, price, qty} = product;

  return (
    <li className="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 className="my-0">{title}</h6>
        <small className="text-muted">{ingredients}</small>
      </div>

      <span className="text-muted">{price * qty}</span>
    </li>
  );
};

CartItemLight.propTypes = {
  product: ProductType
};

export default CartItemLight;
