import { useContext } from "react";
import SimulacroContext from "../context/SimulacroProvider";

const useSimulacro = () => {
  return useContext(SimulacroContext);
};

export default useSimulacro;