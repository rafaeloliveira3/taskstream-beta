import type { FC, JSX } from "react";
import styles from "./styles.module.css";

type ButtonProps = JSX.IntrinsicElements["button"] & {
  text: string;
};

export const Button: FC<ButtonProps> = ({ onClick, text, type }) => {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};
