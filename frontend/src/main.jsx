import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.jsx";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>  
        {/*<Home />*/}
        <App></App>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
