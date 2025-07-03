import { api } from "../service/axios";
import type { Task } from "../types";

export const createTask = async (task: Omit<Task, "id">) => {
  try {
    const response = await api.post("/Tasks", task);
    return response.data;
  } catch (error: unknown) {
    console.log("Error creating task:", error);
  }
};
export const editTask = async (task: Task) => {
  try {
    const response = await api.put(`/Tasks`, task);
    return response.data;
  } catch (error: unknown) {
    console.log("Error creating task:", error);
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const response = await api.delete(`/Tasks/${taskId}`);
    return response.data;
  } catch (error: unknown) {
    console.log("Error deleting task:", error);
  }
};
