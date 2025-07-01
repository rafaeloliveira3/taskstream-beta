import AddIcon from "@mui/icons-material/Add";
import type { FC } from "react";
import { IconButton } from "../../atom";
import { NavBar } from "../../organism";
import styles from "./styles.module.css";

type KanbanMainTemplateProps = {
  children: React.ReactNode;
  onOpenNewTaskModal?: () => void;
  onPressAddButton?: () => void;
};

export const KanbanMainTemplate: FC<KanbanMainTemplateProps> = ({
  children,
  onOpenNewTaskModal,
  onPressAddButton,
}) => {
  return (
    <main className={styles.container}>
      <NavBar openModal={onOpenNewTaskModal} />
      <div className={styles.content}>
        {children}
        <div>
          <IconButton
            onClick={onPressAddButton}
            Icon={AddIcon}
            customStyle={styles.addButton}
          />
        </div>
      </div>
    </main>
  );
};
