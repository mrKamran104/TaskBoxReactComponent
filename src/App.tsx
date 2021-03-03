import React from "react";
import "./App.css";
import PureInboxScreen from "./components/InboxScreen";
import { Provider } from "react-redux";
import store from "./store/redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PureInboxScreen />
      </Provider>
    </div>
  );
}

export default App;
