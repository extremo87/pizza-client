import React from 'react';

class Checkout extends React.PureComponent {

  render() {
    return (
      <div className="col-md-8 order-md-1">
        <h4 className="mb-3">Billing address</h4>
        <form className="needs-validation" noValidate>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName">First name</label>
              <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
              <div className="invalid-feedback">
                  Valid first name is required.
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName">Last name</label>
              <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
              <div className="invalid-feedback">
                  Valid last name is required.
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email">Phone <span className="text-muted">(Optional)</span></label>
            <input type="email" className="form-control" id="email" placeholder="you@example.com" />
            <div className="invalid-feedback">
                Please enter a valid phone for shipping updates.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
            <div className="invalid-feedback">
                Please enter your shipping address.
            </div>
          </div>

          <hr className="mb-4" />

          <h4 className="mb-3">Payment</h4>

          <div className="d-block my-3">
            <div className="custom-control custom-radio">
              <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked required />
              <label className="custom-control-label" htmlFor="credit">Credit card</label>
            </div>
            <div className="custom-control custom-radio">
              <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
              <label className="custom-control-label" htmlFor="debit">Debit card</label>
            </div>
            <div className="custom-control custom-radio">
              <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
              <label className="custom-control-label" htmlFor="paypal">PayPal</label>
            </div>
          </div>
          <hr className="mb-4" />
          <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
        </form>
      </div>
    );
  }
}


export default Checkout;
