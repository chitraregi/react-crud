import React from "react";
import ReactDOM from "react-dom";
import App from "./components/contacts";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
