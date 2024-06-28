import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Importa PropTypes
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const PerfilUsuarioContext = createContext();

const PerfilUsuarioProvider = ({ children }) => {
  const navigate = useNavigate();

  const [simulacrosUsuario, setSimulacrosUsuario] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [preguntasUsuario, setPreguntasUsuario] = useState([]);
  const [simulacroId, setSimulacroId] = useState(null);
  const [preguntasSimulacro, setPreguntasSimulacro] = useState([]);
  const [preguntasFiltradas, setPreguntasFiltradas] = useState([]);
  const [selectArea, setSelectArea] = useState("");
  const [simulacroRealizado, setSimulacroRealizado] = useState({});
  const [cargando, setCargando] = useState(true);
  const [simulacroFinalizado, setSimulacroFinalizado] = useState({});
  const [modalResultado, setModalResultado] = useState(false);
  const [resultadoArea, setResultadoArea] = useState({});
  const [preguntasSimulacroArea, setPreguntasSimulacroArea] = useState([]);

  console.log(simulacroRealizado);
  
  useEffect(() => {
    if (preguntasSimulacro.length > 0) {
      const filtrarPreguntasMatematicas = async () => {
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

        const response = await clienteAxios(
          `/perfil-usuario/obtener-preguntas`,
          config
        );
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
    const obtenerPreguntasPorSimulacro = async () => {
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

  const submitPreguntas = async (respuesta) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clienteAxios.post(
      "/perfil-usuario/simulacro-realizado",
      respuesta,
      config
    );
    
    setSimulacroRealizado(data);
    navigate(`/usuario/finalizar-sesion/${data.id}`);
  };

  const obtenerSimulacroFinalizado = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(
        `/perfil-usuario/simulacro-finalizado/${id}`,
        config
      );
      setSimulacroFinalizado(data);
      navigate(`/usuario/resultados`);
    } catch (error) {
      console.log(error.message);
    }
    setCargando(false);
  };

  const obtenerSimulacroRealizado = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(
        `/perfil-usuario/simulacro-realizado/${id}`,
        config
      );
      setSimulacroRealizado(data);
    } catch (error) {
      console.log(error.message);
    }
    setCargando(false);
  };

  const submitRespuestas = async (respuesta) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clienteAxios.post(
      "/perfil-usuario/simulacro-finalizado",
      respuesta,
      config
    );
    console.log(data);
    await obtenerSimulacroFinalizado(data.nuevoRegistro.id);
  }


  const handleModalResultado = () => {
    setModalResultado(!modalResultado);
  };

  const handleResultadoArea = (infoArea) => {
    setResultadoArea(infoArea);
    setModalResultado(true);
  };

  const filtrarPreguntasSimulacrosPorArea = (area) => {
    const preguntasFiltradas = preguntasSimulacro.filter(
      (pregunta) => pregunta.area === area
    );
    localStorage.setItem("filtroArea", area);
    setPreguntasSimulacroArea(preguntasFiltradas);
  };

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
        submitPreguntas,
        simulacroRealizado,
        submitRespuestas,
        cargando,
        simulacroFinalizado,
        handleModalResultado,
        modalResultado,
        handleResultadoArea,
        resultadoArea,
        filtrarPreguntasSimulacrosPorArea,
        preguntasSimulacroArea,
        obtenerSimulacroRealizado,
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
