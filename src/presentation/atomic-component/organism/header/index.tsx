import type { FC } from "react";
import Logo from "@/assets/logo.png";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import styles from "./styles.module.css";
import { IconButton } from "../../atom";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div>
        <img src={Logo} alt="" />
      </div>
      <div className={styles.buttonsContainer}>
        <IconButton Icon={WbSunnyOutlinedIcon} />
        <IconButton Icon={SettingsOutlinedIcon} />
      </div>
    </header>
  );
};
