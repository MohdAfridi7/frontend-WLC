import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Toaster } from "react-hot-toast"
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
           {/* 🔥 GLOBAL TOASTER */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f1b4b",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#facc15",
              secondary: "#000",
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);