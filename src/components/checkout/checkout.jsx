import React from 'react';
import {connect} from 'react-redux';
import InputMask from 'react-input-mask';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import {getFullCurrency, getCurrency, getDeliveryFee} from "../../reducers/data/selectors";
import {getUser} from "../../reducers/user/selectors";
import {getCart} from "../../reducers/cart/selectors";
import {getOrderLoadingStatus} from "../../reducers/service/selectors";
import Spinner from '../spinner/spinner';
import CartItemLight from '../cart-item-ligth/cart-item-ligth';
import {isValidPhone} from '../../utils/utils';
import {getTotalCart, getCartItemsCount, prepareOrderData} from '../../utils/utils';
import history from '../../history';
import {Operation} from '../../reducers/cart/cart';
import RoutePath from '../../config/routes';
import LoadingButton from '../loading-button/loading-button';

class Checkout extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      firstName: ``,
      lastName: ``,
      phone: ``,
      address: ``,
      paymentMethod: ``,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleMakeOrder = this.handleMakeOrder.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  componentDidMount() {
    if (isEmpty(this.props.cart)) {
      history.push(RoutePath.MAINPAGE);
    }

    const user = this.props.user;

    if (!isEmpty(user)) {
      this.setState({
        firstName: user.firstname,
        lastName: user.lastname,
        phone: user.phone
      });
    }
  }


  handleMakeOrder(evt) {
    evt.preventDefault();
    const {cart, currency, deliveryFee, makeOrder} = this.props;
    makeOrder(prepareOrderData(this.state, cart, currency, deliveryFee));
  }


  handleChange(field, evt) {
    this.setState({[field]: evt.target.value});
  }

  handleValidation() {

    const fields = this.state;
    let formIsValid = true;

    if (!fields[`firstName`]) {
      formIsValid = false;
    }

    if (typeof fields[`firstName`] !== `undefined`) {
      if (!fields[`firstName`].match(/^[a-zA-Za-яА-Я]+$/)) {
        formIsValid = false;
      }
    }

    if (!fields[`lastName`]) {
      formIsValid = false;
    }

    if (typeof fields[`lastName`] !== `undefined`) {
      if (!fields[`lastName`].match(/^[a-zA-Za-яА-Я]+$/)) {
        formIsValid = false;
      }
    }
    if ((!fields[`phone`]) || !isValidPhone(fields[`phone`])) {
      formIsValid = false;
    }

    if ((!fields[`address`]) || (fields[`address`].length < 10)) {
      formIsValid = false;
    }
    if (!fields[`paymentMethod`]) {
      formIsValid = false;
    }

    if (isEmpty(this.props.cart)) {
      formIsValid = false;
    }

    return formIsValid;
  }

  render() {

    const {firstName, lastName, address, phone} = this.state;
    const formIsValid = this.handleValidation();

    const {fullCurrency, deliveryFee, cart, currency, isOrderLoading} = this.props;
    const totalCount = getCartItemsCount(cart);
    const totalSum = getTotalCart(cart);
    const total = totalSum + deliveryFee;

    if (!fullCurrency) {
      return <Spinner />;
    }

    const CheckoutButton = () => {
      return (
        <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={this.handleMakeOrder} disabled={!formIsValid}>
        Order
        </button>
      );
    };

    return (
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">{totalCount}</span>
          </h4>
          <ul className="list-group mb-3">

            { Object.keys(cart).map((key) => cart[key]).map((product) => <CartItemLight key={product.id} product={product} />)}

            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Delivery fee</h6>
              </div>
              <span className="text-success">{fullCurrency.symbol}{deliveryFee.toFixed(2)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total ({currency})</span>
              <strong>{fullCurrency.symbol}{total}</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text" onChange={(evt) => this.handleChange(`firstName`, evt)} className="form-control" id="firstName" placeholder="" value={firstName} required />
                <div className="invalid-feedback">
                  Valid first name is required. Only letters allowed
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" onChange={(evt) => this.handleChange(`lastName`, evt)} className="form-control" id="lastName" placeholder="" value={lastName} required />
                <div className="invalid-feedback">
                  Valid last name is required. Only letters allowed
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email">Phone</label>
              <InputMask mask="+7 (999) 999-99-99" type="text" onChange={(evt) => this.handleChange(`phone`, evt)} className="form-control" id="phone" placeholder="+7 (900) 0000000" value={phone} />
              <div className="invalid-feedback">
                Please enter a valid phone for shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input type="text" onChange={(evt) => this.handleChange(`address`, evt)} className="form-control" id="address" placeholder="1234 Main St" value={address} required />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <hr className="mb-4" />

            <h4 className="mb-3">Payment</h4>

            <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input onChange={(evt) => this.handleChange(`paymentMethod`, evt)} id="credit" name="paymentMethod" type="radio" className="custom-control-input" value="credit" required />
                <label className="custom-control-label" htmlFor="credit">Credit card</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="debit" onChange={(evt) => this.handleChange(`paymentMethod`, evt)} name="paymentMethod" type="radio" className="custom-control-input" value="debit" required />
                <label className="custom-control-label" htmlFor="debit">Debit card</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="cash" onChange={(evt) => this.handleChange(`paymentMethod`, evt)} name="paymentMethod" type="radio" className="custom-control-input" value="cash" required />
                <label className="custom-control-label" htmlFor="cash">Cash</label>
              </div>
            </div>
            <hr className="mb-4" />
            { isOrderLoading ? <LoadingButton /> : <CheckoutButton />}
          </form>
        </div>

      </div>

    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  fullCurrency: PropTypes.object,
  currency: PropTypes.string.isRequired,
  deliveryFee: PropTypes.number.isRequired,
  makeOrder: PropTypes.func.isRequired,
  isOrderLoading: PropTypes.bool.isRequired
};


const mapStateToProps = (state) => ({
  user: getUser(state),
  cart: getCart(state),
  deliveryFee: getDeliveryFee(state),
  fullCurrency: getFullCurrency(state),
  currency: getCurrency(state),
  isOrderLoading: getOrderLoadingStatus(state)
});

const mapDispatchToProps = (dispatch) => ({

  makeOrder(order) {
    dispatch(Operation.makeOrder(order));
  },

});


export {Checkout};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);


