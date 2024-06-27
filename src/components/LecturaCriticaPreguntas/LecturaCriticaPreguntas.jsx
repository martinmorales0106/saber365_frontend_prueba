import { useEffect, useState } from "react";
import atrasImg from "../../assets/atrasImg.png";
import adelanteImg from "../../assets/adelanteImg.png";
import styles from "./LecturaCriticaPreguntas.module.css";
import useTabs from "../../hooks/useTabs";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";

const LecturaCriticaPreguntas = () => {
  const { preguntasFiltradas } = usePerfilUsuario();
  const {
    selectedTab,
    handleTabChange,
    handleSeleccionRespuesta,
    opcionesSeleccionadas,
  } = useTabs();

  const [imagenAmpliada, setImagenAmpliada] = useState(false);
 
  const preguntaActualGuardada = localStorage.getItem("lecturaPregunta");
  const preguntaInicial = preguntaActualGuardada
    ? parseInt(preguntaActualGuardada, 10)
    : 0;

  const [preguntaLocal, setPreguntaLocal] = useState(preguntaInicial);

  useEffect(() => {
    // Guardar la pregunta actual en el localStorage
    localStorage.setItem("lecturaPregunta", preguntaLocal.toString());
  }, [preguntaLocal]);


  const numerosPorPagina = 10;

  const mostrarSiguientes = () => {
    setPreguntaLocal((prev) => prev + 1);
    setImagenAmpliada(false);
  };

  const pruebasiguiente = () => {
    if (preguntaLocal + 1 >= preguntasFiltradas.length) {
      if (selectedTab === "Lectura Critica") {
        handleTabChange("Sociales");
      }
    }
  };


  const mostrarAnteriores = () => {
    setPreguntaLocal((prev) => prev - 1);
    setImagenAmpliada(false);
  };

  const seleccionarPregunta = (numeroPregunta) => {
    setPreguntaLocal(numeroPregunta - 1);
    setImagenAmpliada(false);
  };

  const paginasEspacios = 8;
  const inicio =
    preguntaLocal > paginasEspacios ? preguntaLocal - paginasEspacios : 0;
  const fin = inicio + numerosPorPagina;
  const numerosPreguntas = preguntasFiltradas
    .slice(inicio, fin)
    .map((pregunta, index) => inicio + index + 1);

  return (
    <div>
      <div className={styles.contenedor}>
        <div className={styles.fondo}>
          <button
            onClick={mostrarAnteriores}
            className={styles.boton}
            style={{ display: preguntaLocal === 0 ? "none" : "block" }}
          >
            <img
              src={atrasImg}
              alt="botón atrás"
              className={styles.imagenBoton}
            />
          </button>

          <div className={styles.numeracion}>
            {/* Barra de navegación de preguntas */}
            {numerosPreguntas.map((numero) => (
              <span
                key={numero}
                onClick={() => seleccionarPregunta(numero)}
                className={`${styles.numero} ${
                  preguntaLocal + 1 === numero ? styles.seleccionado : ""
                }`}
              >
                {numero}{" "}
              </span>
            ))}
          </div>
          <button
            onClick={mostrarSiguientes}
            className={styles.boton}
            style={{
              display:
                preguntaLocal + 1 >= preguntasFiltradas.length ? "none" : "block",
            }}
          >
            <img
              src={adelanteImg}
              alt="botón adelante"
              className={styles.imagenBoton}
            />
          </button>
        </div>
      </div>
      {preguntasFiltradas
        .slice(preguntaLocal, preguntaLocal + 1)
        .map((pregunta, index) => (
          <div key={index} className={styles.containerPreguntas}>
            <div className={styles.preguntas1}>
              <h1>Contexto</h1>
              {pregunta.contexto ? (
                <p className={styles.contexto}>{pregunta.contexto}</p>
              ) : null}

              {Object.keys(pregunta.imagen).length > 0 && (
                <div
                  className={styles.containerImg}
                  onClick={() => setImagenAmpliada(!imagenAmpliada)}
                >
                  {imagenAmpliada ? (
                    <img
                      src={pregunta.imagen}
                      className={styles.imagenAmpliada}
                      alt="Imagen Ampliada"
                    />
                  ) : (
                    <img
                      src={pregunta.imagen}
                      className={styles.imagen}
                      alt="Imagen Normal"
                    />
                  )}
                </div>
              )}
            </div>
            <div className={styles.preguntas2}>
              <h1>Pregunta</h1>
              <p className={styles.pregunta}>{pregunta.pregunta}</p>
              <h1>Respuestas</h1>
              <form >
                <div className={styles.opcionesRespuestas}>
                  <label>
                    <input
                      type="radio"
                      name="opciones"
                      value="A"
                      onChange={() =>
                        handleSeleccionRespuesta("A", pregunta.id)
                      }
                      checked={opcionesSeleccionadas[pregunta.id] === "A"}
                    />
                    <span className={styles.letra}>A.</span>
                    <p className={styles.opcion}>{pregunta.opcionA}</p>
                  </label>
                </div>
                <div className={styles.opcionesRespuestas}>
                  <label>
                    <input
                      type="radio"
                      name="opciones"
                      value="B"
                      onChange={() =>
                        handleSeleccionRespuesta("B", pregunta.id)
                      }
                      checked={opcionesSeleccionadas[pregunta.id] === "B"}
                    />
                    <span className={styles.letra}>B.</span>
                    <p className={styles.opcion}>{pregunta.opcionB}</p>
                  </label>
                </div>
                <div className={styles.opcionesRespuestas}>
                  <label>
                    <input
                      type="radio"
                      name="opciones"
                      value="C"
                      onChange={() =>
                        handleSeleccionRespuesta("C", pregunta.id)
                      }
                      checked={opcionesSeleccionadas[pregunta.id] === "C"}
                    />
                    <span className={styles.letra}>C.</span>
                    <p className={styles.opcion}>{pregunta.opcionC}</p>
                  </label>
                </div>
                <div className={styles.opcionesRespuestas}>
                  <label>
                    <input
                      type="radio"
                      name="opciones"
                      value="D"
                      onChange={() =>
                        handleSeleccionRespuesta("D", pregunta.id)
                      }
                      checked={opcionesSeleccionadas[pregunta.id] === "D"}
                    />
                    <span className={styles.letra}>D.</span>
                    <p className={styles.opcion}>{pregunta.opcionD}</p>
                  </label>
                </div>
                <div className={styles.botonPregunta}>
                  <input
                    type="button"
                    value="Siguiente Pregunta"
                    className={styles.boton2}
                    onClick={mostrarSiguientes}
                    style={{
                      display:
                        preguntaLocal + 1 >= preguntasFiltradas.length
                          ? "none"
                          : "block",
                    }}
                  />
                  <input
                    type="button"
                    value="Siguiente Prueba"
                    className={styles.boton3}
                    onClick={pruebasiguiente}
                    style={{
                      display:
                        preguntaLocal + 1 >= preguntasFiltradas.length &&
                        selectedTab !== "Ingles"
                          ? "block"
                          : "none",
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LecturaCriticaPreguntas;
