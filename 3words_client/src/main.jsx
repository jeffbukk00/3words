import React from "react";
import ReactDOM from "react-dom/client";

import { ModeContextProvider } from "./store/ModeContext";
import { AuthContextProvider } from "./store/AuthContext";

import App from "./components/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ModeContextProvider>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </ModeContextProvider>
);
