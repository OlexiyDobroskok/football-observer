import { ReactNode } from "react";

export interface ContainerProps {
  className?: string;
  children: ReactNode;
}

export const Container = ({ className, children }: ContainerProps) => (
  <div className={className}>{children}</div>
);
