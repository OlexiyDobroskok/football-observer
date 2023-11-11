import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "styles/index.scss";
import { AppRouter } from "./AppRouter";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
