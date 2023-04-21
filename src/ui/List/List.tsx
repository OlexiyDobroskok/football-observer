import classes from "./List.module.scss";
import { ReactNode } from "react";

interface ListProps<T> {
  listItems: T[];
  renderItem: (item: T) => ReactNode;
  className?: string;
}

export const List = <T extends unknown>({
  listItems,
  renderItem,
  className,
}: ListProps<T>) => {
  return (
    <ul className={[classes.list, className].join(" ")}>
      {listItems.map(renderItem)}
    </ul>
  );
};
