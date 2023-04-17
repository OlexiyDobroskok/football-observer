import classes from "./form-list.module.scss";
import { List } from "ui/list/list";
import { FormItem } from "modules/standings/components/form-list/form-item/form-item";
import { TeamForm } from "modules/standings/api/types";

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
