import { useContext } from "react";
import PreguntaContext from "../context/PreguntaProvider";

const usePregunta = () => {
  return useContext(PreguntaContext);
};

export default usePregunta;