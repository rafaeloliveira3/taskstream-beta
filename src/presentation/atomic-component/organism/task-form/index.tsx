import { useEffect, useState, type FC } from "react";
import { type ColumnData, type Task } from "../../../../types";
import { Button, Input, InputDate, SelectGroup, Textarea } from "../../atom";
import styles from "./styles.module.css";

interface TaskFormProps {
  onSave: (task: Omit<Task, "id" | "columnId">) => void;
  reset: boolean;
  setReset: (value: boolean) => void;
  initialStatus?: ColumnData;
  taskToEdit?: Task | null;
  columns?: ColumnData[];
  onDelete: (taskId: string) => void;
}

export const TaskForm: FC<TaskFormProps> = ({
  onSave,
  initialStatus,
  taskToEdit,
  columns,
  reset = false,
  setReset,
  onDelete,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<string>(initialStatus?.title || "");

  const formattedDate = taskToEdit?.dueDate
    ? new Date(taskToEdit.dueDate).toISOString().split("T")[0]
    : "";

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(formattedDate);
      setStatus(taskToEdit.status);
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus(initialStatus?.title || "");
    }
  }, [taskToEdit, initialStatus]);

  useEffect(() => {
    if (reset) {
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus(initialStatus?.title || "");
      setReset(false);
    }
  }, [reset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Titulo é obrigatório.");
      return;
    }
    if (!description.trim()) {
      alert("Descrição é obrigatório.");
      return;
    }
    if (!dueDate.trim()) {
      alert("Data é obrigatório.");
      return;
    }
    if (!status.trim()) {
      alert("Status é obrigatório.");
      return;
    }
    onSave({ title, description, dueDate, status });
  };
  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    onDelete(taskToEdit?.id || "");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputsContainer}>
        <div>
          <Input
            value={title}
            placeholder="Titulo"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Textarea
            value={description}
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <InputDate
            label="Prazo de Entrega"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <SelectGroup
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={columns}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Button
          text={taskToEdit ? "Salvar alterações" : "Adicionar Tarefa"}
          type="submit"
        />
        {taskToEdit && (
          <div className="flex justify-end space-x-3 pt-2">
            <Button text={"Excluir Tarefa"} onClick={handleDelete} />
          </div>
        )}
      </div>
    </form>
  );
};
