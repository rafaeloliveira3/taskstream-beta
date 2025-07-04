import { api } from "../service/axios";
import { createColumn } from "./column";

const defaultValues = [
  {
    title: "Backlog",
    columnTitle: "Backlog",
    tasks: [],
  },
  {
    title: "To Do",
    columnTitle: "To Do",
    tasks: [],
  },
  {
    title: "In Progress",
    columnTitle: "In Progress",
    tasks: [],
  },
  {
    title: "Done",
    columnTitle: "Done",
    tasks: [],
  },
];

export const initializeRoom = async (roomId: string) => {
  try {
    const responses = [];
    for (const column of defaultValues) {
      const created = await createColumn(column, roomId);
      responses.push(created);
    }
    return responses;
  } catch (error: unknown) {
    console.log("Error creating room:", error);
    return false;
  }
};

export const verifyRoomExists = async (roomId: string) => {
  try {
    const response = await api.get(`/${roomId}/Rooms`);
    return response.data;
  } catch (error: unknown) {
    console.log("Error verifying room:", error);
    return false;
  }
};
