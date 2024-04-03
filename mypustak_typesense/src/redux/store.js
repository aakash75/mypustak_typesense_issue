"use client"
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import CombinedReducers from './reducers/CombinedReducers';
import { jwt } from './JwtMiddleware';
const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const middleware=[jwt,thunk];

const devTools =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(...middleware)
    : composeEnhancers(applyMiddleware(...middleware));

export const initStore = (initialState = {}) => {
    return createStore(CombinedReducers, initialState, devTools);
  };