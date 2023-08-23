import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import { appSlice } from './app/slice';
import thunkMiddleware from 'redux-thunk'

export const rootReducer = combineReducers({
  app: appSlice.reducer,
});

// QUESTION: Why would we use thunk middleware? What advantage does this give us?
// ANSWER: Thunk is used to handle asynchronous logic
const composedEnhancer = applyMiddleware(thunkMiddleware)

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [composedEnhancer],
  devTools: true,
});