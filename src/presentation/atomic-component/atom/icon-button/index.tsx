import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { FC } from "react";
import styles from "./styles.module.css";

type IconButtonProps = {
  customStyle?: string;
  onClick?: () => void;
  Icon: React.ComponentType<SvgIconProps>;
};

export const IconButton: FC<IconButtonProps> = ({
  Icon,
  customStyle,
  onClick,
}) => {
  console.log(customStyle);

  return (
    <button onClick={onClick} className={`${styles.button} ${customStyle}`}>
      <Icon className={styles.icon} />
    </button>
  );
};
