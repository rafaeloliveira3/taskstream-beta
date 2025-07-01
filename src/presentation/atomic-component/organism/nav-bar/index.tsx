import { Search } from "@mui/icons-material";
import { useState, type FC } from "react";
import { InputIcon, TextInput } from "../../atom";
import styles from "./styles.module.css";

type NavBarProps = {
  openModal?: () => void;
};

export const NavBar: FC<NavBarProps> = ({ openModal }) => {
  const [teste, setTeste] = useState<string>("Quadro 1 - Teste");
  return (
    <nav className={styles.navBar}>
      <span className={styles.titleContainer}>
        <p>Kanban Online:</p>
        <TextInput value={teste} onChange={(e) => setTeste(e.target.value)} />
      </span>
      <div className={styles.searchContainer}>
        <button onClick={openModal} className={styles.button}>
          Adicionar Task
        </button>
        <InputIcon Icon={Search} placeholder="Pesquisar..." />
      </div>
    </nav>
  );
};
