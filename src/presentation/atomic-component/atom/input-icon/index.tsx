import React from "react";
import type { FC } from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import styles from "./styles.module.css";

type InputIconProps = {
  Icon: React.ComponentType<SvgIconProps>;
  placeholder?: string;
};

export const InputIcon: FC<InputIconProps> = ({ Icon, placeholder }) => {
  return (
    <div className={styles.inputContainer}>
      <input type="text" className={styles.input} placeholder={placeholder} />
      <Icon fontSize="inherit" className={styles.icon} />
    </div>
  );
};
