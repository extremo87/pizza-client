import React from 'react';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getCart} from "../../reducers/cart/selectors";
import {getFullCurrency, getCurrency, getDeliveryFee} from "../../reducers/data/selectors";
import {getTotalCart, getCartItemsCount} from '../../utils/utils';
import CartItem from '../cart-item/cart-item';
import Spinner from '../spinner/spinner';


class Cart extends React.PureComponent {

  render() {
    const {cart, currency, fullCurrency, deliveryFee} = this.props;
    const totalCount = getCartItemsCount(cart);
    const totalSum = getTotalCart(cart);
    const total = totalSum + deliveryFee;
    const isCartEmpty = isEmpty(cart);

    if (!fullCurrency) {
      return <Spinner />;
    }

    return (
      <div>
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Your cart</span>
          <span className="badge badge-secondary badge-pill">{totalCount}</span>
        </h4>
        <ul className="list-group list-group-flush">
          { Object.keys(cart).map((key) => cart[key]).map((product) => <CartItem key={product.id} product={product} />)}

          <li className="list-group-item d-flex justify-content-between bg-light">
            <div className="text-success">
              <h6 className="my-0">Delivery fee</h6>
            </div>
            <span className="text-success">{fullCurrency.symbol}{deliveryFee.toFixed(2)}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Total ({currency})</span>
            <strong>{fullCurrency.symbol}{total.toFixed(2)} </strong>
          </li>
        </ul>
        <hr className="mb-4" />
        <Link to={`/checkout`} className={`btn btn-primary btn-lg btn-block${isCartEmpty ? ` disabled` : ``}`} type="submit">Continue to checkout</Link>

      </div>

    );
  }
}


Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  fullCurrency: PropTypes.object,
  currency: PropTypes.string.isRequired,
  deliveryFee: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  cart: getCart(state),
  deliveryFee: getDeliveryFee(state),
  fullCurrency: getFullCurrency(state),
  currency: getCurrency(state)
});


export {Cart};
export default connect(mapStateToProps, null)(Cart);

