import styles from "./UsuarioPruebas.module.css";
import preguntasImg from "../../assets/preguntasImg.png";
import tiempoImg from "../../assets/tiempoImg.png";
import { Fragment, useEffect, useState } from "react";
import Boton from "../../components/Boton/Boton";
import { Link } from "react-router-dom";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import { FormatearTiempo } from "../../helpers/FormatearTiempo";
import NoResultado from "../../components/NoResultado/NoResultado";
import useAuth from "../../hooks/useAuth";

const UsuarioPruebas = () => {
  const {
    simulacrosUsuario,
    simulacrosCompletados,
    puntajePorSimulacro,
    obtenerSimulacroFinalizado,
    setSimulacroId,
    obtenerPosicionSimulacro,
    obtenerPosicionPorArea,
  } = usePerfilUsuario();

  const { auth } = useAuth();

  const simulacrosFiltrados = simulacrosUsuario.filter(
    (simulacro) => simulacro.grado === auth.grado && simulacro.activo
  );

  const [puntajeSimulacroMap, setPuntajeSimulacroMap] = useState({});

  useEffect(() => {
    // Crear un mapa de puntajes para acceder fácilmente a ellos
    const puntajeMap = puntajePorSimulacro.reduce((map, puntaje) => {
      map[puntaje.id_simulacro] = puntaje.max_puntaje_global;
      return map;
    }, {});
    setPuntajeSimulacroMap(puntajeMap);
  }, [puntajePorSimulacro]);

  return (
    <Fragment>
      <div className={styles.fondo}>
        <div className={styles.container}>
          <div className={styles.containerPruebas}>
            {simulacrosFiltrados.length > 0 ? (
              simulacrosFiltrados.map((simulacro) => {
                // Verificar si el simulacro actual está en simulacrosCompletados
                const simulacroCompletado = simulacrosCompletados.find(
                  (sc) => sc.id_simulacro === simulacro.id
                );

                // Obtener el puntaje máximo global correspondiente al simulacro actual
                const puntajeMaximo =
                  puntajeSimulacroMap[simulacro.id] || simulacro.puntaje_maximo;

                return (
                  <div key={simulacro.id} className={styles.simulacros}>
                    <img src={simulacro.imagen} className={styles.imagen} />
                    <div className={styles.titulo}>
                      <h3>{simulacro.titulo}</h3>
                      <h3>{simulacro.grado}</h3>
                    </div>
                    <p className={styles.descripcion}>
                      {simulacro.descripcion}
                    </p>
                    <div className={styles.contenedor2}>
                      <div className={styles.preguntas}>
                        <img src={preguntasImg} className={styles.icono} />
                        <p>{simulacro.cantidad_preguntas} Preguntas</p>
                      </div>
                      <div className={styles.preguntas}>
                        <img src={tiempoImg} className={styles.icono} />
                        <p>{FormatearTiempo(simulacro.tiempo)}</p>
                      </div>
                    </div>
                    <p className={styles.puntaje}>
                      Puntaje Máximo: {puntajeMaximo}
                    </p>
                    <div className={styles.boton}>
                      {simulacroCompletado ? (
                        <Link
                          to={`/usuario/resultados/resultado/${simulacroCompletado.id}`}
                          className={styles.link}
                        >
                          <div className={styles.preguntas}>
                            <Boton
                              text="Ver mi resultado"
                              onClick={() => {
                                obtenerSimulacroFinalizado(
                                  simulacroCompletado.id
                                );
                                setSimulacroId(
                                  simulacroCompletado.simulacro.id
                                );
                                obtenerPosicionSimulacro(
                                  simulacroCompletado.id_simulacro,
                                  simulacroCompletado.id_usuario
                                );
                                obtenerPosicionPorArea(
                                  simulacroCompletado.id_simulacro,
                                  simulacroCompletado.id_usuario
                                );
                              }}
                            />
                          </div>
                        </Link>
                      ) : (
                        <Link
                          to={`/usuario/confirmar-prueba/${simulacro.id}`}
                          className={styles.link}
                        >
                          <div className={styles.preguntas}>
                            <Boton text="Realizar Simulacro" />
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <NoResultado text="No hay simulacros disponibles" />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UsuarioPruebas;
