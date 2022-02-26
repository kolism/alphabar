import { applyMiddleware, createStore } from "redux";
import { wrapStore, alias } from "react-chrome-redux";

import reducer from "./reducers";

import { saveState, loadState } from "./localStorage";
const store = createStore(reducer, loadState());

store.subscribe(
  saveState({
    bookmark: store.getState().bookmark,
    settings: store.getState().settings,
    animation: store.getState().animation,
  })
);

wrapStore(store, {
  portName: "COUNTING",
});

export default store;
