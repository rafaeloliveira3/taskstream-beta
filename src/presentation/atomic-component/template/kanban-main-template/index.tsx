import type { FC } from "react";
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
      {children}
    </main>
  );
};
