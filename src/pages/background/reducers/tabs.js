const defaultState = {
  allTabs: [],
  currentTab: {},
  tabActions: [],
};
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
  }
  return state;
};

export default settings;
