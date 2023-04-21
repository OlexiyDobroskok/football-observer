import classes from "./FormList.module.scss";
import { List } from "ui/List/List";
import { FormItem } from "modules/standings/components/FormList/FormItem/FormItem";
import { TeamForm } from "modules/standings/types/types";

interface FormListProps {
  formList: TeamForm[];
  limit?: number;
}

export const FormList = ({ formList, limit }: FormListProps) => {
  const listItems = !limit ? formList : formList.slice(0, limit);

  return (
    <List
      className={classes.list}
      listItems={listItems}
      renderItem={({ id, result }) => <FormItem key={id} formChar={result} />}
    />
  );
};
