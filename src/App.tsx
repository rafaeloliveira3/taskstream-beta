import { useState, type FC } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { Button, Input } from "./presentation/atomic-component/atom";

const App: FC = () => {
  const [url, setUrl] = useState<string>("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "50%",
      }}
    >
      <Input
        placeholder="Url do Kanban"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Link to={`/${url}`}>
        <Button text="Criar Quadro" />
      </Link>
    </div>
  );
};

export default App;
