import styles from "./Resultados.module.css";
import resultadosColorImg from "../../assets/resultadosColorImg.png";
import usuarioResultadosImg from "../../assets/usuarioResultadosImg.png";
import colegioResultadoImg from "../../assets/colegioResultadoImg.png";
import fechaResultadosImg from "../../assets/fechaResultadosImg.png";
import trofeoImg from "../../assets/trofeoImg.png";
import tiempoImg from "../../assets/tiempoImg.png";
import respuestasCorrectasImg from "../../assets/respuestasCorrectasImg.png";
import posicionImg from "../../assets/posicionImg.png";
import matematicasImg from "../../assets/matematicasImg.png";
import lecturaImg from "../../assets/lecturaImg.png";
import socialesImg from "../../assets/socialesImg.png";
import naturalesImg from "../../assets/naturalesImg.png";
import inglesImg from "../../assets/inglesImg.png";
import nivelInsuficienteImg from "../../assets/nivelInsuficienteImg.png";
import nivelMininimoImg from "../../assets/nivelMininimoImg.png";
import nivelSatisfactorioImg from "../../assets/nivelSatisfactorioImg.png";
import nivelAvanzadoImg from "../../assets/nivelAvanzadoImg.png";
import { formatearFecha } from "../../helpers/formatearFecha";
import Boton from "../../components/Boton/Boton";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import ModalDetallesResultados from "../../components/ModalDetallesResultados/ModalDetallesResultados";
import { Link } from "react-router-dom";

