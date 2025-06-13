import { type FC } from "react";
import "./App.css";
import { Header, NavBar } from "./presentation/atomic-component/organism/index";
import { KanbanMainTemplate } from "./presentation/atomic-component/template";
const App: FC = () => {
  return (
    <>
      <Header />
      <KanbanMainTemplate>
        <NavBar />
      </KanbanMainTemplate>
    </>
  );
};

export default App;
