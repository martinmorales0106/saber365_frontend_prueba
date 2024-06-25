import styles from "./SimulacrosEliminados.module.css";
import pruebasimg from "../../assets/pruebasImg.png";
import modify from "../../assets/🦆 icon _Pen Square_.png";
import Boton from "../../components/Boton/Boton";
import useSimulacro from "../../hooks/useSimulacro";
import { formatearFecha } from "../../helpers/formatearFecha";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FormatearTiempo } from "../../helpers/FormatearTiempo";

const SimulacrosEliminados = () => {
  const { simulacrosEliminados, recuperarSimulacro } = useSimulacro();

  // Confirmar si desea eliminarlo
  const confirmarRecuperarSimulacro = (id) => {
    // preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un simulacro que se recupera podrá acceder a Saber365",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, recuperar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a eliminarlo
        recuperarSimulacro(id);
      }
    });
  };

  return (
    <div>
      <div className={styles.contenedor}>
        <div className={styles.titulo}>
          <h2 className={styles.tituloContenido}>
            <img className={styles.icono} src={pruebasimg} alt="Logo" />
            Simulacros Eliminados
          </h2>
        </div>
        <div className={styles.subTitulo}>
          <p>Busca y recupera tus simulacros en Saber365 </p>
          <div className={styles.botones}>
            <Link className={styles.link} to="/admin/simulacros">
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
              <th>Imagen</th>
              <th>Titulo</th>
              <th>Grado</th>
              <th>N° de preguntas</th>
              <th>Tiempo</th>
              <th>Sesiones</th>
              <th>Puntaje Máximo</th>
              <th>Precio</th>
              <th>Activo</th>
              <th>Eliminado</th>
              <th>Recuperar</th>
            </tr>
          </thead>
          <tbody>
            {simulacrosEliminados.length === 0 ? (
              <tr>
                <td>No hay Simulacros disponibles</td>
              </tr>
            ) : (
              simulacrosEliminados && simulacrosEliminados.map((simulacro) => (
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
                  <td className={styles.admin}>
                    {simulacro.activo.toString()}
                  </td>
                  <td>{formatearFecha(simulacro.deletedAt)}</td>
                  <td>
                    <button
                      className={styles.boton}
                      onClick={() => confirmarRecuperarSimulacro(simulacro.id)}
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
};

export default SimulacrosEliminados;
