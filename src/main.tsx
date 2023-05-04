import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "styles/index.scss";
import { AppRoute } from "./AppRoute";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AppRoute />
  </StrictMode>
);
