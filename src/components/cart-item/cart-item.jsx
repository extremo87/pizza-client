import React from 'react';
import {ProductType} from '../../types/types';
import AddToCartButton from '../add-to-cart-button/add-to-cart-button';

const CartItem = ({product}) => {

  const {title, ingredients, price, qty} = product;

  return (
    <li className="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 className="my-0">{title}</h6>
        <small className="text-muted">{ingredients}</small>
      </div>
      <div style={{position: `absolute`, left: `70%`}}>
        <AddToCartButton product={product} />
      </div>

      <span className="text-muted">{price * qty}</span>
    </li>
  );
};

CartItem.propTypes = {
  product: ProductType
};

export default CartItem;
