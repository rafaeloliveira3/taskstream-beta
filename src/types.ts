export type TaskStatus = "Backlog" | "To do" | "In Progress" | "Done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}
export interface Column {
  id: string;
  title: TaskStatus;
  tasks: Task[];
}
