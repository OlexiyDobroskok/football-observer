import { FC } from "react";
import classes from "./form-item.module.scss";
import { FormChar } from "modules/standings/types/types";

interface FormItemProps {
  formChar: FormChar;
}

export const FormItem: FC<FormItemProps> = ({ formChar }) => {
  const itemClass =
    formChar === "W"
      ? classes.win
      : formChar === "L"
      ? classes.loose
      : classes.draw;

  return <li className={itemClass}>{formChar}</li>;
};