import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Importa PropTypes
import clienteAxios from "../config/clienteAxios";

const PerfilUsuarioContext = createContext();

const PerfilUsuarioProvider = ({ children }) => {
  const [simulacrosUsuario, setSimulacrosUsuario] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [preguntasUsuario, setPreguntasUsuario] = useState([]);
  const [simulacroId, setSimulacroId] = useState(null);
  const [preguntasSimulacro, setPreguntasSimulacro] = useState([]);
  const [preguntasFiltradas, setPreguntasFiltradas] = useState([]);
  const [selectArea, setSelectArea] = useState("")


  useEffect(() => {
    if (preguntasSimulacro.length > 0) {
      const filtrarPreguntasMatematicas = () => {
        const filtradas = preguntasSimulacro.filter(
          (pregunta) => pregunta.area === selectArea
        );
        setPreguntasFiltradas(filtradas);
      };

      filtrarPreguntasMatematicas();
    }
  }, [preguntasSimulacro, selectArea]);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

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
        const response = await clienteAxios(
          `/perfil-usuario/obtener-simulacros`,
          config
        );
        // Ordenar los simulacros por el título
        const simulacrosOrdenados = response.data.sort((a, b) => {
          if (a.titulo < b.titulo) return -1;
          if (a.titulo > b.titulo) return 1;
          return 0;
        });

        setSimulacrosUsuario(simulacrosOrdenados);
      } catch (error) {
        mostrarAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    }

    fetchSimulacros();
  }, []);

  useEffect(() => {
    async function fetchPreguntas() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          mostrarAlerta({
            msg: "No tienes permiso para ver esta información",
            error: true,
          });
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await clienteAxios(`/perfil-usuario/obtener-preguntas`, config);
        setPreguntasUsuario(response.data);
      } catch (error) {
        mostrarAlerta({
          msg: error.response?.data?.msg || error.message,
          error: true,
        });
      }
    }

    fetchPreguntas();
  }, []);

  useEffect(() => {
    const obtenerPreguntasPorSimulacro = () => {
      if (simulacroId && preguntasUsuario.length > 0) {
        const idSimulacroNumero = Number(simulacroId);
        const preguntasFiltradas = preguntasUsuario.filter(
          (pregunta) => pregunta.id_simulacro === idSimulacroNumero
        );

        setPreguntasSimulacro(preguntasFiltradas);
      }
    };

    obtenerPreguntasPorSimulacro();
  }, [simulacroId, preguntasUsuario]);

 const submitPreguntas = () => {
  console.log("enviando respuestas");
 }

  return (
    <PerfilUsuarioContext.Provider
      value={{
        simulacrosUsuario,
        preguntasUsuario,
        alerta,
        mostrarAlerta,
        simulacroId,
        setSimulacroId,
        preguntasSimulacro,
        preguntasFiltradas,
        setSelectArea,
        submitPreguntas
      }}
    >
      {children}
    </PerfilUsuarioContext.Provider>
  );
};

PerfilUsuarioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PerfilUsuarioProvider };

export default PerfilUsuarioContext;
