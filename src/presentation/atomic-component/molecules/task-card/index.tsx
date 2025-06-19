import React from "react";
import { type Task, type TaskStatus } from "../../../../types";
import styles from "./styles.module.css";

interface TaskCardProps {
  task: Task;
  onEditTask: (task: Task) => void;
}

const getStatusClass = (status: TaskStatus): string => {
  switch (status) {
    case "Backlog":
      return styles.badgeBacklog;
    case "To do":
      return styles.badgeTodo;
    case "In Progress":
      return styles.badgeInProgress;
    case "Done":
      return styles.badgeDone;
    default:
      return "";
  }
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEditTask }) => {
  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate + "T00:00:00").toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    : "No due date";

  return (
    <div
      className={styles.card}
      onClick={() => onEditTask(task)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onEditTask(task)}
    >
      <h4 className={styles.title}>{task.title}</h4>
      <p className={styles.description}>{task.description}</p>
      <div className={styles.divider}></div>
      <div className={styles.info}>
        <div className={styles.infoRow}>
          <span className={styles.statusLabel}>Status:</span>
          <span className={`${styles.badge} ${getStatusClass(task.status)}`}>
            {task.status}
          </span>
        </div>
        <div className={styles.dueDate}>Due Date: {formattedDueDate}</div>
      </div>
    </div>
  );
};
