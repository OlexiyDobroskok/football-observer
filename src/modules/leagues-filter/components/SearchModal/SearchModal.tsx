import { createPortal } from "react-dom";
import { Backdrop } from "ui/Backdrop/Backdrop";
import { ModalOverlay } from "ui/ModalOverlay/ModalOverlay";
import { LeagueSearchPlace } from "../LeagueSearchPlace/LeagueSearchPlace";

export const SearchModal = () => (
  <>
    {createPortal(
      <Backdrop />,
      document.getElementById("root-backdrop") as HTMLDivElement
    )}
    {createPortal(
      <ModalOverlay>
        <LeagueSearchPlace />
      </ModalOverlay>,
      document.getElementById("root-overlay") as HTMLDivElement
    )}
  </>
);
