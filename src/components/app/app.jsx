import React from 'react';
import {Switch, Route, Router} from "react-router-dom";
import Main from '../main/main';
import Checkout from '../checkout/checkout';
import Cart from '../cart/cart';
import Page from '../page/page';
import history from '../../history';


class App extends React.PureComponent {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <Router history={history}>
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


export default App;
