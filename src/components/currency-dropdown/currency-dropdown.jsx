import React from 'react';
import {getCurrency, getCurrencies} from "../../reducers/data/selectors";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../spinner/spinner';
import {ActionCreator} from '../../reducers/data/data';
import {ActionCreator as CartActionCreator} from '../../reducers/cart/cart';
import NameSpace from "../../reducers/name-space";


class CurrencyDropdown extends React.PureComponent {

  constructor() {
    super();

    this.state = {
      isDropdownOpen: false
    };

    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this);

  }

  handleDropdown(evt) {
    evt.preventDefault();
    this.setState({isDropdownOpen: !this.state.isDropdownOpen});
  }

  handleChangeCurrency(currency) {
    this.props.changeCurrency(currency);
    this.setState({isDropdownOpen: false});
  }


  render() {

    if (!this.props.currencies[this.props.currency]) {
      return <Spinner />;
    }

    const currenciesList = Object.keys(this.props.currencies).filter((item) => item !== this.props.currency);

    return (
      <li className="nav-item dropdown">
        <a onClick={this.handleDropdown} className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {this.props.currencies[this.props.currency].symbol + this.props.currency}
        </a>
        <div className={`dropdown-menu${this.state.isDropdownOpen ? ` show` : ``}`} aria-labelledby="navbarDropdownMenuLink">

          {currenciesList.map((key) => {
            return (
              <a key={key} onClick={() => this.handleChangeCurrency(key)} className="dropdown-item" href="#">{this.props.currencies[key].symbol + key}</a>
            );
          })}

        </div>
      </li>

    );
  }

}

CurrencyDropdown.propTypes = {
  currencies: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  changeCurrency: PropTypes.func.isRequired

};

const mapStateToProps = (state) => ({
  currencies: getCurrencies(state),
  currency: getCurrency(state),
});

const updateCart = (currency) => {
  return (dispatch, getState) => {
    const currencies = getState()[NameSpace.DATA].currencies;
    const currentCurrency = getState()[NameSpace.DATA].currency;
    const newCurrency = currencies[currency];
    const rate = newCurrency.rates[currentCurrency].rate;
    dispatch(CartActionCreator.replaceCart(rate));
    dispatch(ActionCreator.setDeliveryFee(rate));
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeCurrency(currency) {
    dispatch(updateCart(currency));
    dispatch(ActionCreator.setCurrency(currency));
  }
});


export {CurrencyDropdown};
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDropdown);
