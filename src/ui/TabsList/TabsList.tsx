import { Tab, TabProps } from "../Tab/Tab";
import classes from "./TabsList.module.scss";

export interface TabsListProps extends Omit<TabProps, "tabName" | "isChecked"> {
  tabs: string[];
  checkedTab: string | undefined;
}

export const TabsList = ({
  tabs,
  groupName,
  checkedTab,
  onChange,
}: TabsListProps) => {
  const tabList = tabs.map((tabName) => (
    <Tab
      key={tabName}
      tabName={tabName}
      groupName={groupName}
      isChecked={checkedTab === tabName}
      onChange={onChange}
    />
  ));

  return <div className={classes.tabsList}>{tabList}</div>;
};
