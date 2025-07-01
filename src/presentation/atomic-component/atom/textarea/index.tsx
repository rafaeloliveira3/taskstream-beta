import type { FC } from "react";
import styles from "./styles.module.css";

type TextareaProps = {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const Textarea: FC<TextareaProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className={styles.container}>
      <textarea
        className={styles.input}
        placeholder={placeholder || "Digite aqui..."}
        value={value}
        onChange={onChange}
        rows={5}
      />
    </div>
  );
};