const Resultados = () => {
  const {
    simulacroFinalizado,
    handleResultadoArea,
    filtrarPreguntasSimulacrosPorArea,
  } = usePerfilUsuario();

  console.log(simulacroFinalizado);
  const totalSegundos =
    simulacroFinalizado.resultadoSimulacro.tiempo_prueba || 0;
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;
  const horasRestantes =
    simulacroFinalizado.resultadoSimulacro.simulacro.tiempo === "18000"
      ? 5 - horas
      : 9 - horas;

  let totalPreguntas = 0;
  let respuestasCorrectas = 0;

  const estado_preguntas =
    simulacroFinalizado.resultadoSimulacro.estado_preguntas || [];

  if (Array.isArray(estado_preguntas)) {
    for (const pregunta of estado_preguntas) {
      totalPreguntas++;
      if (pregunta.esCorrecta) {
        respuestasCorrectas++;
      }
    }
  } else {
    console.error("estado_preguntas no es un arreglo");
  }

  const nivelPorArea =
    simulacroFinalizado.resultadoSimulacro.nivel_por_area || {};
  const puntajePorArea =
    simulacroFinalizado.resultadoSimulacro.puntaje_por_area || {};

  return (
    <div>
      <div className={styles.contenedor}>
        <div className={styles.fondo}>
          <div className={styles.encabezado}>
            <img src={resultadosColorImg} />
            <h1>Reporte de Resultados</h1>
          </div>
          <div className={styles.container}>
            <h3>Datos del Usuario</h3>
            <div className={styles.contenedorDatosUsuarios}>
              <div className={styles.datosUsuario}>
                <div className={styles.contenedorDatos}>
                  <div className={styles.contenedorIcono}>
                    <img src={usuarioResultadosImg} className={styles.iconos} />
                  </div>
                  <h3>
                    {
                      simulacroFinalizado.resultadoSimulacro.usuario
                        .nombreUsuario
                    }
                  </h3>
                </div>
                <div className={styles.informacionDatos}>
                  <p>
                    Grado:{" "}
                    {simulacroFinalizado.resultadoSimulacro.usuario.grado}
                  </p>
                </div>
              </div>
              <div className={styles.datosUsuario}>
                <div className={styles.contenedorDatos}>
                  <div className={styles.contenedorIcono}>
                    <img src={colegioResultadoImg} className={styles.iconos} />
                  </div>
                  <h3>
                    {simulacroFinalizado.resultadoSimulacro.usuario.colegio}
                  </h3>
                </div>
                <div className={styles.informacionDatos}></div>
              </div>
              <div className={styles.datosUsuario}>
                <div className={styles.contenedorDatos}>
                  <div className={styles.contenedorIcono}>
                    <img src={fechaResultadosImg} className={styles.iconos} />
                  </div>
                  <h3>
                    Aplicación del Simulacro{" "}
                    {simulacroFinalizado.resultadoSimulacro.simulacro.titulo}
                  </h3>
                </div>
                <div className={styles.informacionDatos}>
                  <p>
                    {formatearFecha(
                      simulacroFinalizado.resultadoSimulacro.createdAt
                    )}
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <h3>Reporte general</h3>
            <div className={styles.contenedorDatosUsuarios}>
              <div className={styles.datosUsuario}>
                <div className={styles.contenedorDatos}>
                  <div className={styles.contenedorIcono}>
                    <img src={trofeoImg} className={styles.iconos} />
                  </div>
                  <h3>Puntaje Global</h3>
                </div>
                <div className={styles.informacionDatos}>
                  <h1>
                    {simulacroFinalizado.resultadoSimulacro.puntaje_global}
                    <span className={styles.puntajeGlobal}>/500</span>
                  </h1>
                </div>
              </div>
              <div className={styles.datosUsuario}>
                <div className={styles.contenedorDatos}>
                  <div className={styles.contenedorIcono}>
                    <img src={tiempoImg} className={styles.iconos} />
                  </div>
                  <h3>Tiempo empleado</h3>
                </div>
                <div className={styles.informacionDatos}>
                  <h1>
                    {horasRestantes}h:{minutos}&apos;:{segundos}&quot;
                  </h1>
                </div>
              </div>
              <div className={styles.datosUsuario}>
                <div className={styles.contenedorDatos}>
                  <div className={styles.contenedorIcono}>
                    <img
                      src={respuestasCorrectasImg}
                      className={styles.iconos}
                    />
                  </div>
                  <h3>Respuestas correctas</h3>
                </div>
                <div className={styles.informacionDatos}>
                  <h1>
                    {respuestasCorrectas}/{totalPreguntas}
                  </h1>
                </div>
              </div>
              <div className={styles.datosUsuario}>
                <div className={styles.contenedorDatos}>
                  <div className={styles.contenedorIcono}>
                    <img src={posicionImg} className={styles.iconos} />
                  </div>
                  <h3>Posición en el simulacro</h3>
                </div>
                <div className={styles.informacionDatos}>
                  <h1>1</h1>
                </div>
              </div>
            </div>
            <hr />
            <h3>Resultado por prueba</h3>
            <div className={styles.containerResultado}>
              {Object.keys(nivelPorArea).map((area, index) => (
                <div className={styles.nivel} key={index}>
                  <div className={styles.areaimg}>
                    <div className={styles.contenedorIcono}>
                      {area === "Matemáticas" && (
                        <img src={matematicasImg} className={styles.iconos} />
                      )}
                      {area === "Lectura Critica" && (
                        <img src={lecturaImg} className={styles.iconos} />
                      )}
                      {area === "Sociales" && (
                        <img src={socialesImg} className={styles.iconos} />
                      )}
                      {area === "Naturales" && (
                        <img src={naturalesImg} className={styles.iconos} />
                      )}
                      {area === "Ingles" && (
                        <img src={inglesImg} className={styles.iconos} />
                      )}
                    </div>
                    <h3>{area}</h3>
                  </div>
                  <h4 className={styles.parrafoNivel}>Nivel de desempeño</h4>
                  <div>
                    {(nivelPorArea[area] === "Insuficiente" ||
                      nivelPorArea[area] === "-A") && (
                      <div className={styles.contenedorImagen}>
                        <img src={nivelInsuficienteImg} />
                        <p>{nivelPorArea[area]}</p>
                      </div>
                    )}
                    {(nivelPorArea[area] === "Mínimo" ||
                      nivelPorArea[area] === "A1") && (
                      <div className={styles.contenedorImagen}>
                        <img src={nivelMininimoImg} />
                        <p>{nivelPorArea[area]}</p>
                      </div>
                    )}
                    {(nivelPorArea[area] === "Satisfactorio" ||
                      nivelPorArea[area] === "A2") && (
                      <div className={styles.contenedorImagen}>
                        <img src={nivelSatisfactorioImg} />
                        <p>{nivelPorArea[area]}</p>
                      </div>
                    )}
                    {(nivelPorArea[area] === "Avanzado" ||
                      nivelPorArea[area] === "B1") && (
                      <div className={styles.contenedorImagen}>
                        <img src={nivelAvanzadoImg} />
                        <p>{nivelPorArea[area]}</p>
                      </div>
                    )}
                  </div>
                  <div className={styles.puntajeArea}>
                    <h4>Puntaje:</h4>
                    <h3 className={styles.resultadoArea}>
                      {puntajePorArea[area]}/100
                    </h3>
                  </div>
                  <p>Posición en esta prueba:</p>
                  <h3 className={styles.posicion}>1</h3>
                  <div className={styles.boton}>
                    <Boton
                      text="Ver detalles"
                      onClick={() =>
                        handleResultadoArea({
                          puntaje: puntajePorArea[area],
                          nivel: nivelPorArea[area],
                          puesto: 1,
                          area,
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <h3>Preguntas</h3>
            {Object.keys(nivelPorArea).map((area, index) => (
              <div className={styles.nivel2} key={index}>
                <div className={styles.areaimg2}>
                  <div className={styles.contenedorIcono}>
                    {/* Mostrar icono según el área */}
                    {area === "Matemáticas" && (
                      <img src={matematicasImg} className={styles.iconos} />
                    )}
                    {area === "Lectura Critica" && (
                      <img src={lecturaImg} className={styles.iconos} />
                    )}
                    {area === "Sociales" && (
                      <img src={socialesImg} className={styles.iconos} />
                    )}
                    {area === "Naturales" && (
                      <img src={naturalesImg} className={styles.iconos} />
                    )}
                    {area === "Ingles" && (
                      <img src={inglesImg} className={styles.iconos} />
                    )}
                  </div>
                  <p className={styles.areaPregunta}>{area}</p>

                  <Link className={styles.link} to={`/usuario/revision-preguntas/${area}`}>
                    <div className={styles.boton2}>
                      <Boton
                        text="Ver preguntas"
                        onClick={() => filtrarPreguntasSimulacrosPorArea(area)}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ModalDetallesResultados />
      </div>
    </div>
  );
};

export default Resultados;
