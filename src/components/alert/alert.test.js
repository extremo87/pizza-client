import React from 'react';
import Alert from './alert';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import NameSpace from "../../reducers/name-space.js";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.SERVICE]: {
    error: null
  }
});

it(`Alert conponent renders correctly`, () => {
  const tree = renderer
    .create(
        <Alert store={store}
          onClearError={() => {}}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
