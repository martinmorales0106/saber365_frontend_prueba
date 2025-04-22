import { useEffect, useState } from "react";
import styles from "./ContadorSaber11.module.css";
0;

const ContadorSaber11 = () => {
  const fechaExamen = new Date("2025-08-10T08:00:00"); // hora del examen (ajústala si cambia)
  const [tiempoRestante, setTiempoRestante] = useState({});

  const { dias, horas, minutos } = tiempoRestante;

  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahora = new Date();
      const diferencia = fechaExamen - ahora;

      if (diferencia <= 0) {
        clearInterval(intervalo);
        setTiempoRestante({
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0,
        });
        return;
      }

      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
      const segundos = Math.floor((diferencia / 1000) % 60);

      setTiempoRestante({ dias, horas, minutos, segundos });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  if (dias === 0 && horas === 0 && minutos === 0) {
    return null;
  }

  if (dias <= 1) {
    return (
      <div className={styles.contadorContainer}>
        <div className={styles.iconoReloj}>⏰</div>
        <div className={styles.contenido}>
          <h2>¡Atención!</h2>
          <p>
            ¡Mañana es el gran día! <br />
            ¡Mucho éxito en las pruebas Saber 11°!
          </p>
        </div>
      </div>
    );
  }

  if (dias <= 7) {
    return (
      <div className={styles.contadorContainer}>
        <div className={styles.iconoReloj}>🚨</div>
        <div className={styles.contenido}>
          <h2>¡Atención!</h2>
          <p>
            ¡Cuenta regresiva final! Solo faltan{" "}
            <strong className={styles.dias}>{dias}</strong> días,{" "}
            <strong className={styles.dias}>{horas}</strong> horas y{" "}
            <strong className={styles.dias}>{minutos}</strong> minutos para las
            pruebas <strong>Saber 11°</strong>. <br />
            ¡Prepárate al máximo!
          </p>
        </div>
      </div>
    );
  }

  if (dias <= 30) {
    return (
      <div className={styles.contadorContainer}>
        <div className={styles.iconoReloj}>⏳</div>
        <div className={styles.contenido}>
          <h2>¡Atención!</h2>
          <p>
            El examen está cada vez más cerca: faltan{" "}
            <strong className={styles.dias}>{dias}</strong> días. <br />
            ¡Aprovecha este mes para repasar y reforzar!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contadorContainer}>
      <div className={styles.iconoReloj}>⏰</div>
      <div className={styles.contenido}>
        <h2>¡Atención!</h2>
        <p>
          Faltan <strong className={styles.dias}>{dias}</strong>{" "}
          días para las pruebas <strong>Saber 11°</strong>. <br />
          Es momento de prepararte con todo!
        </p>
      </div>
    </div>
  );
};

export default ContadorSaber11;
