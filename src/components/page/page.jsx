import React from 'react';
import Header from '../header/header';


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

export default Page;
