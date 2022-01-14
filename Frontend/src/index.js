import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserContext from "./Context";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    {/* <UserContext> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </UserContext> */}
  </React.StrictMode>,
  document.getElementById("root")
);
