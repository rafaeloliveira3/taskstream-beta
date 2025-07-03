import { useCallback, useEffect, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import { getColumns } from "../../../api/column";
import {
  TaskStatusArray,
  type Column,
  type Task,
  type TaskStatus,
} from "../../../types";
import { Button } from "../../atomic-component/atom";
import { KanbanColumn } from "../../atomic-component/molecules/";
import { BaseModal, Header, TaskForm } from "../../atomic-component/organism/";
import { KanbanMainTemplate } from "../../atomic-component/template";

// const initialColumnsData: Column[] = [
//   {
//     id: 0,
//     title: "Backlog",
//     tasks: [
//       {
//         id: "task1",
//         title: "Setup project structure",
//         description: "Initialize React project with TypeScript and Tailwind.",
//         status: "Backlog",
//         dueDate: "2024-07-28",
//       },
//     ],
//   },
//   {
//     id: 1,
//     title: "To do",
//     tasks: [
//       {
//         id: "task2",
//         title: "Implement Header component",
//         description: "Create the main navigation header.",
//         status: "To do",
//         dueDate: "2024-07-29",
//       },
//       {
//         id: "task3",
//         title: "Develop Task Card UI",
//         description: "Design the visual representation of a task.",
//         status: "To do",
//         dueDate: "2024-07-30",
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "In Progress",
//     tasks: [
//       {
//         id: "task4",
//         title: "State management for tasks",
//         description: "Handle adding, editing, and moving tasks.",
//         status: "In Progress",
//         dueDate: "2024-08-01",
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "Done",
//     tasks: [
//       {
//         id: "task5",
//         title: "Initial UI styling",
//         description: "Apply Tailwind CSS for basic layout and colors.",
//         status: "Done",
//         dueDate: "2024-07-27",
//       },
//     ],
//   },
// ];

export const KanbanScreen: FC = () => {
  const { id } = useParams();
  console.log("Project ID:", id);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [newTaskModalColumnId, setNewTaskModalColumnId] = useState<
    number | null
  >(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [initialColumnsData, setInitialColumnsData] = useState<Column[]>([]);

  useEffect(() => {
    const fetchColumns = async () => {
      if (id) {
        const columns = await getColumns(id);

        setInitialColumnsData(columns || []);
      }
    };
    fetchColumns();
  }, []);

  console.log(editingTask, isNewTaskModalOpen, newTaskModalColumnId);

  const handleOpenNewTaskModal = (columnId: number | null = null) => {
    setNewTaskModalColumnId(columnId);
    setEditingTask(null);
    setIsNewTaskModalOpen(true);
  };
  const handleSaveTask = (task: Task) => {
    console.log("Task saved:", task);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTaskModalColumnId(null);
    setIsNewTaskModalOpen(true);
  };

  const getInitialStatusForModal = useCallback((): TaskStatus => {
    if (editingTask) return editingTask.status;
    if (newTaskModalColumnId) {
      return TaskStatusArray[newTaskModalColumnId];
    }
    return TaskStatusArray[0];
  }, [newTaskModalColumnId, editingTask]);

  return (
    <>
      <Header />
      <KanbanMainTemplate
        onOpenNewTaskModal={() => handleOpenNewTaskModal(null)}
        onPressAddButton={() => setIsLoginModalOpen(true)}
      >
        {initialColumnsData.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onAddTask={() => handleOpenNewTaskModal(column.id)}
            onEditTask={handleEditTask}
          />
        ))}
        <BaseModal
          isOpen={isNewTaskModalOpen}
          onClose={() => {
            setIsNewTaskModalOpen(false);
            setEditingTask(null);
            setNewTaskModalColumnId(null);
          }}
          title={editingTask ? "Editar Tarefa" : "Nova Tarefa"}
        >
          <TaskForm
            onSave={() => handleSaveTask}
            onCancel={() => {
              setIsNewTaskModalOpen(false);
              setEditingTask(null);
              setNewTaskModalColumnId(null);
            }}
            initialStatus={getInitialStatusForModal()}
            taskToEdit={editingTask}
          />
        </BaseModal>
        <BaseModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          title="Fazer Login"
        >
          <p>Faça login para editar as configurações do seu projeto</p>
          <Button
            text="Fazer Login"
            onClick={() => setIsLoginModalOpen(false)}
          />
        </BaseModal>
      </KanbanMainTemplate>
    </>
  );
};
