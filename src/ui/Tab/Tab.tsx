import { ChangeEvent } from "react";
import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import classes from "./Tab.module.scss";

export interface TabProps {
  tabName: string;
  groupName: string;
  isChecked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Tab = ({ tabName, groupName, isChecked, onChange }: TabProps) => (
  <label
    className={[classes.tab, isChecked && classes.selected].join(" ")}
    key={tabName}
  >
    {tabName}
    <HiddenElement>
      <input
        type="radio"
        name={groupName}
        value={tabName}
        checked={isChecked}
        onChange={onChange}
      />
    </HiddenElement>
  </label>
);
