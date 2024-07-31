import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./RevisionPreguntas.module.css";
import revisionImg from "../../assets/revisionImg.png";
import ganadaImg from "../../assets/ganadaImg.png";
import perdidaImg from "../../assets/perdidaImg.png";
import resultadosPorPreguntasImg from "../../assets/resultadosPorPreguntasImg.png";
import Boton from "../../components/Boton/Boton";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import Swal from "sweetalert2";

const RevisionPreguntas = () => {
  const { id, area } = useParams();
  const {
    simulacroFinalizado,
    preguntasSimulacroArea,
    obtenerSimulacroFinalizado,
    filtrarPreguntasSimulacrosPorArea,
    setSimulacroId,
  } = usePerfilUsuario();

  const [estadoPreguntas, setEstadoPreguntas] = useState([]);
  const [preguntaLocal, setPreguntaLocal] = useState(1);
  const [imagenAmpliada, setImagenAmpliada] = useState(false);
  const [imagenAmpliada2, setImagenAmpliada2] = useState(false);
  const [imagenAmpliada3, setImagenAmpliada3] = useState(false);

  useEffect(() => {
    const fetchSimulacroFinalizado = async () => {
      await obtenerSimulacroFinalizado(id);
    };
    fetchSimulacroFinalizado();
  }, [id]);

  useEffect(() => {
    if (simulacroFinalizado && simulacroFinalizado.resultadoSimulacro) {
      setSimulacroId(simulacroFinalizado.resultadoSimulacro.id_simulacro);
    }
  }, [simulacroFinalizado, setSimulacroId]);

  useEffect(() => {
    const fetchSimulacroArea = async () => {
      if (simulacroFinalizado && simulacroFinalizado.resultadoSimulacro) {
        await filtrarPreguntasSimulacrosPorArea(area);
        const preguntas = await obtenerPreguntasPorArea(area);
        // Filtrar y ordenar por el número de la pregunta
        const preguntasFiltradasYOrdenadas = preguntas
          .filter((pregunta) => pregunta.area === area) // Asegúrate de que sean del área correcta
          .sort((a, b) => a.numero - b.numero); // Ordena por número de pregunta
        setEstadoPreguntas(preguntasFiltradasYOrdenadas);
      }
    };
    fetchSimulacroArea();
  }, [area, simulacroFinalizado]);

  useEffect(() => {
    // Recuperar la pregunta seleccionada de sessionStorage
    const preguntaSeleccionada = sessionStorage.getItem("preguntaSeleccionada");
    if (preguntaSeleccionada) {
      setPreguntaLocal(parseInt(preguntaSeleccionada));
    }
  }, []);

  useEffect(() => {
    // Guardar la pregunta seleccionada en sessionStorage
    sessionStorage.setItem("preguntaSeleccionada", preguntaLocal);
  }, [preguntaLocal]);

  useEffect(() => {
    return () => {
      // Limpiar sessionStorage cuando el componente se desmonte
      sessionStorage.removeItem("preguntaSeleccionada");
    };
  }, []);

  const obtenerPreguntasPorArea = async (area) => {
    if (!simulacroFinalizado || !simulacroFinalizado.resultadoSimulacro)
      return [];
    const preguntasFiltradas =
      simulacroFinalizado.resultadoSimulacro.estado_preguntas.filter(
        (pregunta) => pregunta.area === area
      );
    return preguntasFiltradas;
  };

  const numerosPreguntas = estadoPreguntas
    ?.map((pregunta) => pregunta.numero)
    .sort((a, b) => a - b);

  const seleccionarPregunta = (numeroPregunta) => {
    setPreguntaLocal(numeroPregunta);
  };

  const submitBoton = () => {
    Swal.fire({
      icon: "info",
      title: "Oops...",
      text: "Estamos trabajando para brindarte mas información!",
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        confirmButton.style.backgroundColor = "#0f3861";
        confirmButton.style.color = "#ffffff";
      },
    });
  };

  const isImageUrl = (url) => {
    return /\.(jpg|jpeg|png|gif)$/.test(url);
  };

  return (
    <div className={styles.fondo}>
      <div className={styles.contenedor}>
        <div className={styles.encabezado}>
          <img src={revisionImg} alt="revisión imagen" />
          <h1>Revisión de Preguntas - {area}</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.preguntas}>
            <h2>Preguntas</h2>
            <p>
              Navega por cada una de las preguntas para conocer sus respuestas
            </p>
            <hr />
            <div className={styles.numeros}>
              {/* Barra de navegación de preguntas */}
              {numerosPreguntas.map((numero, index) => (
                <div
                  key={index}
                  onClick={() => seleccionarPregunta(numero)}
                  className={`${styles.contenedorNumeros} ${
                    numero === preguntaLocal &&
                    estadoPreguntas.find((e) => e.numero === numero)?.esCorrecta
                      ? styles.numeroSeleccionado
                      : ""
                  } ${
                    numero === preguntaLocal &&
                    !estadoPreguntas.find((e) => e.numero === numero)
                      ?.esCorrecta
                      ? styles.numeroSeleccionadoPerdido
                      : ""
                  }`}
                >
                  <div className={styles.auxiliar}>
                    <div>
                      <span key={numero} className={styles.indice}>
                        {numero}{" "}
                      </span>
                    </div>
                    <div>
                      <img
                        src={
                          estadoPreguntas.find((e) => e.numero === numero)
                            ?.esCorrecta
                            ? ganadaImg
                            : perdidaImg
                        }
                        className={styles.imagenNumeros}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <div>
              {preguntasSimulacroArea
                .filter((p) => p.numero === preguntaLocal)
                .map((pregunta, index) => (
                  <div key={index} className={styles.containerPreguntas}>
                    <div className={styles.preguntas1}>
                      {pregunta.evidencia && <h3>Objetivo de Aprendizaje</h3>}
                      {pregunta.evidencia ? (
                        <p className={styles.contexto}>{pregunta.evidencia}</p>
                      ) : null}

                      {pregunta.tema && <h3>Tema evaluado</h3>}
                      {pregunta.tema ? (
                        <p className={styles.contexto}>{pregunta.tema}</p>
                      ) : null}

                      {pregunta.justificacion && <h3>Justificación</h3>}

                      {pregunta.justificacion ? (
                        <div className={styles.contexto}>
                          {pregunta.justificacion
                            .split("\n")
                            .map((sentence, index) => (
                              <p key={index}>{sentence.trim().slice(0, -2)}</p>
                            ))}
                        </div>
                      ) : null}

                      {pregunta.img_Justificacion &&
                        Object.keys(pregunta.img_Justificacion).length > 0 && (
                          <div
                            className={styles.containerImg}
                            onClick={() => setImagenAmpliada(!imagenAmpliada)}
                          >
                            {imagenAmpliada ? (
                              <div className={styles.imagenAmpliadaContainer}>
                                <img
                                  src={pregunta.img_Justificacion}
                                  className={styles.imagenAmpliada}
                                  alt="Imagen Ampliada"
                                />
                              </div>
                            ) : (
                              <img
                                src={pregunta.img_Justificacion}
                                className={styles.imagen}
                                alt="Imagen Normal"
                              />
                            )}
                          </div>
                        )}

                      {pregunta.opcion_invalida && <h3>Opciones Invalidas</h3>}

                      {pregunta.opcion_invalida ? (
                        <div className={styles.contexto}>
                          {pregunta.opcion_invalida
                            .split("\n")
                            .map((sentence, index) => (
                              <p key={index}>{sentence.trim().slice(0, -2)}</p>
                            ))}
                        </div>
                      ) : null}

                      {pregunta.img_opcion_invalida &&
                        Object.keys(pregunta.img_opcion_invalida).length >
                          0 && (
                          <div
                            className={styles.containerImg}
                            onClick={() => setImagenAmpliada3(!imagenAmpliada3)}
                          >
                            {imagenAmpliada3 ? (
                              <div className={styles.imagenAmpliadaContainer}>
                                <img
                                  src={pregunta.img_opcion_invalida}
                                  className={styles.imagenAmpliada}
                                  alt="Imagen Ampliada"
                                />
                              </div>
                            ) : (
                              <img
                                src={pregunta.img_opcion_invalida}
                                className={styles.imagen}
                                alt="Imagen Normal"
                              />
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
            </div>
            {estadoPreguntas.find((e) => e.numero === preguntaLocal)
              ?.esCorrecta ? (
              <div className={styles.mensaje}>
                <h3 className={styles.mensajeTitulo}>
                  🌟 ¡Maravilloso! <br />
                  Has elegido la respuesta adecuada.
                  <br /> ¡Nos entusiasma tu avance! Continúa por este camino.
                </h3>
                <div className={styles.subMensaje}>
                  <p className={styles.parrafo}>
                    Aprovecha para explorar en detalle este tema y fortalecer
                    aún más tu preparación para las pruebas Saber. Aquí
                    encontrarás recursos adicionales y valiosa información que
                    complementarán tu conocimiento, brindándote una preparación
                    más sólida y efectiva.
                  </p>
                  <img
                    src={resultadosPorPreguntasImg}
                    alt="Imagen de resultados"
                    className={styles.imagenResultado}
                  />
                </div>
                <div className={styles.boton}>
                  <Boton text="Ver más" onClick={submitBoton} />
                </div>
              </div>
            ) : (
              <div className={styles.mensaje2}>
                <h3 className={styles.mensajeTitulo}>
                  🚀 ¡Animo! La práctica constante te acercará al éxito. La
                  preparación es esencial.
                </h3>
                <div className={styles.subMensaje}>
                  <p className={styles.parrafo}>
                    Para reforzar tu comprensión, te proporcionamos material de
                    estudio adicional. Este recurso te será invaluable para
                    profundizar en la respuesta y consolidar tus conocimientos.
                    Dedica tiempo a revisarlo y continúa con tu práctica,
                    ¡estamos seguros de que mejorarás en el próximo intento!
                  </p>
                  <img
                    src={resultadosPorPreguntasImg}
                    alt="Imagen de resultados"
                    className={styles.imagenResultado}
                  />
                </div>
                <div className={styles.boton}>
                  <Boton text="Ver más" onClick={submitBoton} />
                </div>
              </div>
            )}
          </div>
          <div className={styles.prueba}>
            <h2>Prueba: {area}</h2>
            <p>Contenido de la pregunta</p>
            <hr />
            <div>
              {preguntasSimulacroArea
                .filter((p) => p.numero === preguntaLocal)
                .map((pregunta, index) => (
                  <div key={index} className={styles.containerPreguntas}>
                    <div className={styles.preguntas1}>
                      {pregunta.contexto && <h3>Contexto</h3>}

                      {pregunta.titulo_texto ? (
                        <p className={styles.tituloTexto}>
                          {pregunta.titulo_texto}
                        </p>
                      ) : null}

                      {pregunta.contexto ? (
                        <div className={styles.contexto}>
                          {pregunta.contexto
                            .split("\n")
                            .map((sentence, index) => (
                              <p key={index}>{sentence.trim().slice(0, -2)}</p>
                            ))}
                        </div>
                      ) : null}

                      {pregunta.pie_texto ? (
                        <p className={styles.pieTexto}>{pregunta.pie_texto}</p>
                      ) : null}

                      {pregunta.imagen &&
                        Object.keys(pregunta.imagen).length > 0 && (
                          <div
                            className={styles.containerImg}
                            onClick={() => setImagenAmpliada2(!imagenAmpliada2)}
                          >
                            {imagenAmpliada2 ? (
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
                    </div>
                    <div className={styles.preguntas2}>
                      {pregunta.pregunta && <h3>Pregunta</h3>}
                      {pregunta.pregunta ? (
                        <div className={styles.contexto}>
                          {pregunta.pregunta
                            .split("\n")
                            .map((sentence, index) => (
                              <p key={index}>{sentence.trim().slice(0, -2)}</p>
                            ))}
                        </div>
                      ) : null}
                      <h3>Respuestas</h3>
                      <form className={styles.formScroll}>
                        <div className={styles.opcionesRespuestas}>
                          <label
                            className={`${
                              estadoPreguntas.find(
                                (e) => e.numero === preguntaLocal
                              )?.respuestaUsuario?.opcion === "A"
                                ? styles.opcionSeleccionada
                                : ""
                            } ${
                              estadoPreguntas.find(
                                (e) => e.numero === preguntaLocal
                              )?.respuestaCorrecta === "A"
                                ? styles.respuestaCorrecta
                                : ""
                            }`}
                          >
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
                          <label
                            className={`${
                              estadoPreguntas.find(
                                (e) => e.numero === preguntaLocal
                              )?.respuestaUsuario?.opcion === "B"
                                ? styles.opcionSeleccionada
                                : ""
                            } ${
                              estadoPreguntas.find(
                                (e) => e.numero === preguntaLocal
                              )?.respuestaCorrecta === "B"
                                ? styles.respuestaCorrecta
                                : ""
                            }`}
                          >
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
                          <label
                            className={`${
                              estadoPreguntas.find(
                                (e) => e.numero === preguntaLocal
                              )?.respuestaUsuario?.opcion === "C"
                                ? styles.opcionSeleccionada
                                : ""
                            } ${
                              estadoPreguntas.find(
                                (e) => e.numero === preguntaLocal
                              )?.respuestaCorrecta === "C"
                                ? styles.respuestaCorrecta
                                : ""
                            }`}
                          >
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
                        {pregunta.opcionD && (
                          <div className={styles.opcionesRespuestas}>
                            <label
                              className={`${
                                estadoPreguntas.find(
                                  (e) => e.numero === preguntaLocal
                                )?.respuestaUsuario?.opcion === "D"
                                  ? styles.opcionSeleccionada
                                  : ""
                              } ${
                                estadoPreguntas.find(
                                  (e) => e.numero === preguntaLocal
                                )?.respuestaCorrecta === "D"
                                  ? styles.respuestaCorrecta
                                  : ""
                              }`}
                            >
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
                        {pregunta.opcionE && (
                          <div className={styles.opcionesRespuestas}>
                            <label
                              className={`${
                                estadoPreguntas.find(
                                  (e) => e.numero === preguntaLocal
                                )?.respuestaUsuario?.opcion === "E"
                                  ? styles.opcionSeleccionada
                                  : ""
                              } ${
                                estadoPreguntas.find(
                                  (e) => e.numero === preguntaLocal
                                )?.respuestaCorrecta === "E"
                                  ? styles.respuestaCorrecta
                                  : ""
                              }`}
                            >
                              <span className={styles.letra}>E.</span>
                              {isImageUrl(pregunta.opcionE) ? (
                                <img
                                  src={pregunta.opcionE}
                                  alt="Opción E"
                                  className={styles.imagenOpcion}
                                />
                              ) : (
                                <p className={styles.opcion}>
                                  {pregunta.opcionE}
                                </p>
                              )}
                            </label>
                          </div>
                        )}
                        {pregunta.opcionF && (
                          <div className={styles.opcionesRespuestas}>
                            <label
                              className={`${
                                estadoPreguntas.find(
                                  (e) => e.numero === preguntaLocal
                                )?.respuestaUsuario?.opcion === "F"
                                  ? styles.opcionSeleccionada
                                  : ""
                              } ${
                                estadoPreguntas.find(
                                  (e) => e.numero === preguntaLocal
                                )?.respuestaCorrecta === "F"
                                  ? styles.respuestaCorrecta
                                  : ""
                              }`}
                            >
                              <span className={styles.letra}>F.</span>
                              {isImageUrl(pregunta.opcionF) ? (
                                <img
                                  src={pregunta.opcionF}
                                  alt="Opción F"
                                  className={styles.imagenOpcion}
                                />
                              ) : (
                                <p className={styles.opcion}>
                                  {pregunta.opcionF}
                                </p>
                              )}
                            </label>
                          </div>
                        )}
                        {pregunta.opcionG && (
                          <div className={styles.opcionesRespuestas}>
                            <label
                              className={`${
                                estadoPreguntas.find(
                                  (e) => e.numero === preguntaLocal
                                )?.respuestaUsuario?.opcion === "G"
                                  ? styles.opcionSeleccionada
                                  : ""
                              } ${
                                estadoPreguntas.find(
                                  (e) => e.numero === preguntaLocal
                                )?.respuestaCorrecta === "G"
                                  ? styles.respuestaCorrecta
                                  : ""
                              }`}
                            >
                              <span className={styles.letra}>G.</span>
                              {isImageUrl(pregunta.opcionD) ? (
                                <img
                                  src={pregunta.opcionG}
                                  alt="Opción G"
                                  className={styles.imagenOpcion}
                                />
                              ) : (
                                <p className={styles.opcion}>
                                  {pregunta.opcionG}
                                </p>
                              )}
                            </label>
                          </div>
                        )}
                        {pregunta.opcionH && (
                          <div className={styles.opcionesRespuestas}>
                            <label
                              className={`${
                                estadoPreguntas.find(
                                  (e) => e.numero === preguntaLocal
                                )?.respuestaUsuario?.opcion === "H"
                                  ? styles.opcionSeleccionada
                                  : ""
                              } ${
                                estadoPreguntas.find(
                                  (e) => e.numero === preguntaLocal
                                )?.respuestaCorrecta === "H"
                                  ? styles.respuestaCorrecta
                                  : ""
                              }`}
                            >
                              <span className={styles.letra}>H.</span>
                              {isImageUrl(pregunta.opcionH) ? (
                                <img
                                  src={pregunta.opcionH}
                                  alt="Opción D"
                                  className={styles.imagenOpcion}
                                />
                              ) : (
                                <p className={styles.opcion}>
                                  {pregunta.opcionH}
                                </p>
                              )}
                            </label>
                          </div>
                        )}
                      </form>
                    </div>
                    <div className={styles.botonRegreso}>
                      <Link
                        to={`/usuario/resultados/resultado/${simulacroFinalizado?.resultadoSimulacro?.id}`}
                        className={styles.link}
                      >
                        <Boton text="Regresar" />
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevisionPreguntas;
