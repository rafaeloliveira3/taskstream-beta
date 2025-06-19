import { useState, type FC } from "react";
import "./App.css";
import { KanbanColumn } from "./presentation/atomic-component/molecules/";
import { Header } from "./presentation/atomic-component/organism/index";
import { KanbanMainTemplate } from "./presentation/atomic-component/template";
import { type Column, type Task } from "./types";

const initialColumnsData: Column[] = [
  {
    id: "col1",
    title: "Backlog",
    tasks: [
      {
        id: "task1",
        title: "Setup project structure",
        description: "Initialize React project with TypeScript and Tailwind.",
        status: "Backlog",
        dueDate: "2024-07-28",
      },
    ],
  },
  {
    id: "col2",
    title: "To do",
    tasks: [
      {
        id: "task2",
        title: "Implement Header component",
        description: "Create the main navigation header.",
        status: "To do",
        dueDate: "2024-07-29",
      },
      {
        id: "task3",
        title: "Develop Task Card UI",
        description: "Design the visual representation of a task.",
        status: "To do",
        dueDate: "2024-07-30",
      },
      {
        id: "task3",
        title: "Develop Task Card UI",
        description: "Design the visual representation of a task.",
        status: "To do",
        dueDate: "2024-07-30",
      },
      {
        id: "task3",
        title: "Develop Task Card UI",
        description: "Design the visual representation of a task.",
        status: "To do",
        dueDate: "2024-07-30",
      },
      {
        id: "task3",
        title: "Develop Task Card UI",
        description: "Design the visual representation of a task.",
        status: "To do",
        dueDate: "2024-07-30",
      },
      {
        id: "task3",
        title: "Develop Task Card UI",
        description: "Design the visual representation of a task.",
        status: "To do",
        dueDate: "2024-07-30",
      },
      {
        id: "task3",
        title: "Develop Task Card UI",
        description: "Design the visual representation of a task.",
        status: "To do",
        dueDate: "2024-07-30",
      },
      {
        id: "task3",
        title: "Develop Task Card UI",
        description: "Design the visual representation of a task.",
        status: "To do",
        dueDate: "2024-07-30",
      },
      {
        id: "task3",
        title: "Develop Task Card UI",
        description: "Design the visual representation of a task.",
        status: "To do",
        dueDate: "2024-07-30",
      },
      {
        id: "task3",
        title: "Develop Task Card UI",
        description: "Design the visual representation of a task.",
        status: "To do",
        dueDate: "2024-07-30",
      },
    ],
  },
  {
    id: "col3",
    title: "In Progress",
    tasks: [
      {
        id: "task4",
        title: "State management for tasks",
        description: "Handle adding, editing, and moving tasks.",
        status: "In Progress",
        dueDate: "2024-08-01",
      },
    ],
  },
  {
    id: "col4",
    title: "Done",
    tasks: [
      {
        id: "task5",
        title: "Initial UI styling",
        description: "Apply Tailwind CSS for basic layout and colors.",
        status: "Done",
        dueDate: "2024-07-27",
      },
    ],
  },
];

const App: FC = () => {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState<boolean>(false);
  const [newTaskModalColumnId, setNewTaskModalColumnId] = useState<
    string | null
  >(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleOpenNewTaskModal = (columnId: string | null = null) => {
    setNewTaskModalColumnId(columnId);
    setEditingTask(null); // Ensure not in edit mode
    setIsNewTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTaskModalColumnId(null); // Not tied to a specific column for adding
    setIsNewTaskModalOpen(true);
  };

  return (
    <>
      <Header />
      <KanbanMainTemplate>
        {initialColumnsData.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onAddTask={() => handleOpenNewTaskModal(column.id)}
            onEditTask={handleEditTask}
          />
        ))}
      </KanbanMainTemplate>
    </>
  );
};

export default App;
