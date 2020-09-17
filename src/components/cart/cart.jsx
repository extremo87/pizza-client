import React from 'react';


class Cart extends React.PureComponent {

  render() {
    return (
      <div className="col-md-8 order-md-2 mb-4">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Your cart</span>
          <span className="badge badge-secondary badge-pill">3</span>
        </h4>
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">Product name</h6>
              <small className="text-muted">Brief description</small>
            </div>
            <div className="col-mb-2">
              <div className="input-group">
                <div className="input-group-prepend">
                  <button type="button" className="btn btn-sm btn-outline-secondary">+</button>
                </div>
                <div className="custom-file" style={{width: `40px`}}>
                  <input type="text" className="form-control" />
                </div>
                <div className="input-group-append">
                  <button type="button" className="btn btn-sm btn-outline-secondary">-</button>
                </div>
              </div>
            </div>
            <span className="text-muted">$12</span>
          </li>
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">Second product</h6>
              <small className="text-muted">Brief description</small>
            </div>
            <div className="col-mb-2">
              <div className="input-group">
                <div className="input-group-prepend">
                  <button type="button" className="btn btn-sm btn-outline-secondary">+</button>
                </div>
                <div className="custom-file" style={{width: `40px`}}>
                  <input type="text" className="form-control" />
                </div>
                <div className="input-group-append">
                  <button type="button" className="btn btn-sm btn-outline-secondary">-</button>
                </div>
              </div>
            </div>
            <span className="text-muted">$8</span>
          </li>

          <li className="list-group-item d-flex justify-content-between bg-light">
            <div className="text-success">
              <h6 className="my-0">Delivery fee</h6>
            </div>
            <span className="text-success">$5</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>$20</strong>
          </li>
        </ul>
        <hr className="mb-4" />
        <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>

      </div>

    );
  }
}


export default Cart;
