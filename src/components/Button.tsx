import * as React from "react";
import styles from "./button.module.css";

interface props {
  children: any;
  onClick?: () => void;
  testId?: string;
}

export const Button: React.FC<props> = ({
  children,
  onClick,
  testId = null,
}) => (
  <button data-testid={testId} className={styles.button} onClick={onClick}>
    {children}
  </button>
);
