import { useEffect } from "react";
import styles from "./Temporizador.module.css";
import useTabs from "../../hooks/useTabs";

const Temporizador = () => {
  const { setTiempoAgotado, setSegundos, segundos } = useTabs();

  useEffect(() => {
    const temporizador = setInterval(() => {
      if (segundos > 0) {
        setSegundos((prevSegundos) => prevSegundos - 1);
      } else {
        clearInterval(temporizador);
        setTiempoAgotado(true);
      }
    }, 1000);

    return () => {
      clearInterval(temporizador);
      if (segundos > 0) {
        localStorage.setItem("contadorSegundos", (segundos -1).toString());
      }
    };
  }, [segundos, setTiempoAgotado, setSegundos]);

  const formatearTiempo = (tiempo) => {
    const horas = Math.floor(tiempo / 3600);
    const minutos = Math.floor((tiempo % 3600) / 60);
    const segundos = tiempo % 60;

    const horasFormateadas = horas.toString().padStart(2, "0");
    const minutosFormateados = minutos.toString().padStart(2, "0");
    const segundosFormateados = segundos.toString().padStart(2, "0");

    return `${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;
  };

  return (
    <div className={styles.contenedorTiempo}>
      <p className={styles.tiempo}>Tiempo restante: </p>
      <span className={styles.contador}>{formatearTiempo(segundos)}</span>
    </div>
  );
};

export default Temporizador;
