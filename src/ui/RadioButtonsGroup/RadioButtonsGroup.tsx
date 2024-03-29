import { ChangeEvent } from "react";
import { HiddenElement } from "../HiddenElement/HiddenElement";
import classes from "./RadioButtonsGroup.module.scss";

export interface RadioButtonsGroupProps {
  groupName: string;
  buttonNames: string[];
  selectedButton: string | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButtonsGroup = ({
  groupName,
  buttonNames,
  selectedButton,
  onChange,
}: RadioButtonsGroupProps) => {
  const toggleButtonGroup = buttonNames.map((buttonName) => {
    const isSelected = selectedButton === buttonName;

    return (
      <label
        key={buttonName}
        className={[classes.button, isSelected && classes.selected].join(" ")}
      >
        <HiddenElement>
          <input
            type="radio"
            name={groupName}
            value={buttonName}
            checked={isSelected}
            onChange={onChange}
          />
        </HiddenElement>
        {buttonName}
      </label>
    );
  });

  return <div className={classes.buttonGroup}>{toggleButtonGroup}</div>;
};
