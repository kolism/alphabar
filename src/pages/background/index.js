/* global chrome */
import { wrapStore } from "webext-redux";
import { applyMiddleware, createStore } from "redux";

import reducer from "./reducers";

import { saveState, loadState } from "./localStorage";
let actions = [];

const getTabs = () => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      tab.desc = "Chrome tab";
      tab.keycheck = false;
      tab.action = "switch-tab";
      tab.type = "tab";
    });
    actions = tabs.concat(actions);
  });
};
console.log("actions", actions);
const store = createStore(reducer, loadState());

store.dispatch({ type: "TAB-ACTIONS", actions: actions });
wrapStore(store, { portName: "COUNTING" }); // make sure portName matches

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => updateAlphaBar());
chrome.tabs.onCreated.addListener((tab) => updateAlphaBar());
chrome.tabs.onRemoved.addListener((tabId, changeInfo) => updateAlphaBar());

const updateAlphaBar = () => {
  setOpenTabs();
  /*clearActions();
	getTabs();
	getBookmarks();
	var search = [
		{title:"Search", desc:"Search for a query", type:"action", action:"search", emoji:true, emojiChar:"🔍", keycheck:false},
		{title:"Search", desc:"Go to website", type:"action", action:"goto", emoji:true, emojiChar:"🔍", keycheck:false}
	];
	actions = search.concat(actions);*/
};

const setOpenTabs = () => {
  chrome.tabs.query({}, (tabs) => {
    console.log("tabs", tabs);
    store.dispatch({ type: "ALL-TABS", allTabs: tabs });
  });
};
