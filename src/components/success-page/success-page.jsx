import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


class Main extends React.PureComponent {

  render() {
    return (
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">Well done! Dear, Sergey Ukhanov your order #123 successfuly created! </h4>
        <p>
         We&rsquo;ll call you on the phone number you provided. Usally delivery takes not more than 30 minutes to Baker Street, 12-28
        </p>
        <hr />
        <p className="mb-0">Have a nice day! Sincerelly yours, &quot;Your Pizza&quot;</p>
        <hr />
        <a type="button" className="btn btn-outline-success">To main page</a>
        <a type="button" className="btn btn-outline-success">To my order</a>
      </div>
    );
  }
}

Main.propTypes = {

};

const mapStateToProps = (state) => ({
  // orders: getProducts(state),
});

export {Main};
export default connect(mapStateToProps, null)(Main);
