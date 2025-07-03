export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  columnId: number | null;
}
export interface Column {
  id: number;
  title: string;
  tasks: Task[];
}

export interface ColumnData {
  title: string;
  id: number;
}
