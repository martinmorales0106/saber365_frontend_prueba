import { useState } from "react";
import styles from "./TopPuntajes.module.css"; // Asegúrate de tener los estilos listos
import { FormatearTiempo } from "../../../helpers/FormatearTiempo";
import PropTypes from "prop-types";
import matematicasImg from "../../../assets/matematicasImg.png";
import lecturaImg from "../../../assets/lecturaImg.png";
import socialesImg from "../../../assets/socialesImg.png";
import naturalesImg from "../../../assets/naturalesImg.png";
import inglesImg from "../../../assets/inglesImg.png";
import ciudadanaImg from "../../../assets/ciudadanaImg.png";

// Función para obtener la imagen correspondiente a cada área
const getAreaImage = (area) => {
  switch (area) {
    case "Matemáticas":
      return matematicasImg;
    case "Lectura Crítica":
      return lecturaImg;
    case "Lenguaje":
      return lecturaImg;
    case "Sociales":
      return socialesImg;
    case "C. Ciudadanas":
      return ciudadanaImg;
    case "Naturales":
      return naturalesImg;
    case "Inglés":
      return inglesImg;
    default:
      return null;
  }
};

const TopPuntajes = ({
  topPuntajeGlobal,
  miPuntaje,
  isUserInTopPuntajes,
  topPuntajePorArea,
}) => {
  const [areaSeleccionada, setAreaSeleccionada] = useState("Matemáticas");

  return (
    <>
      {topPuntajeGlobal.mejoresPuntajesGlobales.length > 0 && (
        <h2 className={styles.h2MejorePuntajes}>🏆 Top mejores puntajes</h2>
      )}

      <div className={styles.contenedorTop}>
        {/* Top puntajes globales */}
        <div className={styles.topEstudiantes}>
          {topPuntajeGlobal.mejoresPuntajesGlobales.length > 0 && (
            <>
              <h4>Según puntajes globales</h4>
              <p className={styles.subtitulo}>
                Estos son los estudiantes con los mejores resultados generales
                en todo los simulacros.
              </p>
            </>
          )}

          {topPuntajeGlobal.mejoresPuntajesGlobales.length > 0 && (
            <ol className={styles.listaPuntajes}>
              {topPuntajeGlobal.mejoresPuntajesGlobales.map(
                (puntaje, index) => (
                  <li
                    key={index}
                    className={`${styles.itemPuntaje} ${
                      puntaje.nombreUsuario === miPuntaje?.nombreUsuario
                        ? styles.bordeVerde
                        : ""
                    }`}
                  >
                    <div className={styles.usuarioInfo}>
                      <span className={styles.nombreUsuario}>
                        {puntaje.nombreUsuario}
                      </span>
                      <span className={styles.grado}>{puntaje.grado}</span>
                    </div>
                    <div className={styles.usuarioInfo2}>
                      <span className={styles.puntajeGlobal}>
                        {Math.ceil(puntaje.puntaje_global)}
                      </span>
                      <span className={styles.tiempoPrueba}>
                        {FormatearTiempo(
                          puntaje.tiempo - puntaje.tiempo_prueba
                        )}
                      </span>
                    </div>
                    <div>
                      <span className={styles.tituloSimulacro}>
                        {puntaje.titulo}
                      </span>
                    </div>
                  </li>
                )
              )}
            </ol>
          )}

          {!isUserInTopPuntajes && miPuntaje && (
            <div className={styles.miPuntaje}>
              <div className={styles.contenedorNumero}>
                <span className={styles.indiceNumero}>
                  {miPuntaje.posicion}
                </span>
              </div>
              <div className={styles.usuarioInfo}>
                <span className={styles.nombreUsuario}>
                  {miPuntaje.nombreUsuario}
                </span>
                <span className={styles.grado}>{miPuntaje.grado}</span>
              </div>
              <div className={styles.usuarioInfo2}>
                <span className={styles.puntajeGlobal}>
                  {Math.ceil(miPuntaje.puntaje_global)}
                </span>
                <span className={styles.tiempoPrueba}>
                  {FormatearTiempo(miPuntaje.tiempo - miPuntaje.tiempo_prueba)}
                </span>
              </div>
              <div>
                <span className={styles.tituloSimulacro}>
                  {miPuntaje.titulo}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Top puntajes por área */}
        <div className={styles.contenedorPorArea}>
          {topPuntajePorArea["Matemáticas"]?.mejoresPuntajesPorArea?.length >
            0 && (
            <>
              <h4>Según puntajes por área</h4>
              <p className={styles.subtitulo}>
                Ranking de los estudiantes con mejores resultados en cada área
                específica. Selecciona el área que deseas ver.
              </p>
            </>
          )}

          {Object.keys(topPuntajePorArea).map((area) => (
            <button
              key={area}
              className={`${styles.botonArea} ${
                areaSeleccionada === area ? styles.botonActivo : ""
              }`}
              onClick={() => setAreaSeleccionada(area)}
            >
              {area}
            </button>
          ))}

          {topPuntajePorArea["Matemáticas"]?.mejoresPuntajesPorArea?.length >
            0 && (
            <div className={styles.areasContainer}>
              {[areaSeleccionada].map((area, index) => {
                const areaData = topPuntajePorArea[area];

                if (
                  !areaData?.mayorPuntajeUsuario &&
                  areaData?.mejoresPuntajesPorArea?.length === 0
                ) {
                  return (
                    <div key={index} className={styles.areaVacia}>
                      <p>
                        No hay puntajes registrados para el área{" "}
                        <strong>{area}</strong>.
                      </p>
                    </div>
                  );
                }

                return (
                  <div key={index} className={styles.areaItem}>
                    <div className={styles.contenedorlogo}>
                      <img
                        src={getAreaImage(area)}
                        alt={`${area} logo`}
                        className={styles.areaImg}
                      />
                      <h4 className={styles.area}>{area}</h4>
                    </div>
                    <div className={styles.areaPuntajes}>
                      <ul className={styles.listaMejoresPuntajes}>
                        {areaData?.mejoresPuntajesPorArea.map(
                          (puntaje, index) => (
                            <li
                              key={index}
                              className={`${styles.itemPuntaje2} ${
                                puntaje.id_usuario === miPuntaje?.id_usuario
                                  ? styles.bordeVerde
                                  : ""
                              }`}
                            >
                              <div className={styles.usuarioInfo}>
                                <span className={styles.nombreUsuario}>
                                  {puntaje.nombreUsuario}
                                </span>
                                <span className={styles.grado}>
                                  {puntaje.grado}
                                </span>
                              </div>
                              <div className={styles.usuarioInfo2}>
                                <span className={styles.puntajeArea}>
                                  {Math.ceil(puntaje.puntaje_area)}
                                </span>
                              </div>
                              <div>
                                <span className={styles.tituloSimulacro}>
                                  {puntaje.titulo}
                                </span>
                              </div>
                            </li>
                          )
                        )}
                        {!areaData?.mejoresPuntajesPorArea?.some(
                          (p) =>
                            p.id_usuario ===
                            areaData?.mayorPuntajeUsuario?.id_usuario
                        ) &&
                          areaData?.mayorPuntajeUsuario && (
                            <div className={styles.miPuntaje}>
                              <div className={styles.contenedorNumero}>
                                <span className={styles.indiceNumero}>
                                  {areaData?.mayorPuntajeUsuario?.posicion}
                                </span>
                              </div>
                              <div className={styles.usuarioInfo}>
                                <span className={styles.nombreUsuario}>
                                  {areaData?.mayorPuntajeUsuario?.nombreUsuario}
                                </span>
                                <span className={styles.grado}>
                                  {areaData?.mayorPuntajeUsuario?.grado}
                                </span>
                              </div>
                              <div className={styles.usuarioInfo2}>
                                <span className={styles.puntajeArea}>
                                  {Math.ceil(
                                    areaData?.mayorPuntajeUsuario?.puntaje_area
                                  )}
                                </span>
                              </div>
                              <div>
                                <span className={styles.tituloSimulacro}>
                                  {areaData?.mayorPuntajeUsuario?.titulo}
                                </span>
                              </div>
                            </div>
                          )}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

TopPuntajes.propTypes = {
  topPuntajeGlobal: PropTypes.object.isRequired,
  topPuntajePorArea: PropTypes.object.isRequired,
  miPuntaje: PropTypes.object,
  isUserInTopPuntajes: PropTypes.bool,
  areaSeleccionada: PropTypes.string,
  setAreaSeleccionada: PropTypes.func.isRequired,
};

export default TopPuntajes;
