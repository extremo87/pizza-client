import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCart} from "../../reducers/cart/selectors";
import {getTotalCart, getCartItemsCount} from '../../utils/utils';
import CartItem from '../cart-item/cart-item';
import {DELIVERY_FEE} from '../../config/config';


class Cart extends React.PureComponent {

  render() {
    const {cart} = this.props;
    const totalCount = getCartItemsCount(cart);
    const totalSum = getTotalCart(cart);

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
            <span className="text-success">${DELIVERY_FEE.toFixed(2)}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>{totalSum.toFixed(2)}</strong>
          </li>
        </ul>
        <hr className="mb-4" />
        <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>

      </div>

    );
  }
}

Cart.propTypes = {
  cart: PropTypes.object.isRequired

};

const mapStateToProps = (state) => ({
  cart: getCart(state),
});


export {Cart};
export default connect(mapStateToProps, null)(Cart);

