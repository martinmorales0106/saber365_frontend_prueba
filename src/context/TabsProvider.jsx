import { createContext, useEffect, useRef, useState } from "react";

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
    // Recuperar el tiempo restante del localStorage al inicio
    const tiempoRestante = localStorage.getItem("contadorSegundos");
    return tiempoRestante === "0" ? simulacroEncontrado?.tiempo : parseInt(tiempoRestante);
  });

  const formRef = useRef(null);

  useEffect(() => {
    if (segundos === 0 && !tiempoAgotado) {
      handleSubmit();
    }
  }, [tiempoAgotado, segundos]);

  const handleSubmit = async () => {
    const resultados = preguntasSimulacro.map((pregunta) => {
      const idPregunta = pregunta.id;
      const area = pregunta.area;
      const sesion = pregunta.sesion;
      const respuestaCorrecta = pregunta.respuesta_correcta;
      const respuestaUsuario = opcionesSeleccionadas[idPregunta] || null;
      const esRespuestaCorrecta = respuestaUsuario === respuestaCorrecta;
      return {
        idPregunta,
        area,
        sesion,
        respuestaCorrecta,
        respuestaUsuario,
        esCorrecta: esRespuestaCorrecta,
      };
    });

    const tiempo = Number(localStorage.getItem("contadorSegundos"));

    await submitPreguntas({
      id_usuario: auth.id,
      id_simulacro: preguntasSimulacro[0].id_simulacro,
      estado_preguntas_sesion1: resultados,
      estado_preguntas_sesion2: null,
      tiempo_prueba_sesion1: tiempo,
      tiempo_prueba_sesion2: null,
      numero_sesion: simulacroEncontrado.numero_sesiones,
    });

    setOpcionesSeleccionadas("");

    setSegundos(simulacroEncontrado?.tiempo); // Reiniciar el temporizador
    setTiempoAgotado(false); // Reiniciar el estado de tiempo agotado
  };

  useEffect(() => {
    setSegundos(simulacroEncontrado?.tiempo);
  }, [tiempoAgotado]);

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

  const handleSeleccionRespuesta = (opcion, id) => {
    // Copia del estado actual de opciones seleccionadas
    const nuevasOpcionesSeleccionadas = { ...opcionesSeleccionadas };

    // Almacena la opción seleccionada para la pregunta actual
    nuevasOpcionesSeleccionadas[id] = opcion;

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
        formRef,
        tiempoAgotado,
        setTiempoAgotado,
        setSegundos,
        segundos,
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
