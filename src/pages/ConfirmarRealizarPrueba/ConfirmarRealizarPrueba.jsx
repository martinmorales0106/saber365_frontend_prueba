import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./ConfirmarRealizarPrueba.module.css";
import sesionGratis from "../../assets/sesionGratis.png";
import sesionGratis10 from "../../assets/sesionGratis10.png";
import sesionGratis9 from "../../assets/sesionGratis9.png";
import sesionGratis58 from "../../assets/sesionGratis58.png";
import sesionGratis34 from "../../assets/sesionGratis34.png";
import iniciarPruebaImg from "../../assets/iniciarPruebaImg.png";
import tablaPreguntasGratis from "../../assets/tablaPreguntasGratis.png";
import tablaPreguntasGratis10 from "../../assets/tablaPreguntasGratis10.png";
import tablaPreguntasGratis9 from "../../assets/tablaPreguntasGratis9.png";
import tablaPreguntasGratis58 from "../../assets/tablaPreguntasGratis58.png";
import tablaPreguntasGratis34 from "../../assets/tablaPreguntasGratis34.png";

import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import Boton from "../../components/Boton/Boton";
import { useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import { FormatearTiempo } from "../../helpers/FormatearTiempo";

const ConfirmarRealizarPrueba = () => {
  const { id } = useParams();
  const { simulacrosUsuario, setSimulacroId } = usePerfilUsuario();
  const navigate = useNavigate(); // Hook de redirección

  useEffect(() => {
    setSimulacroId(id); // Ahora se actualiza después del renderizado
  }, [setSimulacroId, id]);

  const simulacroEncontrado = simulacrosUsuario.find(
    (simulacro) => simulacro.id === parseInt(id, 10)
  );

  // Si el simulacro no se ha encontrado, mostrar un mensaje adecuado
  if (!simulacroEncontrado) {
    return <Loading />;
  }

  // Verificar si el simulacro está activo, si no, redirigir
  if (!simulacroEncontrado.activo) {
    navigate("/usuario/pruebas");
    return null;
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
          Las pruebas del Simulacro {simulacroEncontrado.titulo} se
          dividen en{" "}
          {simulacroEncontrado.numero_sesiones === 1
            ? "una sesión:"
            : "dos sesiones:"}
        </p>
        <div className={styles.sesion1Img}>
          {simulacroEncontrado.grado === "Undécimo" && (
            <img src={sesionGratis} className={styles.sesion1} />
          )}
          {simulacroEncontrado.grado === "Décimo" && (
            <img src={sesionGratis10} className={styles.sesion1} />
          )}
          {simulacroEncontrado.grado === "Noveno" && (
            <img src={sesionGratis9} className={styles.sesion1} />
          )}
          {(simulacroEncontrado.grado === "Octavo" || simulacroEncontrado.grado === "Séptimo" || simulacroEncontrado.grado === "Sexto" || simulacroEncontrado.grado === "Quinto" )  && (
            <img src={sesionGratis58} className={styles.sesion1} />
          )}

          {(simulacroEncontrado.grado === "Tercero" || simulacroEncontrado.grado === "Cuarto") && (
            <img src={sesionGratis34} className={styles.sesion1} />
          )}

        </div>
        <p className={styles.estructuraCuadernillo}>
          Estructura del Simulacro {simulacroEncontrado.titulo}{" "}
        </p>
        <div className={styles.tablaPreguntas}>
        {simulacroEncontrado.grado === "Undécimo" && (
            <img src={tablaPreguntasGratis} className={styles.sesion1} />
          )}
          {simulacroEncontrado.grado === "Décimo" && (
            <img src={tablaPreguntasGratis10} className={styles.sesion1} />
          )}
          {simulacroEncontrado.grado === "Noveno" && (
            <img src={tablaPreguntasGratis9} className={styles.sesion1} />
          )}
          {(simulacroEncontrado.grado === "Octavo" || simulacroEncontrado.grado === "Séptimo" || simulacroEncontrado.grado === "Sexto" || simulacroEncontrado.grado === "Quinto" )  && (
            <img src={tablaPreguntasGratis58} className={styles.sesion1} />
          )}

          {(simulacroEncontrado.grado === "Tercero" || simulacroEncontrado.grado === "Cuarto") && (
            <img src={tablaPreguntasGratis34} className={styles.sesion1} />
          )}
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
        <ol className={styles.viñetas}>
          <li>
            <strong>Tiempo Disponible: </strong>
            Cada sesión de la prueba requiere un tiempo disponible de{" "}
            {FormatearTiempo(simulacroEncontrado.tiempo)}.
          </li>
          <li>
            <strong>
              Aviso Importante: Envío Automático de Respuestas al Finalizar la
              Prueba.
            </strong>
            <br />
            <ul className={styles.viñetas2}>
              <li>
                Al finalizar el tiempo asignado para la prueba, todas las
                respuestas se enviarán automáticamente.
              </li>
              <li>
                Las preguntas no contestadas serán marcadas como incorrectas.
              </li>
              <li>
                Asegúrate de responder todas las preguntas antes de que el
                tiempo se agote para maximizar tu puntuación.
              </li>
            </ul>
          </li>
          <li>
            <strong>Intento Único por Sesión:</strong>
            <ul className={styles.viñetas2}>
              <li>Solo se permite un intento por sesión.</li>
              <li>
                Obtendrás puntaje únicamente al finalizar la sesión completa del
                simulacro.
              </li>
              <li>
                Una vez completada la sesión, no se permite realizarla
                nuevamente.
              </li>
            </ul>
          </li>
        </ol>
        <h3 className={styles.subtitulo}>Soporte en Caso de Problemas:</h3>
        <ul className={styles.viñetas}>
          <li>
            En caso de fallas en el envío u otros problemas, se ofrece soporte
            técnico a través de los canales de contacto para validar y resolver
            tu problema.
          </li>
        </ul>

        <h3 className={styles.subtitulo}>Realizar la prueba:</h3>
        <div className={styles.tableContainer}>
          <table className={styles.tablaEncabezado}>
            <thead>
              <tr>
                <th>Sesion</th>
                <th>Tiempo</th>
                <th>Numero de Preguntas</th>
                <th>Intentos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {simulacroEncontrado.numero_sesiones === 1 && (
                <tr>
                  <td>1</td>
                  <td>{FormatearTiempo(simulacroEncontrado.tiempo)}</td>
                  <td>{simulacroEncontrado.cantidad_preguntas}</td>
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
              )}
            </tbody>
          </table>
        </div>

        <p className={styles.parrafo1}>
          Al finalizar la prueba, recibirás tu puntaje junto con un plan de
          mejoramiento personalizado.
        </p>
        <p className={styles.parrafo1}>
          ¡Estamos aquí para apoyarte en tu camino hacia el éxito en la prueba
          Saber!
        </p>
        <div className={styles.boton}></div>
      </div>
    </div>
  );
};

export default ConfirmarRealizarPrueba;
