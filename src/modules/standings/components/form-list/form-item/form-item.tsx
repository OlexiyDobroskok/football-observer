import classes from "./form-item.module.scss";
import { FormChar } from "modules/standings/api/types";

interface FormItemProps {
  formChar: FormChar;
}

export const FormItem = ({ formChar }: FormItemProps) => {
  const itemClass =
    formChar === "W"
      ? classes.win
      : formChar === "L"
      ? classes.loose
      : classes.draw;

  return <li className={itemClass}>{formChar}</li>;
};
