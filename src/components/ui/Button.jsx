import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "bg-navy text-ivory hover:shadow-elevated",
  peach: "bg-peach text-navy hover:shadow-elevated",
  ghost: "bg-transparent text-navy shadow-[inset_0_0_0_1.4px_rgba(15,33,64,.2)] hover:bg-navy/5",
  ivory: "bg-ivory text-navy hover:shadow-elevated",
  world: "bg-world text-white hover:shadow-elevated",
};

const SIZES = {
  sm: "px-[18px] py-[10px] text-[0.83rem]",
  md: "px-[26px] py-[15px] text-[0.94rem]",
  lg: "px-[34px] py-[18px] text-[1rem]",
};

/**
 * Shared pill-shaped CTA button matching the client reference's `.btn` system.
 * Renders a react-router <Link> when `to` is given, a plain <a> when `href`
 * is given, otherwise a native <button>.
 */
const Button = ({
  as,
  to,
  href,
  variant = "primary",
  size = "md",
  block = false,
  disabled = false,
  className = "",
  children,
  ...rest
}) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold
    shadow-card transition-all duration-300 ease-out
    hover:-translate-y-0.5 active:translate-y-0
    ${VARIANTS[variant] || VARIANTS.primary}
    ${SIZES[size] || SIZES.md}
    ${block ? "w-full" : ""}
    ${disabled ? "opacity-40 pointer-events-none" : ""}
    ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const Component = as || "button";
  return (
    <Component className={classes} disabled={disabled} {...rest}>
      {children}
    </Component>
  );
};

export default Button;
