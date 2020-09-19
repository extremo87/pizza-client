import React from 'react';
import CartButton from '../cart-button/cart-button';
import CurrencyDropdown from '../currency-dropdown/currency-dropdown';

const Header = () => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm fixed-top">
      <h5 className="my-0 mr-md-auto font-weight-normal">Your Pizza</h5>

      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          <CurrencyDropdown />
          <li className="nav-item">
            <a className="nav-link" href="#">
                Login
            </a>
          </li>
        </ul>

      </nav>
      <CartButton />
    </div>

  );
};


export default Header;
