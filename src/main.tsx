import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import GlobalContext from "./Components/GlobalContext/globalContext.tsx";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GlobalContext>
      <App />
    </GlobalContext>
  </BrowserRouter>
);
