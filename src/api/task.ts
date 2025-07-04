import { api } from "../service/axios";
import type { Task } from "../types";

export const createTask = async (task: Omit<Task, "id">, roomId: string) => {
  try {
    const response = await api.post(`/${roomId}/Tasks`, task);
    return response.data;
  } catch (error: unknown) {
    console.log("Error creating task:", error);
  }
};
export const editTask = async (task: Task, roomId: string) => {
  try {
    const response = await api.put(`/${roomId}/Tasks`, task);
    return response.data;
  } catch (error: unknown) {
    console.log("Error creating task:", error);
  }
};

export const deleteTask = async (taskId: string, roomId: string) => {
  try {
    const response = await api.delete(`/${roomId}/Tasks/${taskId}`);
    return response.data;
  } catch (error: unknown) {
    console.log("Error deleting task:", error);
  }
};
