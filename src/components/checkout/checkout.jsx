import React from 'react';
import InputMask from 'react-input-mask';
import {isValidPhone} from '../../utils/utils';

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
    this.handleValidation = this.handleValidation.bind(this);
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

    return formIsValid;
  }

  render() {

    const {firstName, lastName, address, phone} = this.state;
    const formIsValid = this.handleValidation();

    return (
      <div className="col-md-9">
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
          <button className={`btn btn-primary btn-lg btn-block${formIsValid ? `` : ` disabled`}`} type="submit">Order</button>
        </form>
      </div>
    );
  }
}


export default Checkout;
