import type { FC } from "react";
import styles from "./styles.module.css";

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export const BaseModal: FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <div
      style={isOpen ? {} : { display: "none" }}
      className={styles.overlay}
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};
