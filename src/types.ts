export const TaskStatusArray = [
  "Backlog",
  "To do",
  "In Progress",
  "Done",
] as const;
export type TaskStatus = (typeof TaskStatusArray)[number];

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}
export interface Column {
  id: number;
  title: TaskStatus;
  tasks: Task[];
}
