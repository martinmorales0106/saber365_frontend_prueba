import styles from "./AdminUsuarios.module.css";
import usuariosImg from "../../assets/inicio-sesion.png";
import modify from "../../assets/🦆 icon _Pen Square_.png";
import del from "../../assets/🦆 icon _Times Circle_.png";
import Boton from "../../components/Boton/Boton";
import useUsuario from "../../hooks/useUsuario";
import { formatearFecha } from "../../helpers/formatearFecha";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ModalUsuario from "../../components/ModalUsuario/ModalUsuario";

const AdminUsuarios = () => {
  const {
    usuarios,
    handleModalUsuario,
    handleModalEditarUsuario,
    eliminarUsuario,
  } = useUsuario();

  // Confirmar si desea eliminarlo
  const confirmarEliminarUsuario = (id) => {
    // preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un usuario que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a eliminarlo
        eliminarUsuario(id);
      }
    });
  };

   // Confirmar si desea eliminarlo
   const confirmarEditarUsuario = (usuario) => {
    // preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Vas a modificar este usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, modificar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a eliminarlo
        handleModalEditarUsuario(usuario);
      }
    });
  };

  // Confirmar si desea eliminarlo
  const confirmarCrearUsuario = () => {
    // preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Vas a crear un nuevo usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Crear!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a eliminarlo
        handleModalUsuario();
      }
    });
  };

  return (
    <div>
      <div className={styles.contenedor}>
        <div className={styles.titulo}>
          <h2 className={styles.tituloContenido}>
            <img className={styles.icono} src={usuariosImg} alt="Logo" />
            Usuarios
          </h2>
        </div>
        <div className={styles.subTitulo}>
          <p>Busca y modifica tus usuarios en Saber365 </p>
          <div className={styles.botones}>
            <Boton text="Crear Usuario" onClick={confirmarCrearUsuario} />
            <Link
              className={styles.link}
              to="/admin/usuarios/usuarios-eliminados"
            >
              <Boton text="Reparar Usuario" />
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
              <th>Creado</th>
              <th>Editado</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td>No hay Usuarios disponibles</td>
              </tr>
            ) : (
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombreUsuario}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.colegio}</td>
                  <td>{usuario.grado}</td>
                  <td className={styles.admin}>{usuario.admin.toString()}</td>
                  <td>{formatearFecha(usuario.createdAt)}</td>
                  <td>{formatearFecha(usuario.updatedAt)}</td>
                  <td>
                    <div>
                      <button
                        className={styles.boton}
                        onClick={() => confirmarEditarUsuario(usuario)}
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
                      onClick={() => confirmarEliminarUsuario(usuario.id)}
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
      <ModalUsuario />
    </div>
  );
};

export default AdminUsuarios;
