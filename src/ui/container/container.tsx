import { FC, PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

export const Container: FC<ContainerProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};
