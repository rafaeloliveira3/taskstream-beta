import type { FC } from "react";
import styles from "./styles.module.css";

type InputProps = {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder || "Digite aqui..."}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
