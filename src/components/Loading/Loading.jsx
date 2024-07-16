import { useState, useEffect } from "react";
import styles from "./Loading.module.css";
import logoImg from "../../assets/logo.png"; // Asegúrate de usar la ruta correcta a tu imagen de logo

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 6); // 10ms interval for a total duration of 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.logoContainer}>
        <img src={logoImg} alt="Loading Logo" className={styles.logo} />
        <div className={styles.progressBar}>
          <img src={logoImg} alt="Loading Logo" className={styles.logo2} />
        </div>
        <div className={styles.progressText}>{progress}%</div>
      </div>
    </div>
  );
};

export default Loading;
