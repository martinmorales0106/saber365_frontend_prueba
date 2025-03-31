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
    : 1;

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
    if (preguntaLocal  >= preguntasFiltradas.length) {
      if (selectedTab === "Lectura Crítica") {
        handleTabChange("Sociales");
      }
    }
  };

  const mostrarAnteriores = () => {
    setPreguntaLocal((prev) => prev - 1);
    setImagenAmpliada(false);
  };

  const seleccionarPregunta = (numeroPregunta) => {
    setPreguntaLocal(numeroPregunta);
    setImagenAmpliada(false);
  };

  const paginasEspacios = 9;
  const inicio =
    preguntaLocal > paginasEspacios ? preguntaLocal - paginasEspacios : 0;
  const fin = inicio + numerosPorPagina;
  const numerosPreguntas = preguntasFiltradas
    .sort((a, b) => a.numero - b.numero)
    .slice(inicio, fin)
    .map((pregunta) => pregunta.numero);

    
  const isImageUrl = (url) => {
    return /\.(jpg|jpeg|png|gif)$/.test(url);
  };

  return (
    <div>
      <div className={styles.contenedor}>
        <div className={styles.fondo}>
          <button
            onClick={mostrarAnteriores}
            className={styles.boton}
            style={{ display: preguntaLocal === 1 ? "none" : "block" }}
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
                  preguntaLocal === numero ? styles.seleccionado : ""
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
                preguntaLocal  >= preguntasFiltradas.length
                  ? "none"
                  : "block",
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
        .filter(pregunta => pregunta.numero === preguntaLocal) // Filtra la pregunta que coincida con preguntaLocal
        .map((pregunta, index) => (
          <div key={index} className={styles.containerPreguntas}>
            {(pregunta.contexto || pregunta.imagen) && (
              <div className={styles.preguntas1}>
                <h1 className={styles.subtitulo}>Contexto</h1>
                {pregunta.titulo_texto ? (
                  <p className={styles.tituloTexto}>{pregunta.titulo_texto}</p>
                ) : null}

                {pregunta.contexto ? (
                  <div className={styles.contexto}>
                    {pregunta.contexto.split("\n").map((sentence, index) => (
                      <p key={index}>{sentence.trim().slice(0, -2)}</p>
                    ))}
                  </div>
                ) : null}

                {pregunta.pie_texto ? (
                  <p className={styles.pieTexto}>{pregunta.pie_texto}</p>
                ) : null}

                {pregunta.imagen && Object.keys(pregunta.imagen).length > 0 && (
                  <div
                    className={styles.containerImg}
                    onClick={() => setImagenAmpliada(!imagenAmpliada)}
                  >
                    {imagenAmpliada ? (
                      <div className={styles.imagenAmpliadaContainer}>
                        <img
                          src={pregunta.imagen}
                          className={styles.imagenAmpliada}
                          alt="Imagen Ampliada"
                        />
                      </div>
                    ) : (
                      <img
                        src={pregunta.imagen}
                        className={styles.imagen}
                        alt="Imagen Normal"
                      />
                    )}
                  </div>
                )}

                {isImageUrl(pregunta.opcionA) && (
                  <h1 className={styles.fuente1}>Pregunta</h1>
                )}
                {pregunta.pregunta && isImageUrl(pregunta.opcionA) ? (
                  <div className={styles.contexto}>
                    {pregunta.pregunta.split("\n").map((sentence, index) => (
                      <p key={index}>{sentence.trim().slice(0, -2)}</p>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
            <div
              className={`${
                pregunta.contexto || pregunta.imagen
                  ? styles.preguntas2
                  : styles.sinContextoOImagen
              }`}
            >
              {!isImageUrl(pregunta.opcionA) && (
                <h1 className={styles.fuente2}>Pregunta</h1>
              )}

              {pregunta.pregunta && !isImageUrl(pregunta.opcionA) ? (
                <div className={styles.contexto}>
                  {pregunta.pregunta.split("\n").map((sentence, index) => (
                    <p key={index}>{sentence.trim().slice(0, -2)}</p>
                  ))}
                </div>
              ) : null}

              {pregunta.pregunta &&
                !pregunta.contexto &&
                !pregunta.imagen &&
                isImageUrl(pregunta.opcionA) && (
                  <h1 className={styles.fuente2}>Pregunta</h1>
                )}

              {pregunta.pregunta &&
              !pregunta.contexto &&
              !pregunta.imagen &&
              isImageUrl(pregunta.opcionA) ? (
                <div className={styles.contexto}>
                  {pregunta.pregunta.split("\n").map((sentence, index) => (
                    <p key={index}>{sentence.trim().slice(0, -2)}</p>
                  ))}
                </div>
              ) : null}
              <h1>Respuestas</h1>
              <form>
                <div className={styles.opcionesRespuestasContainer}>
                  <div
                    className={`${
                      pregunta.contexto || pregunta.imagen
                        ? null
                        : styles.respuestaFlex
                    }`}
                  >
                    <div
                      className={`${
                        pregunta.contexto || pregunta.imagen
                          ? null
                          : styles.respuestaPart
                      }`}
                    >
                      <div className={styles.opcionesRespuestas}>
                        <label>
                          <input
                            type="radio"
                            name="opciones"
                            value="A"
                            onChange={(e) =>
                              handleSeleccionRespuesta(
                                e.target.value,
                                pregunta.id,
                                pregunta.numero,
                                pregunta.area
                              )
                            }
                            checked={
                              opcionesSeleccionadas[pregunta.id]?.opcion === "A"
                            }
                          />
                          <span className={styles.letra}>A.</span>
                          {isImageUrl(pregunta.opcionA) ? (
                            <img
                              src={pregunta.opcionA}
                              alt="Opción A"
                              className={styles.imagenOpcion}
                            />
                          ) : (
                            <p className={styles.opcion}>{pregunta.opcionA}</p>
                          )}
                        </label>
                      </div>
                      <div className={styles.opcionesRespuestas}>
                        <label>
                          <input
                            type="radio"
                            name="opciones"
                            value="B"
                            onChange={(e) =>
                              handleSeleccionRespuesta(
                                e.target.value,
                                pregunta.id,
                                pregunta.numero,
                                pregunta.area
                              )
                            }
                            checked={
                              opcionesSeleccionadas[pregunta.id]?.opcion === "B"
                            }
                          />
                          <span className={styles.letra}>B.</span>
                          {isImageUrl(pregunta.opcionB) ? (
                            <img
                              src={pregunta.opcionB}
                              alt="Opción B"
                              className={styles.imagenOpcion}
                            />
                          ) : (
                            <p className={styles.opcion}>{pregunta.opcionB}</p>
                          )}
                        </label>
                      </div>
                    </div>
                    <div>
                      <div className={styles.opcionesRespuestas}>
                        <label>
                          <input
                            type="radio"
                            name="opciones"
                            value="C"
                            onChange={(e) =>
                              handleSeleccionRespuesta(
                                e.target.value,
                                pregunta.id,
                                pregunta.numero,
                                pregunta.area
                              )
                            }
                            checked={
                              opcionesSeleccionadas[pregunta.id]?.opcion === "C"
                            }
                          />
                          <span className={styles.letra}>C.</span>
                          {isImageUrl(pregunta.opcionC) ? (
                            <img
                              src={pregunta.opcionC}
                              alt="Opción C"
                              className={styles.imagenOpcion}
                            />
                          ) : (
                            <p className={styles.opcion}>{pregunta.opcionC}</p>
                          )}
                        </label>
                      </div>
                      <div className={styles.opcionesRespuestas}>
                        <label>
                          <input
                            type="radio"
                            name="opciones"
                            value="D"
                            onChange={(e) =>
                              handleSeleccionRespuesta(
                                e.target.value,
                                pregunta.id,
                                pregunta.numero,
                                pregunta.area
                              )
                            }
                            checked={
                              opcionesSeleccionadas[pregunta.id]?.opcion === "D"
                            }
                          />
                          <span className={styles.letra}>D.</span>
                          {isImageUrl(pregunta.opcionD) ? (
                            <img
                              src={pregunta.opcionD}
                              alt="Opción D"
                              className={styles.imagenOpcion}
                            />
                          ) : (
                            <p className={styles.opcion}>{pregunta.opcionD}</p>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.botonPregunta}>
                    <input
                      type="button"
                      value="Siguiente Pregunta"
                      className={styles.boton2}
                      onClick={mostrarSiguientes}
                      style={{
                        display:
                          preguntaLocal  >= preguntasFiltradas.length
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
                          preguntaLocal >= preguntasFiltradas.length &&
                          selectedTab !== "Inglés"
                            ? "block"
                            : "none",
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LecturaCriticaPreguntas;
