import React from "react";
import {render} from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import App from "./components/App.jsx";



const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

render(<Router>
  <Routes>
    <Route
      path="/*"
      element={<App />}
    />
  </Routes>
</Router>, root)