import { Link } from "react-router-dom";
import Boton from "../../components/Boton/Boton";
import styles from "./AdminSimulacros.module.css";
import pruebasimg from "../../assets/pruebasImg.png";
import Swal from "sweetalert2";
import useSimulacro from "../../hooks/useSimulacro";
import ModalSimulacro from "../../components/ModalSimulacro/ModalSimulacro";
import modify from "../../assets/🦆 icon _Pen Square_.png";
import del from "../../assets/🦆 icon _Times Circle_.png";
import { formatearFecha } from "../../helpers/formatearFecha";
import { FormatearTiempo } from "../../helpers/FormatearTiempo";

const AdminSimulacros = () => {
  const {
    simulacros,
    handleModalSimulacro,
    handleModalEditarSimulacro,
    eliminarSimulacro,
  } = useSimulacro();

  // Confirmar si desea Crear el simulacro
  const confirmarCrearSimulacro = () => {
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
        handleModalSimulacro();
      }
    });
  };

  // Confirmar si desea eliminarlo
  const confirmarEliminarSimulacro = (id) => {
    // preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un simulacro que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a eliminarlo
        eliminarSimulacro(id);
      }
    });
  };

  // Confirmar si desea editarlo
  const confirmarEditarSimulacro = (simulacro) => {
    // preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Vas a modificar este simulacro",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, modificar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a eliminarlo
        handleModalEditarSimulacro(simulacro);
      }
    });
  };

  return (
    <div>
      <div className={styles.contenedor}>
        <div className={styles.titulo}>
          <h2 className={styles.tituloContenido}>
            <img className={styles.icono} src={pruebasimg} alt="Logo" />
            Simulacros
          </h2>
        </div>
        <div className={styles.subTitulo}>
          <p>Busca y modifica tus simulacros en Saber365 </p>
          <div className={styles.botones}>
            <Boton text="Crear Simulacro" onClick={confirmarCrearSimulacro} />
            <Link
              to="/admin/simulacros/simulacros-eliminados"
              className={styles.link}
            >
              <Boton text="Reparar Simulacro" />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.resultados}>
        <div className={styles.titulo}></div>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Titulo</th>
              <th>Grado</th>
              <th>N° de preguntas</th>
              <th>Tiempo</th>
              <th>Sesiones</th>
              <th>Puntaje Máximo</th>
              <th>Precio</th>
              <th>Creado</th>
              <th>Editado</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            { simulacros.length === 0 ? (
              <tr>
                <td>No hay Simulacros disponibles</td>
              </tr>
            ) : (
              simulacros && simulacros.map((simulacro) => (
                <tr key={simulacro.id}>
                  <td className={styles.contenedorImagen}>
                    <img
                      src={simulacro.imagen}
                      alt={simulacro.titulo}
                      className={styles.imagen}
                    />
                  </td>
                  <td>{simulacro.titulo}</td>
                  <td>{simulacro.grado}</td>
                  <td>{simulacro.cantidad_preguntas}</td>
                  <td>{FormatearTiempo(simulacro.tiempo)}</td>
                  <td>{simulacro.numero_sesiones}</td>
                  <td>{simulacro.puntaje_maximo}</td>
                  <td>{simulacro.precio}</td>
                  <td>{formatearFecha(simulacro.createdAt)}</td>
                  <td>{formatearFecha(simulacro.updatedAt)}</td>
                  <td>
                    <div>
                      <button
                        className={styles.boton}
                        onClick={() => confirmarEditarSimulacro(simulacro)}
                      >
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
                      onClick={() => confirmarEliminarSimulacro(simulacro.id)}
                    >
                      <img src={del} alt="Eliminar" className={styles.icono2} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ModalSimulacro />
    </div>
  );
};

export default AdminSimulacros;
