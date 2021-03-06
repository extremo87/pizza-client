import React from 'react';
import {Switch, Route, Router, Redirect} from "react-router-dom";
import history from '../../history';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RoutePath from '../../config/routes';
import PrivateRoute from '../private-route/private-route';

import Main from '../main/main';
import SuccessPage from '../success-page/success-page';
import Checkout from '../checkout/checkout';
import Cart from '../cart/cart';
import Product from '../product/product';
import Page from '../page/page';
import RegistrationForm from '../registration-form/registration-form';
import LoginForm from '../login-form/login-form';
import OrderHistory from '../order-history/order-history';

import {Operation as DataOperation} from '../../reducers/data/data';

class App extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadProducts();
    this.props.loadCurrencies();
  }

  render() {

    return (
      <Router history={history}>
        {this.props.children}
        <Switch>
          <Route exact path={RoutePath.MAINPAGE}>
            <Page>
              <Main />
            </Page>
          </Route>

          <Route exact path={RoutePath.CART}>
            <Page>
              <Cart />
            </Page>
          </Route>

          <Route exact path={RoutePath.CHECKOUT}>
            <Page>
              <Checkout />
            </Page>
          </Route>

          <Route exact path={RoutePath.PRODUCT}>
            <Page>
              <Product />
            </Page>
          </Route>

          <Route exact path={RoutePath.SUCCESS_PAGE}>
            <Page>
              <SuccessPage />
            </Page>
          </Route>

          <Route exact path={RoutePath.REGISTER}>
            <Page>
              <RegistrationForm />
            </Page>
          </Route>


          <Route exact path={RoutePath.LOGIN}
            render={() => {
              return ((localStorage.getItem(`token`))
                ? <Redirect to={RoutePath.MAINPAGE} />
                :  <Page>
                <LoginForm />
              </Page>);
            }}
          />


          <PrivateRoute exact path={RoutePath.ORDER_HISTORY}
            render={() => {
              return (
                <Page>
                  <OrderHistory />
                </Page>
              );
            }}
          />

        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  loadProducts: PropTypes.func.isRequired,
  loadCurrencies: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

const mapDispatchToProps = (dispatch) => ({

  loadProducts() {
    dispatch(DataOperation.loadProducts());
  },
  loadCurrencies() {
    dispatch(DataOperation.loadCurrencies());
  },

});


export {App};
export default connect(null, mapDispatchToProps)(App);
