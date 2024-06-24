import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../../components/Alerta/Alerta";
import clienteAxios from "../../config/clienteAxios";

import styles from "./Login.module.css";
import usuarioLogin from "../../assets/Usuario-login.png";
import LoginContraseña from "../../assets/login-contraseña.png";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([username, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 5000);
      return;
    }

    try {
      const { data } = await clienteAxios.post("/usuarios/login", {
        username,
        password,
      });
      setAlerta({});
      localStorage.setItem("token", data.token);
      localStorage.setItem("authUser", JSON.stringify(data));
      setAuth(data);
      navigate("/");
    } catch (error) { 
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 5000);
    }
  };

  const handleCancel = () => {
    // Redirige a la página anterior
    navigate(-1);
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className={styles.titulo}>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <div className={styles.container}>
          <label htmlFor="usuario">
            <img className={styles.icono} src={usuarioLogin} />
          </label>
          <input
            id="usuario"
            type="text"
            placeholder="Email o Usuario de Registro"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="contraseña">
            <img className={styles.icono} src={LoginContraseña} />
          </label>
          <input
            id="contraseña"
            type="password"
            placeholder="Contraseña"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <div className={styles.parrafo}>
          <hr/>
          <p>
            Al ingresar aceptas los{" "}
            <span className={styles.span}>Términos y Condiciones</span>
          </p>
        </div>
        {msg && <Alerta alerta={alerta} />}
        <div className={styles.contenedor_botones}>
          <input
            type="submit"
            value="Iniciar Sesión"
            className={styles.boton}
          />
          <input
            type="button"
            value="Cancelar"
            className={styles.boton}
            onClick={handleCancel}
          />
        </div>
        <div className={styles.crear_cuenta}>
          <p>
            ¿Eres nuevo en Saber365? <br />
            <span className={styles.span}>
              <Link className={styles.link} to="/autenticar/registrar">
                Crear Cuenta{" "}
              </Link>
            </span>
          </p>
          <p>
            ¿Olvidaste la contraseña? <br />
            <Link className={styles.link} to="/autenticar/olvide-password">
              <span className={styles.span}>Recuperar aquí</span>
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
