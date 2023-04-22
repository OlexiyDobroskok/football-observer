import { CloseButton } from "ui/CloseButton/CloseButton";
import { useAppDispatch } from "hooks/redux";
import { closeModal } from "store/modals-slice";
import classes from "./ModalOverlay.module.scss";

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
      <div className={classes["close-button"]}>
        <CloseButton onClick={closeModalHandler} />
      </div>
      {children}
    </div>
  );
};
