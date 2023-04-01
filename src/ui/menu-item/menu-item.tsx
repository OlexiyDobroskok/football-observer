import { NavLink } from "react-router-dom";
import { FC, PropsWithChildren } from "react";
import { PagePaths } from "types/types";

interface MenuItemProps extends PropsWithChildren {
  linkPath: PagePaths;
  className?: string;
}

export const MenuItem: FC<MenuItemProps> = ({
  linkPath,
  className,
  children,
}) => {
  return (
    <li className={className}>
      <NavLink to={linkPath}>{children}</NavLink>
    </li>
  );
};
