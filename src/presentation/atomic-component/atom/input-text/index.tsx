import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import styles from "./styles.module.css";
import EditIcon from "@mui/icons-material/Edit";

type TextInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput: FC<TextInputProps> = ({ value, onChange }) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState<number>(1);

  useEffect(() => {
    if (spanRef.current) {
      const newWidth = spanRef.current.offsetWidth + 3; // margem extra
      setInputWidth(newWidth);
    }
  }, [value]);

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={onChange}
        style={{ width: inputWidth + 10 }}
        maxLength={60}
      />
      <span ref={spanRef} className={styles.mirror}>
        {value || " "}
      </span>
      <EditIcon className={styles.icon} fontSize="inherit" />
    </div>
  );
};
