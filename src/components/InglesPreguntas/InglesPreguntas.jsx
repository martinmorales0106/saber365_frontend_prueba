import { useEffect, useState } from "react";
import atrasImg from "../../assets/atrasImg.png";
import adelanteImg from "../../assets/adelanteImg.png";
import styles from "./InglesPreguntas.module.css";
import useTabs from "../../hooks/useTabs";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const InglesPreguntas = () => {
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
    setSelectedTab,
    handleSeleccionRespuesta,
    opcionesSeleccionadas,
    setOpcionesSeleccionadas,
    setTiempoAgotado,
  } = useTabs();

  const { auth } = useAuth();

  const [imagenAmpliada, setImagenAmpliada] = useState(false);

  const preguntaActualGuardada = localStorage.getItem("inglesPregunta");
  const preguntaInicial = preguntaActualGuardada
    ? parseInt(preguntaActualGuardada, 10)
    : 0;

  const [preguntaLocal, setPreguntaLocal] = useState(preguntaInicial);

  const [preguntasNivelActual, setPreguntasNivelActual] = useState([]);

  useEffect(() => {
    // Guardar la pregunta actual en el localStorage
    localStorage.setItem("inglesPregunta", preguntaLocal.toString());
  }, [preguntaLocal]);

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
      setSelectedTab("Matemáticas");
      localStorage.setItem("inglesPregunta", "0");
      localStorage.setItem("lecturaPregunta", "0");
      localStorage.setItem("matemáticasPregunta", "0");
      localStorage.setItem("naturalesPregunta", "0");
      localStorage.setItem("socialesPregunta", "0");
      localStorage.removeItem(`contadorSegundos${simulacroEncontrado.titulo}`);
    }
    setTiempoAgotado(true);
  };

  const mostrarAnteriores = () => {
    setPreguntaLocal((prev) => prev - 1);
    setImagenAmpliada(false);
  };

  const seleccionarPregunta = (numeroPregunta) => {
    setPreguntaLocal(numeroPregunta - 1);
    setImagenAmpliada(false);
  };

  const nivelesUnicos = preguntasFiltradas.reduce((niveles, pregunta) => {
    niveles.add(pregunta.nivel);
    return niveles;
  }, new Set());

  const numerosPreguntas = Array.from(nivelesUnicos);

  useEffect(() => {
    const filtradas = preguntasFiltradas.filter(
      (pregunta) => pregunta.nivel === (preguntaLocal + 1).toString()
    );
    setPreguntasNivelActual(filtradas);
  }, [preguntasFiltradas, preguntaLocal]);

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
            {numerosPreguntas
              .sort((a, b) => a - b) // Ordena los números de menor a mayor
              .map((numero) => (
                <span
                  key={numero}
                  onClick={() => seleccionarPregunta(numero)}
                  className={`${styles.numero} ${
                    preguntaLocal + 1 == numero ? styles.seleccionado : ""
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
                preguntaLocal + 1 >= numerosPreguntas.length ? "none" : "block",
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
      <div className={styles.fondo3}>
        <div className={styles.containerPreguntas}>
          {preguntasNivelActual[0]?.titulo_texto ? (
            <p className={styles.tituloTexto}>
              {preguntasNivelActual[0].titulo_texto}
            </p>
          ) : null}
          {preguntasNivelActual[0]?.contexto ? (
            <div className={styles.contexto}>
              {preguntasNivelActual[0].contexto
                .split("\n")
                .map((sentence, index) => (
                  <p key={index}>{sentence.trim().slice(0, -2)}</p>
                ))}
            </div>
          ) : null}
          {((preguntasNivelActual[0]?.imagen.length > 0 &&
            preguntasNivelActual[0]?.nivel == "3") ||
            preguntasNivelActual[0]?.nivel == "4" ||
            preguntasNivelActual[0]?.nivel == "5" ||
            preguntasNivelActual[0]?.nivel == "6" ||
            preguntasNivelActual[0]?.nivel == "7") && (
            <div
              className={styles.containerImg}
              onClick={() => setImagenAmpliada(!imagenAmpliada)}
            >
              {imagenAmpliada ? (
                <div className={styles.imagenAmpliadaContainer}>
                  <img
                    src={preguntasNivelActual[0].imagen}
                    className={styles.imagenAmpliada}
                    alt="Imagen Ampliada"
                  />
                </div>
              ) : (
                <img
                  src={preguntasNivelActual[0].imagen}
                  className={styles.imagen2}
                  alt="Imagen Normal"
                />
              )}
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit2}>
        <div className={styles.format}>
          {preguntasNivelActual[0]?.nivel === "1" && (
            <>
              {preguntasNivelActual.map((pregunta, index) => (
                <div key={index} className={styles.contenedorAux}>
                  <div className={styles.containerPreguntas2}>
                    <div className={styles.contenedor3}>
                      <h4 className={styles.indice}>{pregunta.numero}.</h4>
                      <div className={styles.contexto2}>
                        {pregunta.pregunta
                          .split("\n")
                          .map((sentence, index) => (
                            <p key={index}>{sentence.trim().slice(0, -2)}</p>
                          ))}
                      </div>
                    </div>
                    <div className={styles.respuestaSelector}>
                      <select
                        id={`respuesta-${pregunta.id}`}
                        value={opcionesSeleccionadas[pregunta.id]?.opcion || ""}
                        onChange={(e) =>
                          handleSeleccionRespuesta(
                            e.target.value,
                            pregunta.id,
                            pregunta.numero,
                            pregunta.area
                          )
                        }
                      >
                        {!opcionesSeleccionadas[pregunta.id]?.opcion && (
                          <option value="">Seleccionar</option>
                        )}
                        <option value="A">A. {pregunta.opcionA}</option>
                        <option value="B">B. {pregunta.opcionB}</option>
                        <option value="C">C. {pregunta.opcionC}</option>
                        <option value="D">D. {pregunta.opcionD}</option>
                        <option value="E">E. {pregunta.opcionE}</option>
                        <option value="F">F. {pregunta.opcionF}</option>
                        <option value="G">G. {pregunta.opcionG}</option>
                        <option value="H">H. {pregunta.opcionH}</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {(preguntasNivelActual[0]?.nivel === "2" ||
            preguntasNivelActual[0]?.nivel === "3" ||
            preguntasNivelActual[0]?.nivel === "4" ||
            preguntasNivelActual[0]?.nivel === "5" ||
            preguntasNivelActual[0]?.nivel === "6" ||
            preguntasNivelActual[0]?.nivel === "7") && (
            <>
              {preguntasNivelActual.map((pregunta, index) => (
                <div key={index} className={styles.contenedorAux}>
                  <div
                    className={
                      preguntasNivelActual[0]?.nivel === "6"
                        ? styles.containerPreguntas2SinFlex
                        : styles.containerPreguntas2
                    }
                  >
                    <div
                      className={
                        preguntasNivelActual[0]?.nivel === "4" ||
                        preguntasNivelActual[0]?.nivel === "7"
                          ? styles.contenedor4
                          : styles.contenedor3
                      }
                    >
                      <h4 className={styles.indice}>{pregunta.numero}.</h4>
                      {(preguntasNivelActual[0]?.nivel === "4" ||
                        preguntasNivelActual[0]?.nivel === "7") && (
                        <div className={styles.nivel4}>
                          <div className={styles.opcionesRespuestas}>
                            <label>
                              <input
                                type="radio"
                                name={`opciones-${pregunta.id}`}
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
                                  opcionesSeleccionadas[pregunta.id]?.opcion ===
                                  "A"
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
                                <p className={styles.opcion}>
                                  {pregunta.opcionA}
                                </p>
                              )}
                            </label>
                          </div>
                          <div className={styles.opcionesRespuestas}>
                            <label>
                              <input
                                type="radio"
                                name={`opciones-${pregunta.id}`}
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
                                  opcionesSeleccionadas[pregunta.id]?.opcion ===
                                  "B"
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
                                <p className={styles.opcion}>
                                  {pregunta.opcionB}
                                </p>
                              )}
                            </label>
                          </div>
                          <div className={styles.opcionesRespuestas}>
                            <label>
                              <input
                                type="radio"
                                name={`opciones-${pregunta.id}`}
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
                                  opcionesSeleccionadas[pregunta.id]?.opcion ===
                                  "C"
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
                                <p className={styles.opcion}>
                                  {pregunta.opcionC}
                                </p>
                              )}
                            </label>
                          </div>
                          {preguntasNivelActual[0]?.nivel === "7" && (
                            <div className={styles.opcionesRespuestas}>
                              <label>
                                <input
                                  type="radio"
                                  name={`opciones-${pregunta.id}`}
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
                                    opcionesSeleccionadas[pregunta.id]
                                      ?.opcion === "D"
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
                                  <p className={styles.opcion}>
                                    {pregunta.opcionD}
                                  </p>
                                )}
                              </label>
                            </div>
                          )}
                        </div>
                      )}

                      <div className={styles.contexto2}>
                        {preguntasNivelActual[0]?.nivel === "2" && (
                          <>
                            {Object.keys(pregunta.imagen).length > 0 && (
                              <div className={styles.containerImg}>
                                <img
                                  src={pregunta.imagen}
                                  className={styles.imagen}
                                  alt="Imagen"
                                />
                              </div>
                            )}
                          </>
                        )}
                        {(preguntasNivelActual[0]?.nivel === "3" ||
                          preguntasNivelActual[0]?.nivel === "5" ||
                          preguntasNivelActual[0]?.nivel === "6") && (
                          <div className={styles.contexto2}>
                            {pregunta.pregunta
                              .split("\n")
                              .map((sentence, index) => (
                                <p key={index}>
                                  {sentence.trim().slice(0, -2)}
                                </p>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {preguntasNivelActual[0]?.nivel !== "4" &&
                    preguntasNivelActual[0]?.nivel !== "7" ? (
                      <div>
                        <div className={styles.opcionesRespuestas}>
                          <label>
                            <input
                              type="radio"
                              name={`opciones-${pregunta.id}`}
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
                                opcionesSeleccionadas[pregunta.id]?.opcion ===
                                "A"
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
                              <p className={styles.opcion}>
                                {pregunta.opcionA}
                              </p>
                            )}
                          </label>
                        </div>
                        <div className={styles.opcionesRespuestas}>
                          <label>
                            <input
                              type="radio"
                              name={`opciones-${pregunta.id}`}
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
                                opcionesSeleccionadas[pregunta.id]?.opcion ===
                                "B"
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
                              <p className={styles.opcion}>
                                {pregunta.opcionB}
                              </p>
                            )}
                          </label>
                        </div>
                        <div className={styles.opcionesRespuestas}>
                          <label>
                            <input
                              type="radio"
                              name={`opciones-${pregunta.id}`}
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
                                opcionesSeleccionadas[pregunta.id]?.opcion ===
                                "C"
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
                              <p className={styles.opcion}>
                                {pregunta.opcionC}
                              </p>
                            )}
                          </label>
                        </div>
                        {preguntasNivelActual[0]?.nivel === "6" && (
                          <div className={styles.opcionesRespuestas}>
                            <label>
                              <input
                                type="radio"
                                name={`opciones-${pregunta.id}`}
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
                                  opcionesSeleccionadas[pregunta.id]?.opcion ===
                                  "D"
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
                                <p className={styles.opcion}>
                                  {pregunta.opcionD}
                                </p>
                              )}
                            </label>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className={styles.contenedorBotonAux}>
          <div className={styles.botonPregunta}>
            <input
              type="button"
              value="Siguiente Parte"
              className={styles.boton2}
              onClick={mostrarSiguientes}
              style={{
                display:
                  preguntaLocal + 1 >= numerosPreguntas.length
                    ? "none"
                    : "block",
              }}
            />
            <input
              type="submit"
              value="Finalizar Prueba"
              className={styles.boton3}
              style={{
                display:
                  preguntaLocal + 1 >= numerosPreguntas.length &&
                  selectedTab === "Ingles"
                    ? "block"
                    : "none",
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default InglesPreguntas;
