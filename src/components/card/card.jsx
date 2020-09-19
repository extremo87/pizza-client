import React from 'react';
import ProductType from '../../types/types';
import PropTypes from 'prop-types';
import AddToCartButton from '../add-to-cart-button/add-to-cart-button';


const Card = ({product, currencySymbol}) => {

  const {title, ingredients, image, price} = product;

  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <img className="card-img-top" src={image} />

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{ingredients}</p>
          <div className="d-flex justify-content-between align-items-center">
            <AddToCartButton product={product} />
            <p><b>{currencySymbol}{price}</b></p>
          </div>
        </div>
      </div>
    </div>
  );
};


Card.propTypes = {
  product: ProductType,
  currencySymbol: PropTypes.string.isRequired
};

export default Card;
