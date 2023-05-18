import { CloseButton } from "ui/CloseButton/CloseButton";
import { useAppDispatch } from "hooks/redux";
import { closeModal } from "store/modals-slice";
import classes from "./ModalOverlay.module.scss";
import { useEffect } from "react";

interface ModalOverlayProps {
  children: JSX.Element;
}

export const ModalOverlay = ({ children }: ModalOverlayProps) => {
  const dispatch = useAppDispatch();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;
    body.classList.add(classes.hiddenScroll);

    return () => body.classList.remove(classes.hiddenScroll);
  }, []);

  return (
    <div className={classes.modal}>
      <div className={classes.closeButton}>
        <CloseButton onClick={closeModalHandler} />
      </div>
      {children}
    </div>
  );
};
