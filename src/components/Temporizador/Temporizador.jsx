import { useEffect } from "react";
import styles from "./Temporizador.module.css";
import useTabs from "../../hooks/useTabs";
import Swal from "sweetalert2";

const Temporizador = () => {
  const { setTiempoAgotado, setSegundos, segundos, simulacroEncontrado } = useTabs();
console.log(segundos);

  useEffect(() => {
    const temporizador = setInterval(() => {
      if (segundos && segundos > 0) {
        setSegundos((prevSegundos) => {
          let nuevosSegundos = prevSegundos - 1;
          if (nuevosSegundos < 0) {
            nuevosSegundos = 0;
          }
          localStorage.setItem(`contadorSegundos${simulacroEncontrado?.titulo}`, nuevosSegundos.toString());
          if (nuevosSegundos == 1800) {
            Swal.fire({
              title: "Aviso",
              text: "Queda media hora para finalizar la prueba.",
              icon: "warning",
              confirmButtonText: "Aceptar",
              didOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                confirmButton.style.backgroundColor = "#0f3861";
                confirmButton.style.color = "#ffffff";
              },
            });
          }

          if (nuevosSegundos == 60) {
            Swal.fire({
              title: "El tiempo se esta agotando",
              text: "El tiempo finalizara en 1 minuto. Las respuestas se enviarán automáticamente.",
              icon: "info",
              confirmButtonText: "Aceptar",
              didOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                confirmButton.style.backgroundColor = "#0f3861";
                confirmButton.style.color = "#ffffff";
              },
            });
          }
          return nuevosSegundos;
        });
      } else {
        setTiempoAgotado(true);
        clearInterval(temporizador);
      }
    }, 1000);

    return () => clearInterval(temporizador);
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
