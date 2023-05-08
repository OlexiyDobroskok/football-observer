import { Tab, TabProps } from "../Tab/Tab";
import classes from "./TabList.module.scss";

export interface TabListProps extends Omit<TabProps, "tabName" | "isChecked"> {
  tabs: string[];
  checkedTab: string;
}

export const TabList = ({
  tabs,
  groupName,
  checkedTab,
  onChange,
}: TabListProps) => {
  const tabList = tabs.map((tabName) => (
    <Tab
      key={tabName}
      tabName={tabName}
      groupName={groupName}
      isChecked={checkedTab === tabName}
      onChange={onChange}
    />
  ));

  return <div className={classes["tabs-group"]}>{tabList}</div>;
};
