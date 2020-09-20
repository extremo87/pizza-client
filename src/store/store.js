
import reducer from '../reducers/reducer';
import {createAPI} from "../api/api.js";
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {ActionCreator} from '../reducers/service/service';

const onError = (error) => {
  store.dispatch(ActionCreator.setError(error));
};


const api = createAPI(onError);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

export default store;

