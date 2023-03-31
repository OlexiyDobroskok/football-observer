import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "styles/index.scss";
import { App } from "src/app";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
