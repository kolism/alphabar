/* global chrome */
import { wrapStore } from "webext-redux";
import { applyMiddleware, createStore } from "redux";

import reducer from "./reducers";

import { saveState, loadState } from "./localStorage";

const store = createStore(reducer, loadState());

wrapStore(store, { portName: "COUNTING" }); // make sure portName matches

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => updateAlphaBar());
chrome.tabs.onCreated.addListener((tab) => updateAlphaBar());
chrome.tabs.onRemoved.addListener((tabId, changeInfo) => updateAlphaBar());

const updateAlphaBar = () => {
  setOpenTabs();
};

const setOpenTabs = () => {
  chrome.tabs.query({}, (tabs) => {
    console.log("tabs", tabs);
    store.dispatch({ type: "ALL-TABS", allTabs: tabs });
  });
};
