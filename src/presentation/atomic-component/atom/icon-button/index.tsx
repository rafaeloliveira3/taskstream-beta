import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { FC } from "react";
import styles from "./styles.module.css";

type IconButtonProps = {
  customStyle?: string;
  Icon: React.ComponentType<SvgIconProps>;
};

export const IconButton: FC<IconButtonProps> = ({ Icon, customStyle }) => {
  console.log(customStyle);

  return (
    <button className={`${styles.button} ${customStyle}`}>
      <Icon className={styles.icon} />
    </button>
  );
};
