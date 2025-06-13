import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { FC } from "react";
import styles from "./styles.module.css";

type IconButtonProps = {
  Icon: React.ComponentType<SvgIconProps>;
};

export const IconButton: FC<IconButtonProps> = ({ Icon }) => {
  return (
    <button className={styles.button}>
      <Icon className={styles.icon} />
    </button>
  );
};
