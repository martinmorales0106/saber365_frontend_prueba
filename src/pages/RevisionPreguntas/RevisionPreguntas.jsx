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

  console.log(preguntasSimulacroArea);
  const [estadoPreguntas, setEstadoPreguntas] = useState([]);
  const [preguntaLocal, setPreguntaLocal] = useState(0);

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
        setEstadoPreguntas(preguntas);
      }
    };
    fetchSimulacroArea();
  }, [area, simulacroFinalizado]);

  useEffect(() => {
    // Recuperar la pregunta seleccionada de sessionStorage
    const preguntaSeleccionada = sessionStorage.getItem('preguntaSeleccionada');
    if (preguntaSeleccionada) {
      setPreguntaLocal(parseInt(preguntaSeleccionada));
    }
  }, []);

  useEffect(() => {
    // Guardar la pregunta seleccionada en sessionStorage
    sessionStorage.setItem('preguntaSeleccionada', preguntaLocal);
  }, [preguntaLocal]);

  useEffect(() => {
    return () => {
      // Limpiar sessionStorage cuando el componente se desmonte
      sessionStorage.removeItem('preguntaSeleccionada');
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

  const numerosPreguntas = estadoPreguntas?.map((pregunta, index) => index + 1);

  const seleccionarPregunta = (numeroPregunta) => {
    setPreguntaLocal(numeroPregunta - 1);
  };

const submitBoton = ()=>{
  Swal.fire({
    icon: "info",
    title: "Oops...",
    text: "Estamos trabajando para brindarte mas información!",
    didOpen: () => {
      const confirmButton = Swal.getConfirmButton();
      confirmButton.style.backgroundColor = '#0f3861';
      confirmButton.style.color = '#ffffff';
    }
  });
}
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
                    numero === preguntaLocal + 1 &&
                    estadoPreguntas[numero - 1]?.esCorrecta
                      ? styles.numeroSeleccionado
                      : ""
                  } ${
                    numero === preguntaLocal + 1 &&
                    !estadoPreguntas[numero - 1]?.esCorrecta
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
                          estadoPreguntas[numero - 1]?.esCorrecta
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
            <div>
  
              {preguntasSimulacroArea
                .slice(preguntaLocal, preguntaLocal + 1)
                .map((pregunta, index) => (
                  <div key={index} className={styles.containerPreguntas}>
                    <div className={styles.preguntas1}>
                    <h2>Objetivo de Aprendizaje</h2>
                      {pregunta.evidencia ? (
                        <p className={styles.contexto}>{pregunta.evidencia}</p>
                      ) : null}

                      <h2>Justificación</h2>
                      {pregunta.justificacion ? (
                        <p className={styles.contexto}>{pregunta.justificacion}</p>
                      ) : null}
                      {pregunta.img_Justificacion ? (
                        <p className={styles.contexto}>{pregunta.img_Justificacion}</p>
                      ) : null}
                    </div>
                  </div>
                ))}
            </div>
            {estadoPreguntas[preguntaLocal]?.esCorrecta ? (
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
                  <Boton text="Ver más" onClick={submitBoton}/>
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
                  <Boton text="Ver más" onClick={submitBoton}/>
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
                .slice(preguntaLocal, preguntaLocal + 1)
                .map((pregunta, index) => (
                  <div key={index} className={styles.containerPreguntas}>
                    <div className={styles.preguntas1}>
                      <h2>Contexto</h2>
                      {pregunta.contexto ? (
                        <p className={styles.contexto}>{pregunta.contexto}</p>
                      ) : null}

                      {Object.keys(pregunta.imagen).length > 0 && (
                        <div className={styles.containerImg}>
                          <img
                            src={pregunta.imagen}
                            className={styles.imagen}
                            alt="Imagen Normal"
                          />
                        </div>
                      )}
                    </div>
                    <div className={styles.preguntas2}>
                      <h2>Pregunta</h2>
                      <p className={styles.pregunta}>{pregunta.pregunta}</p>
                      <h2>Respuestas</h2>
                      <form>
                        <div className={styles.opcionesRespuestas}>
                          <label
                            className={`${
                              estadoPreguntas[preguntaLocal]
                                ?.respuestaUsuario === "A"
                                ? styles.opcionSeleccionada
                                : ""
                            } ${
                              estadoPreguntas[preguntaLocal]
                                ?.respuestaCorrecta === "A"
                                ? styles.respuestaCorrecta
                                : ""
                            }`}
                          >
                            <span className={styles.letra}>A.</span>
                            <p className={styles.opcion}>{pregunta.opcionA}</p>
                          </label>
                        </div>
                        <div className={styles.opcionesRespuestas}>
                          <label
                            className={`${
                              estadoPreguntas[preguntaLocal]
                                ?.respuestaUsuario === "B"
                                ? styles.opcionSeleccionada
                                : ""
                            } ${
                              estadoPreguntas[preguntaLocal]
                                ?.respuestaCorrecta === "B"
                                ? styles.respuestaCorrecta
                                : ""
                            }`}
                          >
                            <span className={styles.letra}>B.</span>
                            <p className={styles.opcion}>{pregunta.opcionB}</p>
                          </label>
                        </div>
                        <div className={styles.opcionesRespuestas}>
                          <label
                            className={`${
                              estadoPreguntas[preguntaLocal]
                                ?.respuestaUsuario === "C"
                                ? styles.opcionSeleccionada
                                : ""
                            } ${
                              estadoPreguntas[preguntaLocal]
                                ?.respuestaCorrecta === "C"
                                ? styles.respuestaCorrecta
                                : ""
                            }`}
                          >
                            <span className={styles.letra}>C.</span>
                            <p className={styles.opcion}>{pregunta.opcionC}</p>
                          </label>
                        </div>
                        <div className={styles.opcionesRespuestas}>
                          <label
                            className={`${
                              estadoPreguntas[preguntaLocal]
                                ?.respuestaUsuario === "D"
                                ? styles.opcionSeleccionada
                                : ""
                            } ${
                              estadoPreguntas[preguntaLocal]
                                ?.respuestaCorrecta === "D"
                                ? styles.respuestaCorrecta
                                : ""
                            }`}
                          >
                            <span className={styles.letra}>D.</span>
                            <p className={styles.opcion}>{pregunta.opcionD}</p>
                          </label>
                        </div>
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
