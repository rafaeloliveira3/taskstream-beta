import axios from "axios";
import { api } from "../service/axios";
import type { Column } from "../types";

export const getColumns = async (projectId: string) => {
  console.log("Fetching columns for project:", projectId);
  try {
    const response = await api.get(`/ColumnControllers`);
    console.log(response);

    return response.data as Column[];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Error fetching columns:", error.message);
    }
  }
};
