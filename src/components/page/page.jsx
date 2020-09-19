import React from 'react';
import Header from '../header/header';
import PropTypes from 'prop-types';


const Page = ({children}) => {

  return (
    <React.Fragment>
      <Header />
      <div className="container" style={{marginTop: `10%`}}>
        {children}
      </div>
    </React.Fragment>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired
};

export default Page;
