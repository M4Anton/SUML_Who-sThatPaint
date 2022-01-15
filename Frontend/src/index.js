import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserContextProvider, AppContextProvider } from "./Context";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
