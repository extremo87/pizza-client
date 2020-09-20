import React from 'react';
import {Switch, Route, Router} from "react-router-dom";
import Main from '../main/main';
import Checkout from '../checkout/checkout';
import Cart from '../cart/cart';
import Page from '../page/page';
import history from '../../history';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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
          <Route exact path="/">
            <Page>
              <Main />
            </Page>
          </Route>

          <Route exact path="/cart">
            <Page>
              <Cart />
            </Page>
          </Route>

          <Route exact path="/checkout">
            <Page>
              <Checkout />
            </Page>
          </Route>

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
