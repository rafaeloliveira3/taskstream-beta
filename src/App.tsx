import { type FC } from "react";
import "./App.css";
import { Header } from "./presentation/atomic-component/organism/index";
import { KanbanMainTemplate } from "./presentation/atomic-component/template";
const App: FC = () => {
  return (
    <>
      <Header />
      <KanbanMainTemplate>
        <h1>aaaaaaaaaaa</h1>
      </KanbanMainTemplate>
    </>
  );
};

export default App;
