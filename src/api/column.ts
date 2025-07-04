import axios from "axios";
import { api } from "../service/axios";
import type { Column } from "../types";

export const getColumns = async (projectId: string) => {
  try {
    const response = await api.get(`/${projectId}/ColumnControllers`);
    console.log(response);

    return response.data as Column[];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Error fetching columns:", error.message);
    }
  }
};

export const createColumn = async (
  column: Omit<Column, "id">,
  roomId: string
) => {
  try {
    const response = await api.post(`/${roomId}/ColumnControllers`, {
      columnTitle: column.title,
      ...column,
    });

    return response.data;
  } catch (error: unknown) {
    console.log("Error creating column:", error);
  }
};

export const getColumnsNames = async (roomId: string) => {
  try {
    const response = await api.get(`/${roomId}/ColumnControllers`);
    return response.data.map((column: Column) => {
      return {
        id: column.id,
        title: column.title,
      };
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Error fetching columns:", error.message);
    }
  }
};

export const deleteColumn = async (columnId: number, roomId: string) => {
  try {
    const response = await api.delete(
      `/${roomId}/ColumnControllers/${columnId}`
    );
    console.log(response);

    return response.data;
  } catch (error: unknown) {
    console.log("Error deleting column:", error);
  }
};
