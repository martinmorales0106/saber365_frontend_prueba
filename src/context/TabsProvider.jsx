import { createContext, useState } from "react";

import PropTypes from "prop-types"; // Importa PropTypes


const TabsContext = createContext();

const TabsProvider = ({ children }) => {


  const [selectedTab, setSelectedTab] = useState("");

  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState({});


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
