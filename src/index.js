import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./lib/fontAwesome";
import "@fontsource/poppins";
import "@fontsource/montserrat/800.css";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
