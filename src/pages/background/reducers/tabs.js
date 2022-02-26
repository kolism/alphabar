const defaultState = {
  allTabs: [],
  currentTab: {},
  tabActions: [],
};
/* global chrome */

const settings = (state = defaultState, action) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        currentTab: { ...action.currentTab },
      };
    case "TAB-ACTIONS":
      return {
        ...state,
        tabActions: action.actions,
      };
    case "ALL-TABS": {
      console.log("Setting all tabs", action);
      return {
        ...state,
        allTabs: action.allTabs,
      };
    }
    case "SWITCH-TAB": {
      let tab = action.tab;
      chrome.tabs.highlight({
        tabs: tab.index,
        windowId: tab.windowId,
      });
      chrome.windows.update(tab.windowId, { focused: true });
    }
  }
  return state;
};

export default settings;
