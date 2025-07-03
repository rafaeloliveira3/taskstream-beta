import { useCallback, useEffect, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import {
  createColumn,
  deleteColumn,
  getColumns,
  getColumnsNames,
} from "../../../api/column";
import { createTask, deleteTask, editTask } from "../../../api/task";
import { type Column, type ColumnData, type Task } from "../../../types";
import { Button } from "../../atomic-component/atom";
import { KanbanColumn } from "../../atomic-component/molecules/";
import {
  BaseModal,
  ColumnForm,
  Header,
  TaskForm,
} from "../../atomic-component/organism/";
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
  const [isCreateColumnModalOpen, setIsCreateColumnModalOpen] =
    useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [newTaskModalColumnId, setNewTaskModalColumnId] = useState<
    number | null
  >(null);
  const [toDeleteColumn, setToDeleteColumn] = useState<ColumnData | null>(null);
  const [isDeleteColumnModalOpen, setIsDeleteColumnModalOpen] =
    useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [initialColumnsData, setInitialColumnsData] = useState<Column[]>([]);
  const [columns, setColumns] = useState<ColumnData[]>([]);

  const [reload, setReload] = useState<boolean>(true);

  useEffect(() => {
    const fetchColumns = async () => {
      if (reload) {
        if (id) {
          const columns = await getColumns(id);
          const columnsData = await getColumnsNames(id);

          setInitialColumnsData(columns || []);
          setColumns(columnsData || []);
        }
        setReload(false);
      }
    };
    fetchColumns();
  }, [reload]);

  const handleOpenNewTaskModal = (columnId: number | null = null) => {
    setNewTaskModalColumnId(columnId);
    setEditingTask(null);
    setIsNewTaskModalOpen(true);
  };
  const handleOpenDeleteColumnModal = (columnId: number | null = null) => {
    setToDeleteColumn(columns.find((column) => column.id === columnId) || null);
    setIsDeleteColumnModalOpen(true);
  };
  const handleSaveTask = async (task: Omit<Task, "id" | "columnId">) => {
    const columnId = columns.find((column) => column.title === task.status)?.id;
    if (editingTask) {
      await editTask({
        ...task,
        columnId: columnId || null,
        id: editingTask.id,
      });
    } else {
      await createTask({
        ...task,
        columnId: columnId || null,
      });
    }
    setIsNewTaskModalOpen(false);
    setReload(true);
  };
  const handleDeleteTask = async (taskId: string) => {
    if (editingTask) {
      await deleteTask(taskId);
    }
    setIsNewTaskModalOpen(false);
    setReload(true);
  };

  const handleSaveColumn = async (column: Omit<Column, "id">) => {
    await createColumn(column);
    setIsCreateColumnModalOpen(false);
    setReload(true);
  };
  const handleDeleteColumn = async (columnId: number | null) => {
    if (!columnId) return;
    await deleteColumn(columnId);
    setIsDeleteColumnModalOpen(false);
    setReload(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTaskModalColumnId(null);
    setIsNewTaskModalOpen(true);
  };

  const getInitialStatusForModal = useCallback(() => {
    if (editingTask)
      return columns.find((column) => column.title === editingTask.status);

    if (newTaskModalColumnId) {
      return columns.find((column) => column.id === newTaskModalColumnId);
    }
    return columns[0];
  }, [newTaskModalColumnId, editingTask]);

  return (
    <>
      <Header />
      <KanbanMainTemplate
        onOpenNewTaskModal={() => handleOpenNewTaskModal(null)}
        onPressAddButton={() => setIsCreateColumnModalOpen(true)}
      >
        {initialColumnsData.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onAddTask={() => handleOpenNewTaskModal(column.id)}
            onDeleteColumn={() => handleOpenDeleteColumnModal(column.id)}
            onEditTask={handleEditTask}
          />
        ))}
        <BaseModal
          isOpen={isNewTaskModalOpen}
          onClose={() => {
            setIsNewTaskModalOpen(false);
            setEditingTask(null);
            setReload(true);
            setNewTaskModalColumnId(null);
          }}
          title={editingTask ? "Editar Tarefa" : "Nova Tarefa"}
        >
          <TaskForm
            onSave={handleSaveTask}
            setReset={setReload}
            reset={reload}
            columns={columns}
            initialStatus={getInitialStatusForModal()}
            taskToEdit={editingTask}
            onDelete={handleDeleteTask}
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
        <BaseModal
          isOpen={isCreateColumnModalOpen}
          onClose={() => setIsCreateColumnModalOpen(false)}
          title="Criar Coluna"
        >
          <ColumnForm
            onSave={handleSaveColumn}
            onCancel={() => setIsCreateColumnModalOpen(false)}
          />
        </BaseModal>
        <BaseModal
          isOpen={isDeleteColumnModalOpen}
          onClose={() => setIsDeleteColumnModalOpen(false)}
          title="Excluir Coluna"
        >
          <p>Deseja mesmo excluir a coluna {toDeleteColumn?.title}?</p>
          <Button
            text="Confirmar"
            onClick={() => handleDeleteColumn(toDeleteColumn?.id || null)}
          />
          <Button
            text="Cancelar"
            onClick={() => setIsDeleteColumnModalOpen(false)}
          />
        </BaseModal>
      </KanbanMainTemplate>
    </>
  );
};
