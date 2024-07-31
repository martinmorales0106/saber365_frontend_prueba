import { createContext, useEffect, useState } from "react";

import PropTypes from "prop-types"; // Importa PropTypes
import useAuth from "../hooks/useAuth";
import usePerfilUsuario from "../hooks/usePerfiUsuario";

const TabsContext = createContext();

const TabsProvider = ({ children }) => {
  const {
    preguntasSimulacro,
    submitPreguntas,
    simulacroId,
    simulacrosUsuario,
  } = usePerfilUsuario();

  const simulacroEncontrado = simulacrosUsuario.find(
    (simulacro) => simulacro.id === parseInt(simulacroId, 10)
  );

  const { auth } = useAuth();

  const [selectedTab, setSelectedTab] = useState(() => {
    const storedValue = localStorage.getItem("selectedTab");
    return storedValue ? storedValue : "Matemáticas";
  });

  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState(() => {
    // Recuperar opciones seleccionadas del localStorage al inicio
    const savedOptions = localStorage.getItem("opcionesSeleccionadas");
    return savedOptions ? JSON.parse(savedOptions) : {};
  });

  const [tiempoAgotado, setTiempoAgotado] = useState(false);

  const [segundos, setSegundos] = useState(() => {
    // Inicializa el estado con el valor de localStorage si existe
    const tiempoRestanteStr = localStorage.getItem(
      `contadorSegundos${simulacroEncontrado?.titulo}`
    );
    const tiempoRestante =
      tiempoRestanteStr !== null ? Number(tiempoRestanteStr) : NaN;

    // Devuelve el tiempo restante o el tiempo por defecto del simulacro
    return isNaN(tiempoRestante) || tiempoRestante <= 0
      ? simulacroEncontrado?.tiempo || null
      : tiempoRestante;
  });

  useEffect(() => {
    if (simulacroEncontrado) {
      const tiempoRestanteStr = localStorage.getItem(
        `contadorSegundos${simulacroEncontrado.titulo}`
      );
      const tiempoRestante =
        tiempoRestanteStr !== null ? Number(tiempoRestanteStr) : NaN;

      if (isNaN(tiempoRestante) || tiempoRestante <= 0) {
        setSegundos(simulacroEncontrado.tiempo || null);
      } else {
        setSegundos(tiempoRestante);
      }
    }
  }, [simulacroEncontrado]);

  useEffect(() => {
    if (segundos === 0 && !tiempoAgotado) {
      handleSubmit();
    }
  }, [tiempoAgotado, segundos]);

  const handleSubmit = async () => {
    const resultados = preguntasSimulacro.map((pregunta) => {
      const idPregunta = pregunta.id;
      const numero = pregunta.numero;
      const area = pregunta.area;
      const sesion = pregunta.sesion;
      const respuestaCorrecta = pregunta.respuesta_correcta;
      const respuestaUsuario = opcionesSeleccionadas[idPregunta] || null;
      const esRespuestaCorrecta = respuestaUsuario?.opcion === respuestaCorrecta;
      return {
        idPregunta,
        numero,
        area,
        sesion,
        respuestaCorrecta,
        respuestaUsuario,
        esCorrecta: esRespuestaCorrecta,
      };
    });

    const tiempo = Number(
      localStorage.getItem(`contadorSegundos${simulacroEncontrado?.titulo}`)
    );

    await submitPreguntas({
      id_usuario: auth.id,
      id_simulacro: simulacroEncontrado?.id,
      estado_preguntas_sesion1: resultados,
      estado_preguntas_sesion2: null,
      tiempo_prueba_sesion1: tiempo,
      tiempo_prueba_sesion2: null,
      numero_sesion: simulacroEncontrado?.numero_sesiones,
    });

    setOpcionesSeleccionadas("");
    setTiempoAgotado(false); // Reiniciar el estado de tiempo agotado
    setSelectedTab("Matemáticas");
    localStorage.setItem("inglesPregunta", "0");
    localStorage.setItem("lecturaPregunta", "0");
    localStorage.setItem("matemáticasPregunta", "0");
    localStorage.setItem("naturalesPregunta", "0");
    localStorage.setItem("socialesPregunta", "0");
    localStorage.removeItem(`contadorSegundos${simulacroEncontrado?.titulo}`);
  };

  const guardarOpcionesEnLocalStorage = () => {
    // Guardar opciones seleccionadas en el localStorage
    localStorage.setItem(
      "opcionesSeleccionadas",
      JSON.stringify(opcionesSeleccionadas)
    );
  };

  useEffect(() => {
    guardarOpcionesEnLocalStorage();
  }, [opcionesSeleccionadas]);

  const handleSeleccionRespuesta = (opcion, id, numeroPregunta, area) => {
    // Copia del estado actual de opciones seleccionadas
    const nuevasOpcionesSeleccionadas = { ...opcionesSeleccionadas };

    // Almacena la opción seleccionada junto con los detalles adicionales
    nuevasOpcionesSeleccionadas[id] = {
      opcion,
      numeroPregunta,
      area,
    };

    // Actualiza el estado
    setOpcionesSeleccionadas(nuevasOpcionesSeleccionadas);
  };

  const handleTabChange = (index) => {
    setSelectedTab(index);
    localStorage.setItem("selectedTab", index.toString());
  };

  return (
    <TabsContext.Provider
      value={{
        selectedTab,
        handleTabChange,
        handleSeleccionRespuesta,
        opcionesSeleccionadas,
        setOpcionesSeleccionadas,
        tiempoAgotado,
        setTiempoAgotado,
        setSegundos,
        segundos,
        simulacroEncontrado,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

TabsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { TabsProvider };

export default TabsContext;
