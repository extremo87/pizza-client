import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import AppRoute from '../../config/routes';


const PrivateRoute = (props) => {
  const {render, path, exact} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => localStorage.getItem(`token`) ? render() : <Redirect to={AppRoute.LOGIN} />}
    />
  );
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired
};

export default PrivateRoute;
