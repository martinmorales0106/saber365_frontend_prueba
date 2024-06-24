import { Link } from "react-router-dom";
import Boton from "../../components/Boton/Boton";
import styles from "./AdminPreguntas.module.css";
import preguntasImg from "../../assets/preguntasAdminImg.png";
import usePregunta from "../../hooks/usePregunta";
import ModalPregunta from "../../components/ModalPregunta/ModalPregunta";
import modify from "../../assets/🦆 icon _Pen Square_.png";
import del from "../../assets/🦆 icon _Times Circle_.png";
import { formatearFecha } from "../../helpers/formatearFecha";
import Swal from "sweetalert2";

const AdminPreguntas = () => {
  const {
    preguntas,
    handleModalPregunta,
    eliminarPregunta,
    handleModalEditarPregunta,
  } = usePregunta();

  // Confirmar si desea Crear el simulacro
  const confirmarCrearPregunta = () => {
    // preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Vas a crear un nuevo Simulacro",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Crear!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a eliminarlo
        handleModalPregunta();
      }
    });
  };

  // Confirmar si desea eliminarlo
  const confirmarEliminarPregunta = (id) => {
    // preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un pregunta que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a eliminarlo
        eliminarPregunta(id);
      }
    });
  };

   // Confirmar si desea editarlo
   const confirmarEditarPregunta = (pregunta) => {
    // preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Vas a modificar esta pregunta",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, modificar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a eliminarlo
        handleModalEditarPregunta(pregunta);
      }
    });
  };
  return (
    <div>
      <div className={styles.contenedor}>
        <div className={styles.titulo}>
          <h2 className={styles.tituloContenido}>
            <img className={styles.icono} src={preguntasImg} alt="Logo" />
            Preguntas
          </h2>
        </div>
        <div className={styles.subTitulo}>
          <p>Busca y modifica tus preguntas en Saber365 </p>
          <div className={styles.botones}>
            <Boton text="Crear Pregunta" onClick={confirmarCrearPregunta} />
            <Link
              className={styles.link}
              to="/admin/preguntas/preguntas-eliminadas"
            >
              <Boton text="Reparar Pregunta" />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.resultados}>
        <div className={styles.titulo}></div>
        <div className={styles.contenedorTabla}>
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
                <th>Simulacro</th>
                <th>Sesión</th>
                <th>Creado</th>
                <th>Editado</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {preguntas.length === 0 ? (
                <tr>
                  <td>No hay preguntas disponibles</td>
                </tr>
              ) : (
                preguntas.map((pregunta) => (
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
                    <td>{pregunta.titulo_simulacro}</td>
                    <td>{pregunta.sesion}</td>
                    <td>{formatearFecha(pregunta.createdAt)}</td>
                    <td>{formatearFecha(pregunta.updatedAt)}</td>
                    <td>
                      <div>
                        <button className={styles.boton} onClick={() => confirmarEditarPregunta(pregunta)}>
                          <img
                            src={modify}
                            alt="Modificar"
                            className={styles.icono2}
                          />
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        className={styles.boton}
                        onClick={() => confirmarEliminarPregunta(pregunta.id)}
                      >
                        <img
                          src={del}
                          alt="Eliminar"
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
      <ModalPregunta />
    </div>
  );
};

export default AdminPreguntas;
