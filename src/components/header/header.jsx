import React from 'react';
import CartButton from '../cart-button/cart-button';

const Header = () => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm fixed-top">
      <h5 className="my-0 mr-md-auto font-weight-normal">Your Pizza</h5>

      <nav className="my-2 my-md-0 mr-md-3">

        <a className="btn btn-outline-primary" href="#">
                Login
        </a>

      </nav>
      <CartButton />
    </div>

  );
};


export default Header;
