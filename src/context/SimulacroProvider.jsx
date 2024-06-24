import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Importa PropTypes
import clienteAxios from "../config/clienteAxios";
import Swal from "sweetalert2";

const SimulacroContext = createContext();

const SimulacroProvider = ({ children }) => {
  const [simulacros, setSimulacros] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [modalSimulacro, setModalSimulacro] = useState(false);
  const [simulacrop, setSimulacrop] = useState({});
  const [simulacrosEliminados, setSimulacrosEliminados] = useState([]);


  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };


  const handleModalSimulacro = () => {
    setModalSimulacro(!modalSimulacro);
    setSimulacrop({});
  };

  const submitSimulacro = async (simulacro) => {
    if (simulacro?.id) {
      await editarSimulacro(simulacro);
    } else {
      await crearSimulacro(simulacro);
    }
  };

  const crearSimulacro = async (simulacro) => {
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
        "/admin/crear-simulacro",
        simulacro,
        config
      );

      setSimulacros([...simulacros, data.simulacro]);

      mostrarAlerta({
        msg: data.msg,
        error: false,
      });

      Swal.fire(
        "Guardado!",
        "El Simulacro se guardó correctamente.",
        "success"
      );

      setModalSimulacro(false);
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const editarSimulacro = async (simulacro) => {
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
        `/admin/editar-simulacro/${simulacro.id}`,
        simulacro,
        config
      );

      const simulacroActualizado = simulacros.map((simulacroState) =>
        simulacroState.id === data.simulacro.id ? data.simulacro : simulacroState
      );

      setSimulacros(simulacroActualizado);
    

      mostrarAlerta({
        msg: data.msg,
        error: false,
      });

      setModalSimulacro(false);
      
      Swal.fire(
        "Editado!",
        "El simulacro se modificó correctamente.",
        "success"
      );
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const handleModalEditarSimulacro = (simulacro) => {
    setSimulacrop(simulacro);
    setModalSimulacro(true);
  };

   // Cargar 
   useEffect(() => {
    async function fetchSimulacros() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await clienteAxios(`/admin/obtener-simulacros`, config);
        // Ordenar los simulacros por el título
      const simulacrosOrdenados = response.data.sort((a, b) => {
        if (a.titulo < b.titulo) return -1;
        if (a.titulo > b.titulo) return 1;
        return 0;
      });

      setSimulacros(simulacrosOrdenados);
      } catch (error) {
        mostrarAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    }

    fetchSimulacros();
  }, []);

  const eliminarSimulacro = async (id) => {
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
        `/admin/eliminar-simulacro/${id}`,
        config
      );

      // Recargar la lista de libros después de eliminar
      const simulacroActualizado = simulacros.filter(
        (simulacro) => simulacro.id !== id
      );
      setSimulacros(simulacroActualizado);
      setSimulacrosEliminados([...simulacrosEliminados, data.simulacro]);

      // Si se elimina, mostrar alerta
      Swal.fire(
        "Eliminado!",
        "El Simulacro se eliminó correctamente.",
        "success"
      );
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }
  };

  useEffect(() => {
    async function fetchSimulacrosEliminados() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await clienteAxios(
          "/admin/simulacros-eliminados",
          config
        );
        setSimulacrosEliminados(response.data);
      } catch (error) {
        console.error("Error al cargar los simulacros:", error);
      }
    }

    fetchSimulacrosEliminados();
  }, []);

  const recuperarSimulacro = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await clienteAxios.put(
        `/admin/recuperar-simulacro/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const simulacroActualizado = simulacrosEliminados.filter(
        (simulacro) => simulacro.id !== id
      );
      setSimulacrosEliminados(simulacroActualizado);
      setSimulacros([...simulacros, data.simulacro]);

      // Si se elimina, mostrar alerta
      Swal.fire(
        "Recuperado!",
        "El simulacro se recupero correctamente.",
        "success"
      );
    } catch (error) {
      console.error("Error al recuperar el simulacro:", error);
      throw error;
    }
  };

  return (
    <SimulacroContext.Provider
      value={{
        simulacros,
        modalSimulacro,
        handleModalSimulacro,
        submitSimulacro,
        mostrarAlerta,
        alerta,
        simulacrop,
        eliminarSimulacro,
        recuperarSimulacro,
        handleModalEditarSimulacro,
        simulacrosEliminados,
      }}
    >
      {children}
    </SimulacroContext.Provider>
  );

};

SimulacroProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SimulacroProvider };

export default SimulacroContext;
