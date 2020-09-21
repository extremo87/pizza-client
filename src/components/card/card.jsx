import React from 'react';
import {ProductType} from '../../types/types';
import PropTypes from 'prop-types';
import AddToCartButton from '../add-to-cart-button/add-to-cart-button';
import {Link} from 'react-router-dom';


const Card = ({product, currencySymbol, countInRow}) => {

  const {id, title, ingredients, image, price} = product;

  return (
    <div className={`col-md-${countInRow}`}>
      <div className="card mb-4 shadow-sm">
        <img className="card-img-top" src={image} />

        <div className="card-body">
          <h5 className="card-title">
            <Link className="text-success" to={`/product/${id}`}>
              {title}
            </Link>
          </h5>
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


Card.defaultProps = {
  countInRow: 4
};

Card.propTypes = {
  product: ProductType,
  countInRow: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired
};

export default Card;
