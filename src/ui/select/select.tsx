import { ChangeEvent } from "react";
import classes from "./select.module.scss";

export interface SelectOption {
  title: string;
  value: string;
}

interface SelectProps {
  name: string;
  optList: SelectOption[];
  selected: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export const Select = ({
  name,
  optList,
  selected,
  className,
  onChange,
}: SelectProps) => (
  <select
    className={[classes.select, className].join(" ")}
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
