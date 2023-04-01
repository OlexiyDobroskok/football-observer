import { FC } from "react";

interface SvgIconProps {
  className?: string;
  href: string;
}

export const SvgIcon: FC<SvgIconProps> = ({ className, href }) => {
  return (
    <svg className={className}>
      <use href={href} />
    </svg>
  );
};
