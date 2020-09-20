
import reducer from '../reducers/reducer';
import {createAPI} from "../api/api.js";
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {ActionCreator} from '../reducers/service/service';
import {loadState, saveState} from '../utils/utils';

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

export default store;

