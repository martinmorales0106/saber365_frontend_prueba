import styles from "./Registrar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import clienteAxios from "../../config/clienteAxios";
import Alerta from "../../components/Alerta/Alerta";

// Iconos

import emailImg from "../../assets/email.png";
import usuarioLogin from "../../assets/Usuario-login.png";
import gradoImg from "../../assets/Grado.png";
import contraseña from "../../assets/login-contraseña.png";
import imgColegio from "../../assets/colegio.png";

const GRADO = ["SÉPTIMO", "NOVENO", "UNDÉCIMO"];

const Registrar = () => {
  const navigate = useNavigate();

  const [colegio, setColegio] = useState("");
  const [email, setEmail] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [grado, setGrado] = useState("");

  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const { data } = await clienteAxios("/usuarios/obtener-colegios");
  //       setColegiosData(data);
  //     } catch (error) {
  //       console.error("Error al obtener los colegios: " + error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  // const departamentos = [
  //   ...new Set(colegiosData.map((colegio) => colegio.departamento)),
  // ];

  // const municipios = [
  //   ...new Set(
  //     colegiosData
  //       .filter((colegio) => colegio.departamento === departamento)
  //       .map((colegio) => colegio.municipio)
  //   ),
  // ];

  // const colegios = [
  //   ...new Set(
  //     colegiosData
  //       .filter(
  //         (col) =>
  //           col.departamento === departamento && col.municipio === municipio
  //       )
  //       .map((colegio) => colegio.nombre_establecimiento)
  //   ),
  // ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [
        nombreUsuario,
        email,
        grado,
        colegio,
        password,
        repetirPassword,
      ].includes("")
    ) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 5000);
      return;
    }

    if (password.length < 8) {
      setAlerta({
        msg: "La Contraseña debe tener mínimo 8 caracteres",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 5000);
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: "Las contraseñas no son iguales. Por favor, revisa la contraseña.",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 5000);
      return;
    }

    

    try {
      const { data } = await clienteAxios.post(`/usuarios`, {
        email,
        nombreUsuario,
        grado,
        password,
        colegio,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setEmail("");
      setNombreUsuario("");
      setGrado("");
      setPassword("");
      setRepetirPassword("");
      setColegio("");

      setTimeout(() => {
        setAlerta({});
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
      <h1 className={styles.titulo}>Crear Cuenta</h1>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <div className={styles.container}>
          <label htmlFor="usuario">
            <img className={styles.icono} src={usuarioLogin} />
          </label>
          <input
            id="usuario"
            type="text"
            placeholder="Usuario"
            className={styles.input}
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="email">
            <img className={styles.icono} src={emailImg} alt="Icono de email" />
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

        <div className={styles.container}>
          <label htmlFor="colegio">
            <img className={styles.icono} src={imgColegio} />
          </label>
          <input
            id="colegio"
            type="text"
            placeholder="Colegio"
            className={styles.input}
            value={colegio}
            onChange={(e) => setColegio(e.target.value)}
          />
        </div>

        <div className={styles.container}>
          <img className={styles.icono} src={gradoImg} />
          <select
            value={grado}
            onChange={(e) => setGrado(e.target.value)}
            className={styles.input2}
          >
            <option className={styles.input2} value="">-- Selecciona un Grado --</option>
            {GRADO.map((opcion) => (
              <option key={opcion}>{opcion}</option>
            ))}
          </select>
        </div>

        <div className={styles.container}>
          <label htmlFor="password">
            <img className={styles.icono} src={contraseña} />
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="repetirContraseña">
            <img className={styles.icono} src={contraseña} />
          </label>
          <input
            id="repetirContraseña"
            type="password"
            placeholder="Repetir Contraseña"
            className={styles.input}
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>
        <div className={styles.parrafo}>
          <hr />
          <p>
            Al registrarte aceptas los{" "}
            <span className={styles.span}>Términos y Condiciones</span>
          </p>
        </div>
        {msg && <Alerta alerta={alerta} />}
        <div className={styles.contenedor_botones}>
          <input type="submit" value="Crear Cuenta" className={styles.boton} />
          <input
            type="button"
            value="Cancelar"
            className={styles.boton}
            onClick={handleCancel}
          />
        </div>
        <div className={styles.crear_cuenta}>
          <p>
            ¿Ya tienes una cuenta?{" "}
            <span className={styles.span}>
              <br />
              <Link className={styles.link} to="/autenticar">
                Iniciar sesión{" "}
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

export default Registrar;
