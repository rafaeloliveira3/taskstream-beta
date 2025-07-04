import { useEffect, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyRoomExists } from "../../../api/room";
import { KanbanScreen } from "../kanban-screen";

export const KanbanVerifier: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRoomValid, setIsRoomValid] = useState(false);

  useEffect(() => {
    const checkRoomExists = async () => {
      if (id) {
        const roomExists = await verifyRoomExists(id);
        if (!roomExists) {
          navigate("/");
        } else {
          setIsRoomValid(true);
        }
      }
    };
    checkRoomExists();
  }, [id]);

  return isRoomValid ? <KanbanScreen /> : null;
};
