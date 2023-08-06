import ReactDOM from "react-dom/client";
import ReactModal from "react-modal";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import { IsOffline } from "./components";
import "./index.css";
import "./css/toastify.css";

ReactModal.setAppElement("#root");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<IsOffline />}>
        <Route path="/*" element={<App />} />
      </Route>
    </Routes>
    <ToastContainer theme="colored" bodyClassName="toastBody" />
  </BrowserRouter>
);