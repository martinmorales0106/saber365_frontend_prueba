import { useEffect, useState } from "react";
import atrasImg from "../../assets/atrasImg.png";
import adelanteImg from "../../assets/adelanteImg.png";
import styles from "./NaturalesPreguntas.module.css";
import useTabs from "../../hooks/useTabs";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const NaturalesPreguntas = () => {
  const {
    preguntasFiltradas,
    preguntasSimulacro,
    submitPreguntas,
    simulacroId,
    simulacrosUsuario,
  } = usePerfilUsuario();

  const simulacroEncontrado = simulacrosUsuario.find(
    (simulacro) => simulacro.id === parseInt(simulacroId, 10)
  );

  const {
    selectedTab,
    handleTabChange,
    handleSeleccionRespuesta,
    opcionesSeleccionadas,
    setOpcionesSeleccionadas,
    setTiempoAgotado,
  } = useTabs();

  const { auth } = useAuth();

  const [imagenAmpliada, setImagenAmpliada] = useState(false);

  const preguntaActualGuardada = localStorage.getItem("naturalesPregunta");
  const preguntaInicial = preguntaActualGuardada
    ? parseInt(preguntaActualGuardada, 10)
    : 0;

  const [preguntaLocal, setPreguntaLocal] = useState(preguntaInicial);

  useEffect(() => {
    // Guardar la pregunta actual en el localStorage
    localStorage.setItem("naturalesPregunta", preguntaLocal.toString());
  }, [preguntaLocal]);

  const numerosPorPagina = 10;

  const mostrarSiguientes = () => {
    setPreguntaLocal((prev) => prev + 1);
    setImagenAmpliada(false);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    // Verificar que todas las preguntas estén marcadas
    const preguntasSinMarcar = preguntasSimulacro.filter(
      (pregunta) => !opcionesSeleccionadas[pregunta.id]
    );

    if (preguntasSinMarcar.length > 0) {
      // Al menos una pregunta no está marcada
      Swal.fire({
        title: "Preguntas sin marcar",
        html: `
            <div style="text-align: left;">
              <p>Las siguientes preguntas no están marcadas:</p>
              <ul>
                ${preguntasSinMarcar
                  .map(
                    (pregunta) =>
                      `<li>Pregunta: ${pregunta.numero}, Área: ${pregunta.area}</li>`
                  )
                  .join("")}
              </ul>
              <p style="margin-top: 20px; font-weight: bold;">Para enviar las respuestas, todas las preguntas deben estar marcadas.</p>
            </div>
          `,
        icon: "warning",
        confirmButtonText: "Aceptar",
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          confirmButton.style.backgroundColor = "#0f3861";
          confirmButton.style.color = "#ffffff";
        },
      });
    } else {
      const resultados = preguntasSimulacro.map((pregunta) => {
        const idPregunta = pregunta.id;
        const numero = pregunta.numero;
        const area = pregunta.area;
        const sesion = pregunta.sesion;
        const respuestaCorrecta = pregunta.respuesta_correcta;
        const respuestaUsuario = opcionesSeleccionadas[idPregunta];
        const esRespuestaCorrecta =
          respuestaUsuario?.opcion === respuestaCorrecta;
        return {
          idPregunta,
          numero,
          area,
          sesion,
          respuestaCorrecta,
          respuestaUsuario,
          esCorrecta: esRespuestaCorrecta,
        };
      });

      const tiempo = Number(
        localStorage.getItem(`contadorSegundos${simulacroEncontrado.titulo}`)
      );

      await submitPreguntas({
        id_usuario: auth.id,
        id_simulacro: preguntasSimulacro[0].id_simulacro,
        estado_preguntas_sesion1: resultados,
        estado_preguntas_sesion2: null,
        tiempo_prueba_sesion1: tiempo,
        tiempo_prueba_sesion2: null,
        numero_sesion: simulacroEncontrado.numero_sesiones,
      });

      setOpcionesSeleccionadas("");
      setTiempoAgotado(false); // Reiniciar el estado de tiempo agotado
      handleTabChange("Matemáticas");
      localStorage.setItem("inglesPregunta", "0");
      localStorage.setItem("lecturaPregunta", "0");
      localStorage.setItem("matemáticasPregunta", "0");
      localStorage.setItem("naturalesPregunta", "0");
      localStorage.setItem("socialesPregunta", "0");
      localStorage.setItem("lenguajePregunta", "0");
      localStorage.setItem("ciudadanasPregunta", "0");
      localStorage.removeItem(`contadorSegundos${simulacroEncontrado.titulo}`);
    }
    setTiempoAgotado(true);
  };

  const pruebasiguiente = () => {
    if (preguntaLocal + 1 >= preguntasFiltradas.length) {
      if (selectedTab === "Naturales") {
        handleTabChange("Inglés");
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
                preguntaLocal + 1 >= preguntasFiltradas.length
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
              <form onSubmit={handleSubmit2}>
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
                          preguntaLocal + 1 >= preguntasFiltradas.length
                            ? "none"
                            : "block",
                      }}
                    />
                    {auth.grado === "Quinto" ||
                    auth.grado === "Sexto" ||
                    auth.grado === "Séptimo" ||
                    auth.grado === "Octavo" ? (
                      <>
                        <input
                          type="submit"
                          value="Finalizar Prueba"
                          className={styles.boton3}
                          style={{
                            display:
                              preguntaLocal + 1 >= numerosPreguntas.length &&
                              selectedTab === "Naturales"
                                ? "block"
                                : "none",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <input
                          type="button"
                          value="Siguiente Prueba"
                          className={styles.boton3}
                          onClick={pruebasiguiente}
                          style={{
                            display:
                              preguntaLocal + 1 >= preguntasFiltradas.length &&
                              selectedTab !== "Inglés"
                                ? "block"
                                : "none",
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NaturalesPreguntas;
