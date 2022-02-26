import { combineReducers } from "redux";

import settings from "./reducers/settings";
import animation from "./reducers/animations";
import tabs from "./reducers/tabs";

export default combineReducers({
  settings: settings,
  animation: animation,
  tabs: tabs,
});
