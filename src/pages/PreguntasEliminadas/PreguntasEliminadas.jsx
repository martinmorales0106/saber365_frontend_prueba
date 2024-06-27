import styles from "./PreguntasEliminadas.module.css";
import preguntasImg from "../../assets/preguntasAdminImg.png";
import modify from "../../assets/🦆 icon _Pen Square_.png";
import Boton from "../../components/Boton/Boton";
import usePregunta from "../../hooks/usePregunta";
import { formatearFecha } from "../../helpers/formatearFecha";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const PreguntasEliminadas = () => {
    const { preguntasEliminadas, recuperarPregunta } = usePregunta();

    // Confirmar si desea eliminarlo
    const confirmarRecuperarPregunta = (id) => {
      // preguntar al usuario
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Una pregunta que se recupera podrá acceder a Saber365",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, recuperar!",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          // pasar a eliminarlo
          recuperarPregunta(id);
        }
      });
    };
  
    return (
      <div>
        <div className={styles.contenedor}>
          <div className={styles.titulo}>
            <h2 className={styles.tituloContenido}>
              <img className={styles.icono} src={preguntasImg} alt="Logo" />
              Preguntas Eliminadas
            </h2>
          </div>
          <div className={styles.subTitulo}>
            <p>Busca y recupera tus preguntas en Saber365 </p>
            <div className={styles.botones}>
              <Link className={styles.link} to="/admin/preguntas">
                <Boton text="Regresar" />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.resultados}>
          <div className={styles.titulo}></div>
          <table className={styles.tabla}>
            <thead>
              <tr>
              <th>Contexto</th>
                <th>Imagen</th>
                <th>Pregunta</th>
                <th>Opción A</th>
                <th>Opción B</th>
                <th>Opción C</th>
                <th>Opción D</th>
                <th>Respuesta Correcta</th>
                <th>Área</th>
                <th>Grado</th>
                <th>Competencia</th>
                <th>Sesión</th>
                <th>Eliminado</th>
                <th>Recuperar</th>
              </tr>
            </thead>
            <tbody>
              {preguntasEliminadas.length === 0 ? (
                <tr>
                  <td>No hay Preguntas disponibles</td>
                </tr>
              ) : (
                preguntasEliminadas && preguntasEliminadas.map((pregunta) => (
                  <tr key={pregunta.id}>
                  <td>{pregunta.contexto}</td>
                    <td className={styles.contenedorImagen}>
                      <img
                        src={pregunta.imagen}
                        alt={pregunta.pregunta}
                        className={styles.imagen}
                      />
                    </td>
                    <td>{pregunta.pregunta}</td>
                    <td>{pregunta.opcionA}</td>
                    <td>{pregunta.opcionB}</td>
                    <td>{pregunta.opcionC}</td>
                    <td>{pregunta.opcionD}</td>
                    <td>{pregunta.respuesta_correcta}</td>
                    <td>{pregunta.area}</td>
                    <td>{pregunta.grado}</td>
                    <td>{pregunta.competencia}</td>
                    <td>{pregunta.sesion}</td>
                    <td>{formatearFecha(pregunta.deletedAt)}</td>
                    <td>
                      <button
                        className={styles.boton}
                        onClick={() => confirmarRecuperarPregunta(pregunta.id)}
                      >
                        <img
                          src={modify}
                          alt="Recuperar"
                          className={styles.icono2}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
}
export default PreguntasEliminadas