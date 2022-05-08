import React from "react";
import ReactDOM from "react-dom";
import { Dapp } from "./components/Dapp";
import "./index.css";
import App from "./shared/App";
import { Provider } from "react-redux";
import store from "./redux/configureStore";

// We import bootstrap here, but you can remove if you want
// import "bootstrap/dist/css/bootstrap.css";

// This is the entry point of your application, but it just renders the Dapp
// react component. All of the logic is contained in it.

ReactDOM.render(
  <Provider store={store}>
    <App />
    {/* <Dapp /> */}
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
