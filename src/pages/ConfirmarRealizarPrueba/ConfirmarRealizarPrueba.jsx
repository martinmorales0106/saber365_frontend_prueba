import { Link, useParams } from "react-router-dom";
import styles from "./ConfirmarRealizarPrueba.module.css";
import sesionGratis from "../../assets/sesionGratis.png";
import iniciarPruebaImg from "../../assets/iniciarPruebaImg.png";
import tablaPreguntasGratis from "../../assets/tablaPreguntasGratis.png";

import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import Boton from "../../components/Boton/Boton";
import { useEffect } from "react";


const ConfirmarRealizarPrueba = () => {
  const { id } = useParams();
  const { simulacrosUsuario } = usePerfilUsuario();
  const { setSimulacroId } = usePerfilUsuario();

  useEffect(() => {
    setSimulacroId(id); // Ahora se actualiza después del renderizado
  }, [setSimulacroId, id]);

  const simulacroEncontrado = simulacrosUsuario.find(
    (simulacro) => simulacro.id === parseInt(id, 10)
  );

  // Si el simulacro no se ha encontrado, mostrar un mensaje adecuado
  if (!simulacroEncontrado) {
    return <p>Cargando simulacro o no encontrado...</p>;
  }

  return (
    <div className={styles.content}>
      <div className={styles.imagen}>
        <div className={styles.contenedorImagen}>
          <img
            src={simulacroEncontrado.imagen}
            className={styles.imagenCuadernillo}
          />
        </div>
        <p>
          Las cinco pruebas del Simulacro {simulacroEncontrado.titulo} se
          dividen en una sesión:
        </p>
        <div className={styles.sesion1Img}>
          <img src={sesionGratis} className={styles.sesion1} />
        </div>
        <p className={styles.estructuraCuadernillo}>
          Estructura del Simulacro {simulacroEncontrado.titulo}{" "}
        </p>
        <div className={styles.tablaPreguntas}>
          <img
            src={tablaPreguntasGratis}
            className={styles.imgTablaPreguntas}
          />
        </div>
      </div>
      <div className={styles.detalles}>
        <div className={styles.encabezado}>
          <h1 className={styles.titulo}>
            Bienvenido al Simulacro {simulacroEncontrado.titulo} de Saber365
          </h1>
          <img
            className={styles.iniciarPrueba}
            src={iniciarPruebaImg}
            alt="Computador con opciones de preguntas"
          />
        </div>
        <h2 className={styles.parrafo1}>
          Lee las siguientes instrucciones para realizar la prueba:
        </h2>
        <h3 className={styles.subtitulo}>Condiciones para la Realización:</h3>
        <ul className={styles.viñetas}>
          <li>Requiere un tiempo disponible de 5 horas para esta sesión.</li>
          <li>
            <strong>Solo se permite un intento por sesión.</strong>
          </li>
          <li>
            Obtendrás puntaje hasta que hayas finalizado la sesion completa del
            simulacro.
          </li>
          <li>
            Recuerda, una vez que se ha completado la sesión, no se permite
            realizarla nuevamente.
          </li>
        </ul>
        <h3 className={styles.subtitulo}>Soporte en Caso de Problemas:</h3>
        <ul className={styles.viñetas}>
          <li>
            En caso de falla en el envío u otro problema, se ofrece soporte
            técnico a través de los canales de contacto para validar y resolver
            tu problema.
          </li>
        </ul>
        <h3 className={styles.subtitulo}>Realizar la prueba:</h3>
        <table className={styles.tablaEncabezado}>
          <thead>
            <tr>
              <th>Sesion</th>
              <th>Tiempo</th>
              <th>Numero de Preguntas</th>
              <th>Intentos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>5 Horas</td>
              <td>105</td>
              <td>1</td>
              <td>
                <Link
                  to={`/usuario/realizar-prueba/${simulacroEncontrado.id}`}
                  className={styles.link}
                >
                  <Boton text="Realizar Sesión 1" />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>

        <p className={styles.parrafo1}>
          Al finalizar la prueba obtendrás tu puntaje y un plan de mejoramiento
        </p>
        <p className={styles.parrafo1}>
          ¡Estamos aquí para apoyarte en tu camino hacia el éxito de la prueba
          saber!
        </p>
        <div className={styles.boton}></div>
      </div>
    </div>
  );
};

export default ConfirmarRealizarPrueba;
