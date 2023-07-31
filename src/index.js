import React from "react";
import ReactDOM from "react-dom";
import App from "src/app";
import registerServiceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("src/app", () => {
    const NextApp = require("src/app").default;
    ReactDOM.render(<NextApp />, document.getElementById("root"));
  });
}
registerServiceWorker();
