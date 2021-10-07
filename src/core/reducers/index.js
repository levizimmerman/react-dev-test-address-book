import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import addressBook from "./addressBook";

export const rootReducer = combineReducers({ addressBook });

export const configureStore = () => {
  const middlewareEnhancer = applyMiddleware();

  let composedEnhancers = compose(middlewareEnhancer);

  /** Don't add Redux devtools on production. */
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "function") {
    composedEnhancers = compose(
      middlewareEnhancer,
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }

  return createStore(rootReducer, {}, composedEnhancers);
};
