import { useState, useEffect, createContext } from "react";

import clienteAxios from "../config/clienteAxios";
import PropTypes from "prop-types"; // Importa PropTypes

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem("authUser");
  const [auth, setAuth] = useState(storedUser ? JSON.parse(storedUser) : {});
  const [cargando, setCargando] = useState(true);
  const [cargandoCol, setCargandoCol] = useState(true);
  const [colegios, setColegios] = useState({});
  
  useEffect(() => {
    const fetchColegios = async () => {
      try {
        const response = await clienteAxios(`/usuarios/obtener-colegios`);
        setColegios(response.data);
        const timer = setTimeout(() => {
          setCargandoCol(false);
        }, 1000);

        // Limpiar el temporizador cuando el componente se desmonte
        return () => clearTimeout(timer);
      } catch (error) {
        console.log(error);
      }
    };

    fetchColegios();
  }
, []);

  useEffect(() => {
    const autenticarUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Establecer un tiempo fijo de carga de 2 segundos
          const timer = setTimeout(() => {
            setCargando(false);
          }, 1000);

          // Limpiar el temporizador cuando el componente se desmonte
          return () => clearTimeout(timer);
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data);
        // Establecer un tiempo fijo de carga de 2 segundos
        const timer = setTimeout(() => {
          setCargando(false);
        }, 1000);

        // Limpiar el temporizador cuando el componente se desmonte
        return () => clearTimeout(timer);
      } catch (error) {
        setAuth({});
      }
    };
    autenticarUsuario();
  }, [auth?.id]);

  const cerrarSesionAuth = () => {
    setAuth({});
    localStorage.setItem("authUser", JSON.stringify({}));
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesionAuth,
        colegios,
        cargandoCol,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider };

export default AuthContext;
