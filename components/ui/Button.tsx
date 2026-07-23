import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  variant?: "primary" | "secondary" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  size = "md",
  className,
  ...buttonProps
}: ButtonProps) {
  const classes = [styles.button, styles[size], styles[variant], className].filter(Boolean).join(" ");
  return <button className={classes} {...buttonProps} />;
}
