import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import { KanbanVerifier } from "./presentation/screens/kanban-verifier";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/:id", element: <KanbanVerifier /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
