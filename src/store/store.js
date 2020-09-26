
import reducer from '../reducers/reducer';
import {createAPI} from "../api/api.js";
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {ActionCreator} from '../reducers/service/service';
import {loadState, saveState} from '../utils/utils';
import NameSpace from '../reducers/name-space';
import axios from 'axios';

const onError = (error) => {
  store.dispatch(ActionCreator.setError(error));
};


const presistedState = loadState();

const api = createAPI(onError);

const store = createStore(
    reducer,
    presistedState,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.subscribe(() => {
  saveState(store.getState());
});

if (store.getState()[NameSpace.USER].token) {
  document.cookie = `Authorization=bearer${store.getState()[NameSpace.USER].token.token}`;
  axios.defaults.headers.common[`Authorization`] = `bearer${store.getState()[NameSpace.USER].token}`;
}

export default store;

