import { useState, type FC } from "react";
import { type Column, type Task } from "../../../../types";
import { Button, Input } from "../../atom";
import styles from "./styles.module.css";

type ColunmFormProps = {
  onSave: (column: Omit<Column, "id">) => void;
  onCancel: () => void;
  taskToEdit?: Task | null;
};

export const ColumnForm: FC<ColunmFormProps> = ({ onSave, taskToEdit }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Titulo é obrigatório.");
      return;
    }
    onSave({ title, tasks: [] });
    setTitle("");
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
      </div>
      <div className="flex justify-end space-x-3 pt-2">
        <Button
          text={taskToEdit ? "Salvar alterações" : "Adicionar Coluna"}
          type="submit"
        />
      </div>
    </form>
  );
};
