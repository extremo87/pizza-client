const initialState = {
  error: null,
};

const ActionType = {
  SET_ERROR: `SET_ERROR`,
  CLEAR_ERROR: `CLEAR_ERROR`,
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
  }

  return state;
};


export {
  ActionCreator,
  reducer,
  ActionType
};
