import styles from "./QrSection.module.css";

// Subcomponente para cada instrucción
export const InstructionItem = ({
  number,
  text,
}: {
  number: number;
  text: string;
}) => (
  <div className={styles.instructionItem}>
    <div className={styles.instructionNumber}>{number}</div>
    <p>{text}</p>
  </div>
);
