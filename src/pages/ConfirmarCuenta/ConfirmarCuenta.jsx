import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import styles from "./ConfirmarCuenta.module.css";

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [tokenValido, setTokenValido] = useState(false);

  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${id}`);
        setTokenValido(true);
        setCargando(false);
      } catch (error) {
        setCargando(false);
      }
    };
    comprobarToken();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `/usuarios/confirmar/${id}`;
      await clienteAxios(url);
      setCuentaConfirmada(true);
      setCargando(false);
      setTokenValido(false);
      navigate("/autenticar");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setCuentaConfirmada(false);
      setCargando(false);
    }
  };

  if (cargando) return "Cargando...";
  const { msg } = alerta;

  return (
    <>
      {!tokenValido && (
        <div className={styles.containerClick}>
          <h2 className={styles.titulo}>Estado de tu cuenta Saber365</h2>
          <h3>Token no válido</h3>
          <Link className={styles.link} to="/">
            <input
              type="button"
              value="Ir a la pagina principal"
              className={styles.click}
            />
          </Link>
        </div>
      )}

      {tokenValido && !cuentaConfirmada && (
        <form onSubmit={handleSubmit}>
          <div className={styles.containerClick}>
            <h2 className={styles.titulo}>Estado de tu cuenta Saber365</h2>
            <h3>Confirma tu cuenta Aquí</h3>
            <input
              type="submit"
              value="Confirma tu cuenta"
              className={styles.click}
            />
            <h2>{msg}</h2>
          </div>
        </form>
      )}
    </>
  );
};

export default ConfirmarCuenta;
