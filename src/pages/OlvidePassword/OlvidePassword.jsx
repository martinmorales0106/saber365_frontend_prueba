import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import Alerta from "../../components/Alerta/Alerta";
import { useNavigate } from "react-router-dom";
import emailImg from "../../assets/email.png";
import styles from "./OlvidePassword.module.css";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      setAlerta({
        msg: "El Email es obligatorio",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 5000);
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {
        email,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/autenticar");
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

  const handleCancel = () => {
    // Redirige a la página anterior
    navigate(-1);
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className={styles.titulo}> Recupera tu acceso a Saber365</h1>
      </div>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <div className={styles.containerPrincipal}>
          <div className={styles.container}>
            <label htmlFor="email">
              <img className={styles.icono} src={emailImg} />
            </label>
            <input
              id="email"
              type="email"
              placeholder="Correo Electrónico"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div>{msg && <Alerta alerta={alerta} />}</div>
        <div className={styles.contenedor_botones}>
          <input
            type="submit"
            value="Enviar Instrucciones"
            className={styles.boton}
          />
          <input
            type="button"
            value="Cancelar"
            className={styles.boton}
            onClick={handleCancel}
          />
        </div>
        <hr />
        <div className={styles.containerEnlaces}>
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
              ¿Ya tienes una cuenta? <br />
              <Link className={styles.link} to="/autenticar">
                <span className={styles.span}>Inicia Sesión</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default OlvidePassword;
