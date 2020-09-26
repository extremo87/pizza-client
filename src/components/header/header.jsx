import React from 'react';
import CartButton from '../cart-button/cart-button';
import CurrencyDropdown from '../currency-dropdown/currency-dropdown';
import UserButton from '../user-button/user-button';
import {Link} from 'react-router-dom';
import RoutePath from '../../config/routes';
import withSwitcher from '../../high-order-components/with-switcher';

const CurrencyDropdownWrapped = withSwitcher(CurrencyDropdown);
const UserButtonWrapped = withSwitcher(UserButton);

const Header = () => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm fixed-top">
      <h5 className="my-0 mr-md-auto font-weight-normal"><Link className={`navbar-brand mr-0 mr-md-2 text-dark`} to={RoutePath.MAINPAGE}>Your Pizza</Link></h5>

      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          <UserButtonWrapped />
          <CurrencyDropdownWrapped />
        </ul>
      </nav>
      <CartButton />
    </div>

  );
};


export default Header;
