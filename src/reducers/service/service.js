const initialState = {
  error: null,
  isOrderLoading: false
};

const ActionType = {
  SET_ERROR: `SET_ERROR`,
  CLEAR_ERROR: `CLEAR_ERROR`,
  SET_ORDER_LOADING: `SET_ORDER_LOADING`,
};

const ActionCreator = {
  setError: (message) => {
    return {
      type: ActionType.SET_ERROR,
      payload: message,
    };
  },

  clearError: () => {
    return {
      type: ActionType.CLEAR_ERROR,
    };
  },

  setOrderLoading: (status) => {
    return {
      type: ActionType.SET_ORDER_LOADING,
      payload: status,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
      });

    case ActionType.CLEAR_ERROR:
      return Object.assign({}, state, {
        error: null,
      });

    case ActionType.SET_ORDER_LOADING:
      return Object.assign({}, state, {
        isOrderLoading: action.payload,
      });
  }

  return state;
};


export {
  ActionCreator,
  reducer,
  ActionType
};
