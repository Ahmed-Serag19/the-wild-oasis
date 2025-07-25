import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CabinFormsProvider } from "./context/cabin-form/CabinFormsProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CabinFormsProvider>
      <App />
    </CabinFormsProvider>
  </React.StrictMode>
);

