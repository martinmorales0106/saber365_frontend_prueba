import { useState, useEffect, createContext } from "react";

import clienteAxios from "../config/clienteAxios";
import PropTypes from "prop-types"; // Importa PropTypes
import axios from 'axios'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem("authUser");
  const [auth, setAuth] = useState(storedUser ? JSON.parse(storedUser) : {});
  const [cargando, setCargando] = useState(true);
  const [cargandoCol, setCargandoCol] = useState(true);
  const [colegios, setColegios] = useState({});
  
  useEffect(() => {
    const apiUrl = "https://www.datos.gov.co/resource/28ii-2jxz.json";
    const appToken = "0mOA5CbJo9E2GsZwIAMYiqDA0";

    const fetchColegios = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            $$app_token: appToken,
            $limit: 575403,
          },
        });
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
  }, []);

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
