import { useEffect, useState, type FC } from "react";
import { TaskStatusArray, type Task, type TaskStatus } from "../../../../types";
import { Button, Input, InputDate, SelectGroup, Textarea } from "../../atom";
import styles from "./styles.module.css";

interface TaskFormProps {
  onSave: (task: Omit<Task, "id">) => void;
  onCancel: () => void;
  initialStatus?: TaskStatus;
  taskToEdit?: Task | null;
}

export const TaskForm: FC<TaskFormProps> = ({
  onSave,
  initialStatus,
  taskToEdit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<TaskStatus>(initialStatus || "Backlog");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
      setStatus(taskToEdit.status);
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus(initialStatus || TaskStatusArray[0]);
    }
  }, [taskToEdit, initialStatus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Titulo é obrigatório.");
      return;
    }
    onSave({ title, description, dueDate, status });
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
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            options={Object.values(TaskStatusArray)}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-2">
        <Button
          text={taskToEdit ? "Salvar alterações" : "Adicionar Tarefa"}
          type="submit"
        />
      </div>
    </form>
  );
};
