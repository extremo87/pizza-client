import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {Provider} from 'react-redux';
import store from './store/store';
import Alert from './components/alert/alert';


ReactDOM.render(
    <Provider store={store}>
      <App>
        <Alert/>
      </App>
    </Provider>
    ,
    document.querySelector(`#root`)
);

