import type { FC } from "react";
import styles from "./styles.module.css";

type InputDateProps = {
  value: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputDate: FC<InputDateProps> = ({ value, onChange, label }) => {
  return (
    <div className={styles.container}>
      <label htmlFor="task-duedate">{label}</label>
      <input
        className={styles.input}
        type="date"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
