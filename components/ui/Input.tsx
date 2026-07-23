"use client";

import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputProps = {
  label?: string;
} & Pick<InputHTMLAttributes<HTMLInputElement>, "placeholder" | "type" | "disabled" | "name" | "value" | "onChange" | "required">;

export default function Input({ label, disabled = false, type = "text", ...inputProps }: InputProps) {
  return (
    <label className={styles.field} data-disabled={disabled}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <input className={styles.input} type={type} disabled={disabled} {...inputProps} />
    </label>
  );
}
