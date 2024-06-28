import { createContext, useEffect, useState } from "react";

import PropTypes from "prop-types"; // Importa PropTypes


const TabsContext = createContext();

const TabsProvider = ({ children }) => {


  const [selectedTab, setSelectedTab] = useState(() => {
    const storedValue = localStorage.getItem("selectedTab");
    return storedValue ? storedValue : "Matemáticas";
  });

  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState(() => {
    // Recuperar opciones seleccionadas del localStorage al inicio
    const savedOptions = localStorage.getItem("opcionesSeleccionadas");
    return savedOptions ? JSON.parse(savedOptions) : {};
  });

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
