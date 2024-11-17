import React from "react";
import ReactDOM from "react-dom/client";
import { CarProvider } from "./components/CarsContext.jsx";
import App from "./App.jsx";
import { FormDataProvider } from "./components/FormDataContext.jsx";
import "./index.css";
import { CartProvider } from "./components/CartContext.jsx";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
Modal.setAppElement("#root");
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <FormDataProvider>
        <CarProvider>
          <App />
          <ToastContainer />
        </CarProvider>
      </FormDataProvider>
    </CartProvider>
  </React.StrictMode>,
);
