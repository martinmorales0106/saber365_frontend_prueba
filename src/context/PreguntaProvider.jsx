import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import clienteAxios from "../config/clienteAxios";
import Swal from "sweetalert2";

const PreguntaContext = createContext();

const PreguntaProvider = ({ children }) => {
  const [preguntas, setPreguntas] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [modalPregunta, setModalPregunta] = useState(false);
  const [preguntasEliminadas, setPreguntasEliminadas] = useState([]);
  const [preguntap, setPreguntap] = useState({});

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const handleModalPregunta = () => {
    setModalPregunta(!modalPregunta);
    setPreguntap({});
  };

  const submitPregunta = async (pregunta) => {
    if (pregunta?.id) {
      await editarPregunta(pregunta);
    } else {
      await crearPregunta(pregunta);
    }
  };

  const crearPregunta = async (pregunta) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/admin/crear-pregunta",
        pregunta,
        config
      );

      setPreguntas([...preguntas, data.pregunta]);

      mostrarAlerta({
        msg: data.msg,
        error: false,
      });

      Swal.fire("Guardado!", "La Pregunta se guardó correctamente.", "success");

      setModalPregunta(false);
    } catch (error) {
      mostrarAlerta({
        msg: error.response?.data?.msg || error.message,
        error: true,
      });
    }
  };

  const editarPregunta = async (pregunta) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/admin/editar-pregunta/${pregunta.id}`,
        pregunta,
        config
      );

      const preguntaActualizada = preguntas.map((preguntaState) =>
        preguntaState.id === data.pregunta.id ? data.pregunta : preguntaState
      );

      setPreguntas(preguntaActualizada);

      mostrarAlerta({
        msg: data.msg,
        error: false,
      });

      setModalPregunta(false);

      Swal.fire(
        "Editado!",
        "La pregunta se modificó correctamente.",
        "success"
      );
    } catch (error) {
      mostrarAlerta({
        msg: error.response?.data?.msg || error.message,
        error: true,
      });
    }
  };

  const handleModalEditarPregunta = (pregunta) => {
    setPreguntap(pregunta);
    setModalPregunta(true);
  };

  useEffect(() => {
    async function fetchPreguntas() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado");

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await clienteAxios(`/admin/obtener-preguntas`, config);
        setPreguntas(response.data);
      } catch (error) {
        mostrarAlerta({
          msg: error.response?.data?.msg || error.message,
          error: true,
        });
      }
    }

    fetchPreguntas();
  }, []);

  const eliminarPregunta = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(
        `/admin/eliminar-pregunta/${id}`,
        config
      );

      const preguntaActualizada = preguntas.filter(
        (pregunta) => pregunta.id !== id
      );
      setPreguntas(preguntaActualizada);
      setPreguntasEliminadas([...preguntasEliminadas, data.pregunta]);

      Swal.fire(
        "Eliminado!",
        "El Pregunta se eliminó correctamente.",
        "success"
      );
    } catch (error) {
      mostrarAlerta({
        msg: error.response?.data?.msg || error.message,
        error: true,
      });
    }
  };

  useEffect(() => {
    async function fetchPreguntasEliminadas() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado");

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await clienteAxios(
          "/admin/preguntas-eliminados",
          config
        );
        setPreguntasEliminadas(response.data);
      } catch (error) {
        mostrarAlerta({
          msg: error.response?.data?.msg || error.message,
          error: true,
        });
      }
    }

    fetchPreguntasEliminadas();
  }, []);

  const recuperarPregunta = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const { data } = await clienteAxios.put(
        `/admin/recuperar-pregunta/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const preguntaActualizada = preguntasEliminadas.filter(
        (simulacro) => simulacro.id !== id
      );
      setPreguntasEliminadas(preguntaActualizada);
      setPreguntas([...preguntas, data.pregunta]);

      Swal.fire(
        "Recuperado!",
        "La pregunta se recuperó correctamente.",
        "success"
      );
    } catch (error) {
      mostrarAlerta({
        msg: error.response?.data?.msg || error.message,
        error: true,
      });
    }
  };

  return (
    <PreguntaContext.Provider
      value={{
        preguntas,
        modalPregunta,
        handleModalPregunta,
        submitPregunta,
        mostrarAlerta,
        alerta,
        eliminarPregunta,
        preguntasEliminadas,
        recuperarPregunta,
        handleModalEditarPregunta,
        preguntap,
      }}
    >
      {children}
    </PreguntaContext.Provider>
  );
};

PreguntaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PreguntaProvider };

export default PreguntaContext;
