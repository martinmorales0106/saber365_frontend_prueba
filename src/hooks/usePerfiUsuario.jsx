import { useContext } from "react";
import PerfilUsuarioContext from "../context/PerfilUsuarioProvider";

const usePerfilUsuario = () => {
  return useContext(PerfilUsuarioContext);
};

export default usePerfilUsuario;
