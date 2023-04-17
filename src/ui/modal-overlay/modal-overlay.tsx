import { CloseButton } from "ui/close-button/close-button";
import { useAppDispatch } from "hooks/redux";
import { closeModal } from "store/modals-slice";
import classes from "./modal-overlay.module.scss";

interface ModalOverlayProps {
  children: JSX.Element;
}

export const ModalOverlay = ({ children }: ModalOverlayProps) => {
  const dispatch = useAppDispatch();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  return (
    <div className={classes.modal}>
      <CloseButton
        className={classes["close-button"]}
        onClick={closeModalHandler}
      />
      {children}
    </div>
  );
};
