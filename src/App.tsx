import { useState, type FC } from "react";
import { useNavigate } from "react-router";
import { initializeRoom, verifyRoomExists } from "./api/room";
import "./App.css";
import logo from "./assets/logo.png";
import { Button, Input } from "./presentation/atomic-component/atom";

const App: FC = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState<string>("");
  const handleCreateRoom = async () => {
    const roomId = url.trim().replace(/\s+/g, "");
    const roomExists = await verifyRoomExists(roomId);

    if (!roomExists) {
      const initialize = await initializeRoom(roomId);
      if (!initialize) return;
      navigate(`/${roomId}`);
    } else {
      navigate(`/${roomId}`);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          width: "20%",
        }}
      >
        <img src={logo} style={{ width: "60%" }} />
        <h3>Seja bem-vindo ao TaskStream!</h3>
        <span>Digite a URL desejada para seu kanban</span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "8px",
          }}
        >
          <Input
            placeholder="Url do Kanban"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button text="Criar Quadro" onClick={handleCreateRoom} />
        </div>
      </div>
    </div>
  );
};

export default App;
