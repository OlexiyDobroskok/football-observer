import { createPortal } from "react-dom";
import { Backdrop } from "ui/Backdrop/Backdrop";
import { ModalOverlay } from "ui/ModalOverlay/ModalOverlay";
import { SearchLeague } from "modules/leagues-filter/components/SearchLeague/SearchLeague";

export const SearchModal = () => (
  <>
    {createPortal(
      <Backdrop />,
      document.getElementById("root-backdrop") as HTMLDivElement
    )}
    {createPortal(
      <ModalOverlay children={<SearchLeague />} />,
      document.getElementById("root-overlay") as HTMLDivElement
    )}
  </>
);
