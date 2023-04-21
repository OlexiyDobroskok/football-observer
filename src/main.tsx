import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "styles/index.scss";
import { AppRoute } from "src/AppRoute";

ReactDOM.createRoot(document.getElementById("Root") as HTMLElement).render(
  <StrictMode>
    <AppRoute />
  </StrictMode>
);
