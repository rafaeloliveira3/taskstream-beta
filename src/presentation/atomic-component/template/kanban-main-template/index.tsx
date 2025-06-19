import AddIcon from "@mui/icons-material/Add";
import type { FC } from "react";
import { IconButton } from "../../atom";
import { NavBar } from "../../organism";
import styles from "./styles.module.css";

type KanbanMainTemplateProps = {
  children: React.ReactNode;
};

export const KanbanMainTemplate: FC<KanbanMainTemplateProps> = ({
  children,
}) => {
  return (
    <main className={styles.container}>
      <NavBar />
      <div className={styles.content}>
        {children}
        <div>
          <IconButton Icon={AddIcon} customStyle={styles.addButton} />
        </div>
      </div>
    </main>
  );
};
