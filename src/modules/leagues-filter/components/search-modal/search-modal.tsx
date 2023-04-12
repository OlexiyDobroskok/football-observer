import { createPortal } from "react-dom";
import { Backdrop } from "ui/backdrop/backdrop";
import { ModalOverlay } from "ui/modal-overlay/modal-overlay";
import { SearchLeague } from "modules/leagues-filter/components/search-league/search-league";

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
