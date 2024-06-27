import styles from "./UsuarioPruebas.module.css";
import preguntasImg from "../../assets/preguntasImg.png";
import tiempoImg from "../../assets/tiempoImg.png";
import { Fragment } from "react";
import Boton from "../../components/Boton/Boton";
import { Link } from "react-router-dom";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import { FormatearTiempo } from "../../helpers/FormatearTiempo";

const UsuarioPruebas = () => {
  const { simulacrosUsuario } = usePerfilUsuario();

  // Verifica si simulacrosComprados.simulacrosComprados es un array antes de realizar el mapeo

  return (
    <Fragment>
      <div className={styles.fondo}>
        <div className={styles.container}>
          <div className={styles.containerPruebas}>
            {simulacrosUsuario.length ? (
              simulacrosUsuario.map((simulacro) => (
                <div key={simulacro.id} className={styles.simulacros}>
                  <img src={simulacro.imagen} className={styles.imagen} />
                  <div className={styles.titulo}>
                    <h3>{simulacro.titulo}</h3>
                    <h3>{simulacro.grado}</h3>
                  </div>
                  <p className={styles.descripcion}>{simulacro.descripcion}</p>
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
                    Puntaje Máximo: {simulacro.puntaje_maximo}
                  </p>
                  <div className={styles.boton}>
                    <Link to={`/usuario/confirmar-prueba/${simulacro.id}`} className={styles.link}>
                      <div className={styles.preguntas}>
                        <Boton text="Realizar Simulacro" />
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div>No hay simulacros disponibles</div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UsuarioPruebas;
