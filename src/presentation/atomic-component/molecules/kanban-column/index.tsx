import AddIcon from "@mui/icons-material/Add";
import { type FC } from "react";
import { type Column, type Task } from "../../../../types";
import { TaskCard } from "../task-card";
import styles from "./styles.module.css";

interface KanbanColumnProps {
  column: Column;
  onAddTask: (columnId: number) => void;
  onEditTask: (task: Task) => void;
}

export const KanbanColumn: FC<KanbanColumnProps> = ({
  column,
  onAddTask,
  onEditTask,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{column.title}</h3>
        <button
          onClick={() => onAddTask(column.id)}
          className={styles.addButton}
          aria-label="Adicionar tarefa"
        >
          <AddIcon className={styles.addIcon} />
        </button>
      </div>
      <div className={styles.taskList}>
        {column.tasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} onEditTask={onEditTask} />
        ))}
        {column.tasks.length === 0 && (
          <p className={styles.emptyMessage}>Nenhuma task Encontrada</p>
        )}
      </div>
    </div>
  );
};
