import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import Alerta from "../../components/Alerta/Alerta";
import styles from "./NuevoPassword.module.css";
import contrasenaImg from "../../assets/login-contraseña.png";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [passwordModificado, setPasswordModificado] = useState(false);
  const [cargando, setCargando] = useState(true);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
        setCargando(false);
      } catch (error) {
        setCargando(false);
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
        setTimeout(() => {
          setAlerta({});
        }, 5000);
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "La Contraseña debe ser mínimo de 6 caracteres",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 5000);
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setTimeout(() => {
        setAlerta({});
        setPasswordModificado(true);
        setTokenValido(false);
        
      }, 5000);
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

  const { msg } = alerta;

  if (cargando) return "Cargando...";

  return (
    <>
      {!tokenValido && !passwordModificado && (
        <div className={styles.containerClick}>
          <h2 className={styles.titulo}>Token no válido</h2>
          <Link className={styles.link} to="/">
            <input
              type="button"
              value="Ir a la pagina principal"
              className={styles.click}
            />
          </Link>
        </div>
      )}
      {tokenValido && (
        <>
          <div>
            <h1 className={styles.titulo}>
              Reestablece tu Contraseña de Saber365
            </h1>
          </div>
          <form className={styles.formulario} onSubmit={handleSubmit}>
            <div className={styles.containerPrincipal}>
              <div className={styles.container}>
                <label htmlFor="password">
                  <img className={styles.icono} src={contrasenaImg} />
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Escribe tu Nueva Contraseña"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>{msg && <Alerta alerta={alerta} />}</div>
            <div className={styles.contenedor_botones}>
              <input
                type="submit"
                value="Guardar Nueva Contraseña"
                className={styles.boton}
              />
            </div>
          </form>
        </>
      )}

      {passwordModificado && (
        <div className={styles.containerClick}>
          <h2 className={styles.titulo}>Inicia tu Sesión Aquí</h2>
          <Link className={styles.link} to="/autenticar">
            <input type="button" value="Click Aquí" className={styles.click} />
          </Link>
        </div>
      )}
    </>
  );
};

export default NuevoPassword;
