import { ChangeEvent } from "react";
import classes from "./Select.module.scss";

export interface SelectOption {
  title: string;
  value: string;
}

interface SelectProps {
  name: string;
  optList: SelectOption[];
  selected: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = ({ name, optList, selected, onChange }: SelectProps) => (
  <select
    className={classes.select}
    name={name}
    value={selected}
    onChange={onChange}
  >
    {optList.map(({ title, value }) => (
      <option key={value} value={value}>
        {title}
      </option>
    ))}
  </select>
);
