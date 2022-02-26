import { useState, useRef, useEffect } from "react";
import React from "react";
import { render } from "react-dom";
import "./index.css";
import { Store } from "webext-redux";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import "ninja-keys";
import "@material/mwc-icon";

const store = new Store({
  portName: "COUNTING",
});

const overlayStyle = {
  zIndex: 99999999,
};

const iconMsg = `<svg xmlns="http://www.w3.org/2000/svg" class="ninja-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
</svg>`;

export default function InjectApp(props) {
  const ninjaKeys = useRef(null);
  const [hotkeys, setHotkeys] = useState([
    {
      id: "Home",
      title: "Open Home",
      hotkey: "ctrl+H",
      icon: iconMsg,
      handler: () => {
        console.log("navigation to home");
      },
    },
    {
      id: "Open Projects",
      title: "Open Projects",
      hotkey: "ctrl+T",
      icon: iconMsg,
      handler: () => {
        console.log("navigation to projects");
      },
    },
    {
      id: "Theme",
      title: "Change theme...",
      icon: iconMsg,
      children: [
        {
          id: "Light Theme",
          title: "Change theme to Light",
          icon: iconMsg,
          handler: () => {
            console.log("theme light");
          },
        },
        {
          id: "Dark Theme",
          title: "Change theme to Dark",
          icon: iconMsg,
          keywords: "lol",
          handler: () => {
            console.log("theme dark");
          },
        },
      ],
    },
  ]);

  useEffect(() => {
    if (ninjaKeys.current) {
      ninjaKeys.current.data = hotkeys;
    }
  }, []);
  return (
    <div>
      <ninja-keys ref={ninjaKeys} style={overlayStyle}></ninja-keys>
      HELLLO! {props.currentTab}
      {props.actions}
      {props.settings.actions}
      {props.tabs.allTabs.length}
    </div>
  );
  /* } */
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    tabs: state.tabs,
    actions: state.actions,
    currentTab: state.currentTab,
    animation: state.animation,
    settings: state.settings,
  };
};

const ConnectedInjectApp = connect(mapStateToProps)(InjectApp);
const renderApp = () => {
  const injectDOM = document.createElement("div");
  injectDOM.className = "inject-react";
  injectDOM.style.textAlign = "center";
  document.body.appendChild(injectDOM);
  render(
    <Provider store={store}>
      <ConnectedInjectApp />
    </Provider>,
    injectDOM
  );
};
store.ready().then(() => {
  renderApp();
});
