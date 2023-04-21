import classes from "./FormList.module.scss";
import { List } from "ui/List/List";
import { FormItem } from "modules/standings/components/FormList/FormItem/FormItem";
import { TeamForm } from "modules/standings/types/types";

export interface FormListProps {
  formList: TeamForm[];
  formLimit?: number;
}

export const FormList = ({ formList, formLimit }: FormListProps) => {
  const listItems = !formLimit ? formList : formList.slice(0, formLimit);

  return (
    <List
      className={classes.list}
      listItems={listItems}
      renderItem={({ id, result }) => <FormItem key={id} formChar={result} />}
    />
  );
};
