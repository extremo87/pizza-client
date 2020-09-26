import history from '../../history';
import RoutePath from '../../config/routes';
import axios from 'axios';

export const ActionType = {
  LOGOUT: `LOGOUT`,
  SET_USER: `SET_USER`,
  SET_PROPERTY: `SET_PROPERTY`,
  SET_LOGGING_IN_PROCESS: `SET_LOGGING_IN_PROCESS`,
  SET_REGISTATION_IN_PROCESS: `SET_REGISTATION_IN_PROCESS`,
};

const initialState = {
  user: {},
  orders: [],
  registrationInProgress: false,
  loggingInProgress: false
};

const ActionCreator = {
  setUser: (user) => {
    return {
      type: ActionType.SET_USER,
      payload: user
    };
  },

  logout: () => {
    return {
      type: ActionType.LOGOUT,
    };
  },
  
  setProperty: (data) => {
    return {
      type: ActionType.SET_PROPERTY,
      payload: data
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.SET_USER:
      return {...state, user: action.payload};

    case ActionType.LOGOUT:
      return {...state, ...initialState};
    
    case ActionType.SET_PROPERTY:
        const {property, value} = action.payload
        return {...state, [property]: value};
  
    default:
      return state;
  }
};

const Operation = {

  register: (data) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setProperty({
      property: `registrationInProgress`,
      value: true
    }));
    return api.post(`/register`, data)
      .then((res) => {
        dispatch(ActionCreator.setProperty({property: `registrationInProgress`, value: false}));     
        history.push(RoutePath.LOGIN);
      }).catch((error) => {
        dispatch(ActionCreator.setProperty({property: `registrationInProgress`, value: false}));        
      });
  },

  login: (data) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setProperty({
      property: `loggingInProgress`,
      value: true
    }));
    return api.post(`/login`, data)
      .then((res) => {
        const {token, user} = res.data;
        
        dispatch(ActionCreator.setProperty({property: `loggingInProgress`, value: false}));
        dispatch(ActionCreator.setUser(user));
        localStorage.setItem(`token`, `Bearer ${token}`);
        
        history.push(RoutePath.MAINPAGE);
      }).catch((error) => {
        dispatch(ActionCreator.setProperty({property: `loggingInProgress`, value: false}));     
      });
  },

  logout: () => (dispatch, getState, api) => {  
      dispatch(ActionCreator.logout());
      localStorage.removeItem(`token`);
      history.push(RoutePath.MAINPAGE);
  },
};



export {reducer, ActionCreator, Operation};
