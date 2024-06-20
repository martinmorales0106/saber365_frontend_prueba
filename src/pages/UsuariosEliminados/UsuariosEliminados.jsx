import styles from "./UsuariosEliminados.module.css";
import usuariosImg from "../../assets/inicio-sesion.png";
import modify from "../../assets/🦆 icon _Pen Square_.png";
import Boton from "../../components/Boton/Boton";
import useUsuario from "../../hooks/useUsuario";
import { formatearFecha } from "../../helpers/formatearFecha";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const UsuariosEliminados = () => {
    const { usuariosEliminados, recuperarUsuario } = useUsuario();

 // Confirmar si desea eliminarlo
 const confirmarRecuperarUsuario = (id) => {
    // preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un usuario que se recupera podrá acceder a Saber365",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, recuperar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a eliminarlo
        recuperarUsuario(id);
      }
    });
  };

  return (
    <div>
      <div className={styles.contenedor}>
        <div className={styles.titulo}>
          <h2 className={styles.tituloContenido}>
            <img className={styles.icono} src={usuariosImg} alt="Logo" />
            Usuarios Eliminados
          </h2>
        </div>
        <div className={styles.subTitulo}>
          <p>Busca y recupera tus usuarios en Saber365 </p>
          <div className={styles.botones}>
            <Link className={styles.link} to="/admin/usuarios">
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
              <th>Usuario</th>
              <th>Email</th>
              <th>Colegio</th>
              <th>Grado</th>
              <th>Admin</th>
              <th>Eliminado</th>
              <th>Recuperar</th>
            </tr>
          </thead>
          <tbody>
            {usuariosEliminados.length === 0 ? (
              <tr>
                <td>No hay Usuarios disponibles</td>
              </tr>
            ) : (
                usuariosEliminados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombreUsuario}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.colegio}</td>
                  <td>{usuario.grado}</td>
                  <td className={styles.admin}>{usuario.admin.toString()}</td>
                  <td>{formatearFecha(usuario.deletedAt)}</td>
                  <td>
                    <button
                      className={styles.boton}
                      onClick={() => confirmarRecuperarUsuario(usuario.id)}
                    >
                      <img src={modify} alt="Recuperar" className={styles.icono2} />
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

export default UsuariosEliminados;
