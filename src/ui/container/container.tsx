interface ContainerProps {
  className?: string;
  children: JSX.Element | JSX.Element[];
}

export const Container = ({ className, children }: ContainerProps) => (
  <div className={className}>{children}</div>
);
