interface SvgIconProps {
  className?: string;
  href: string;
}

export const SvgIcon = ({ className, href }: SvgIconProps) => (
  <svg className={className}>
    <use href={href} />
  </svg>
);
