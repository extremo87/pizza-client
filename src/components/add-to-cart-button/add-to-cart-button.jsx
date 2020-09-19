import React from 'react';
import PropTypes from 'prop-types';
import ProductType from '../../types/types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducers/cart/cart';
import {getCart} from "../../reducers/cart/selectors";


class AddToCartButton extends React.PureComponent {

  constructor() {
    super();

    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }


  handleAddToCart() {
    this.props.addToCart(this.props.product);
  }


  handleIncrement() {
    this.props.increment(this.props.product);
  }


  handleDecrement() {
    this.props.decrement(this.props.product);
  }


  getCart() {
    const {cart, product} = this.props;
    console.log(cart[product.id]);
    return (cart[product.id]) ? cart[product.id] : false;
  }

  render() {

    const cartProduct = this.getCart();
    if (cartProduct) {
      return (
        <div className="col-mb-2">
          <div className="input-group">
            <div className="input-group-prepend">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.handleIncrement}>+</button>
            </div>
            <div className="custom-file" style={{width: `40px`}}>
              <input type="text" className="form-control" value={cartProduct.qty} readOnly/>
            </div>
            <div className="input-group-append">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.handleDecrement}>-</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="btn-group">
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.handleAddToCart}>
                Add to cart
        </button>
      </div>
    );
  }
}

AddToCartButton.propTypes = {
  product: ProductType,
  addToCart: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired

};

const mapStateToProps = (state) => ({
  cart: getCart(state),
});

const mapDispatchToProps = (dispatch) => ({

  addToCart(product) {
    dispatch(ActionCreator.addToCart(product));
  },

  increment(product) {
    dispatch(ActionCreator.incrementProduct(product));
  },

  decrement(product) {
    dispatch(ActionCreator.decrementProduct(product));
  },

});


export {AddToCartButton};
export default connect(mapStateToProps, mapDispatchToProps)(AddToCartButton);
