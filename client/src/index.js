// This is the main client side javascript file. It is responsible for serving the App.js jsx object to the index.html file (into the root div to be exact).
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
