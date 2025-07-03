import type { FC } from "react";
import type { ColumnData } from "../../../../types";
import styles from "./styles.module.css";

type SelectGroupProps = {
  value: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: ColumnData[];
};

export const SelectGroup: FC<SelectGroupProps> = ({
  value,
  onChange,
  label,
  options = [],
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor="task-status">{label}</label>
      <select
        className={styles.input}
        id="task-status"
        value={value}
        onChange={onChange}
      >
        {options.map((s) => (
          <option key={s.id} value={s.title}>
            {s.title}
          </option>
        ))}
      </select>
    </div>
  );
};
