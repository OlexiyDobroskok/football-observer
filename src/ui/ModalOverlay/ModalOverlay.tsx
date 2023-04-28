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
    body.classList.add(classes["scroll-hidden"]);

    return () => body.classList.remove(classes["scroll-hidden"]);
  }, []);

  return (
    <div className={classes.modal}>
      <div className={classes["close-button"]}>
        <CloseButton onClick={closeModalHandler} />
      </div>
      {children}
    </div>
  );
};
