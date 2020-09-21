import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import history from '../../history';
import {getProducts, getCurrency, getCurrencies} from '../../reducers/data/selectors';
import {ProductType} from '../../types/types';
import AddToCartButton from '../add-to-cart-button/add-to-cart-button';
import Spinner from '../spinner/spinner';
import Card from '../card/card';
import isEmpty from 'lodash/isEmpty';
import {PRODUCT_CARD_LIMIT} from '../../config/config';
import RoutePath from '../../config/routes';


class Product extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const {id} = this.props.match.params;
    const product = this.props.products.find((item) => Number(item.id) === Number(id));

    if (isEmpty(product)) {
      history.push(RoutePath.MAINPAGE);
      return <Spinner />;
    }

    if (!this.props.currencies[this.props.currency]) {
      return <Spinner />;
    }

    const randomProducts = this.props.products.filter((item) => Number(item.id) !== Number(id))
    .sort(() => Math.random() - Math.random())
    .slice(0, PRODUCT_CARD_LIMIT);

    const currencySymbol = this.props.currencies[this.props.currency].symbol;
    const {title, price, image, ingredients, description} = product;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-5">
            <img src={image} />
          </div>
          <div className="col-md-7">
            <h1>{title}</h1>
            <p>Ingridients: {ingredients} </p>
            <hr/>
            <div className="row">
              <div className="col-md-3">
                <h3 className="text-center">{price}$</h3>
              </div>
              <AddToCartButton product={product}/>
            </div>

            <hr/>
            <p>
              {description}

            </p>
          </div>
        </div>

        <div className="card-deck mb-4 text-center" style={{marginTop: `5%`}}>
          { randomProducts.map((item) => <Card countInRow={3} product={item} currencySymbol={currencySymbol} key={item.id} />)}
        </div>

      </React.Fragment>
    );
  }
}

Product.propTypes = {
  match: PropTypes.object,
  products: PropTypes.arrayOf(ProductType),
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  products: getProducts(state),
  currency: getCurrency(state),
  currencies: getCurrencies(state)
});

export {Product};
export default withRouter(connect(mapStateToProps, null)(Product));
