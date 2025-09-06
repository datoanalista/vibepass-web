import styles from "./QrSection.module.css";
import { getImagePath } from "@/utils/getImagePath";

// Subcomponente para la imagen QR + cintas
export const QrImage = () => (
  <div className={styles.qrImageContainer}>
    <img
      src={getImagePath("/images/bannerQr.png")}
      alt="QR Banner"
      className={styles.qrImagePlaceholder}
    />
    <div className={styles.tapePlaceholder}></div>
    <div className={styles.tapePlaceholder}></div>
  </div>
);
