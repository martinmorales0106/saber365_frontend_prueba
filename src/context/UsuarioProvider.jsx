import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Importa PropTypes
import clienteAxios from "../config/clienteAxios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const UsuarioContext = createContext();

const UsuarioProvider = ({ children }) => {
  const { setAuth, auth } = useAuth();

  const [usuarios, setUsuarios] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [usuariosEliminados, setUsuariosEliminados] = useState([]);
  const [modalUsuario, setModalUsuario] = useState(false);
  const [usuariop, setUsuariop] = useState({});

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  // Cargar Usuarios
  useEffect(() => {
    async function fetchUsuarios() {
      try {
        if (!auth.admin) return; // Verificar si el usuario es admin

        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await clienteAxios(`/admin/obtener-usuarios`, config);
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    }

    fetchUsuarios();
  }, [auth.admin]);

  const eliminarUsuario = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(
        `/admin/eliminar-usuario/${id}`,
        config
      );

      // Recargar la lista de libros después de eliminar
      const usuarioActualizado = usuarios.filter(
        (usuario) => usuario.id !== id
      );
      setUsuarios(usuarioActualizado);
      setUsuariosEliminados([...usuariosEliminados, data.usuario]);

      // Si se elimina, mostrar alerta
      Swal.fire(
        "Eliminado!",
        "El usuario se eliminó correctamente.",
        "success"
      );
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }
  };

  useEffect(() => {
    async function fetchUsuariosEliminados() {
      try {
        if (!auth.admin) return; // Verificar si el usuario es admin

        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await clienteAxios(
          "/admin/usuarios-eliminados",
          config
        );
        setUsuariosEliminados(response.data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    }

    fetchUsuariosEliminados();
  }, [auth.admin]);

  const recuperarUsuario = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await clienteAxios.put(
        `/admin/recuperar-usuario/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const usuarioActualizado = usuariosEliminados.filter(
        (usuario) => usuario.id !== id
      );
      setUsuariosEliminados(usuarioActualizado);
      setUsuarios([...usuarios, data.usuario]);

      // Si se elimina, mostrar alerta
      Swal.fire(
        "Recuperado!",
        "El usuario se recupero correctamente.",
        "success"
      );
    } catch (error) {
      console.error("Error al recuperar el usuario:", error);
      throw error;
    }
  };

  // Modal para crear Usuario

  const handleModalUsuario = () => {
    setModalUsuario(!modalUsuario);
    setUsuariop({});
  };

  const submitUsuario = async (usuario) => {
    if (usuario?.id) {
      await editarUsuario(usuario);
    } else {
      await crearUsuario(usuario);
    }
  };

  const crearUsuario = async (usuario) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/admin/crear-usuario",
        usuario,
        config
      );

      setUsuarios([...usuarios, data.usuario]);

      mostrarAlerta({
        msg: data.msg,
        error: false,
      });

      Swal.fire(
        "Registrado!",
        "El usuario se registró correctamente.",
        "success"
      );

      setModalUsuario(false);
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const editarUsuario = async (usuario) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/admin/editar-usuario/${usuario.id}`,
        usuario,
        config
      );

      const usuarioActualizado = usuarios.map((usuarioState) =>
        usuarioState.id === data.usuario.id ? data.usuario : usuarioState
      );

      setUsuarios(usuarioActualizado);
      setAuth(data.usuario);

      mostrarAlerta({
        msg: data.msg,
        error: false,
      });

      setModalUsuario(false);

      Swal.fire("Editado!", "El usuario se modificó correctamente.", "success");
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const handleModalEditarUsuario = (usuario) => {
    setUsuariop(usuario);
    setModalUsuario(true);
  };

  const updateUsuarioAdmin = async (usuario) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await clienteAxios.put(
        `/admin/editar-usuario-configuracion/${usuario.id}`,
        usuario,
        config
      );
      
      setAuth(data.usuario);
      localStorage.setItem("authUser", JSON.stringify(data.usuario));

      mostrarAlerta({
        msg: data.msg,
        error: false,
      });

      Swal.fire("Editado!", "El usuario se modificó correctamente.", "success");
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const updateUsuarioContraseñaAdmin = async (usuario) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/admin/editar-usuario-contrasena/${usuario.id}`,
        usuario,
        config
      );

      console.log(data);
      mostrarAlerta({
        msg: data.msg,
        error: false,
      });

      Swal.fire(
        "Editado!",
        "La Contraseña se modificó correctamente.",
        "success"
      );
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  return (
    <UsuarioContext.Provider
      value={{
        usuarios,
        setUsuarios,
        modalUsuario,
        handleModalUsuario,
        submitUsuario,
        mostrarAlerta,
        alerta,
        handleModalEditarUsuario,
        usuariop,
        usuariosEliminados,
        eliminarUsuario,
        recuperarUsuario,
        editarUsuario,
        updateUsuarioAdmin,
        updateUsuarioContraseñaAdmin,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

UsuarioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UsuarioProvider };

export default UsuarioContext;
