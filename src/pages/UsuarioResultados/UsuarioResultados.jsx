import styles from "./UsuarioResultados.module.css";
import bannerUsuarioResultadosImg from "../../assets/bannerUsuarioResultadosImg.png";
import { formatearFecha } from "../../helpers/formatearFecha";
import Boton from "../../components/Boton/Boton";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import { Link } from "react-router-dom";

const UsuarioResultados = () => {
  const { simulacrosCompletados, obtenerSimulacroFinalizado, setSimulacroId,obtenerPosicionSimulacro, obtenerPosicionPorArea } =
    usePerfilUsuario();

  return (
    <div className={styles.fondo}>
      <div className={styles.container}>
        <div className={styles.contenedor}>
          <div className={styles.banner}>
            <div className={styles.bannerParrafo}>
              <h1 className={styles.bannerTitulo}>Resultados</h1>
              <p className={styles.bannerContenido}>
                Explora tus resultados y revisa tu progreso para avanzar en tus
                habilidades.
                <br />
                <br />
                Sigue trabajando en ti y verás los resultados.
              </p>
            </div>
            <img src={bannerUsuarioResultadosImg} alt="Banner Resultados" />
          </div>
          <h2 className={styles.subtitulo}>Simulacros Realizados</h2>
          <table className={styles.tablaEncabezado}>
            <thead>
              <tr>
                <th>Simulacro</th>
                <th>Puntaje Global</th>
                <th>Numero de Preguntas</th>
                <th>Tiempo</th>
                <th>Fecha de Aplicación</th>
              </tr>
            </thead>
            <tbody>
              {simulacrosCompletados.length ? (
                simulacrosCompletados.map((simulacro) => (
                  <tr key={simulacro.id}>
                    <td>{simulacro.simulacro.titulo}</td>
                    <td>{simulacro.puntaje_global}</td>
                    <td>{simulacro.simulacro.cantidad_preguntas}</td>
                    <td>{simulacro.tiempo_prueba}</td>
                    <td>{formatearFecha(simulacro.updatedAt)}</td>
                    <td className={styles.boton}>
                      <Link to={`/usuario/resultados/resultado/${simulacro.id}`} className={styles.link}>
                        <Boton
                          text="Ver mas"
                          onClick={() => {
                            obtenerSimulacroFinalizado(simulacro.id);
                            setSimulacroId(simulacro.simulacro.id);
                            obtenerPosicionSimulacro(simulacro.id_simulacro, simulacro.id_usuario)
                            obtenerPosicionPorArea(simulacro.id_simulacro, simulacro.id_usuario)
                          }}
                        />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No hay simulacros disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsuarioResultados;
