import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { InfoContainer } from './components/Info';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);

const store = createStore(reducer);

store.dispatch({
  type: "INIT"
})

ReactDOM.render(
  <Provider store={store}>
    <InfoContainer />
  </Provider>,
  document.getElementById('root')
)
