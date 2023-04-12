import { v4 as uuidv4 } from "uuid";

export interface ColumnHeading {
  id: string;
  head: string;
}

export const tableHeaders: ColumnHeading[] = [
  {
    id: uuidv4(),
    head: "P",
  },
  {
    id: uuidv4(),
    head: "Team",
  },
  {
    id: uuidv4(),
    head: "GM",
  },
  {
    id: uuidv4(),
    head: "GD",
  },
  {
    id: uuidv4(),
    head: "Pts",
  },
  {
    id: uuidv4(),
    head: "Form",
  },
];
