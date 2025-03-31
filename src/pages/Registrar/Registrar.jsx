import styles from "./Registrar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import clienteAxios from "../../config/clienteAxios";
import Alerta from "../../components/Alerta/Alerta";

// Iconos
import ubicacion from "../../assets/ubicacion.png";
import emailImg from "../../assets/email.png";
import usuarioLogin from "../../assets/Usuario-login.png";
import gradoImg from "../../assets/Grado.png";
import contraseña from "../../assets/login-contraseña.png";
import imgColegio from "../../assets/colegio.png";
import nombreRegistro from "../../assets/Nombre-registro.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";

// const GRADO = [
//   "Tercero",
//   "Cuarto",
//   "Quinto",
//   "Sexto",
//   "Séptimo",
//   "Octavo",
//   "Noveno",
//   "Décimo",
//   "Undécimo",
// ];

const GRADO = ["Undécimo"];

const Registrar = () => {
  const navigate = useNavigate();

  const { colegios } = useAuth();

  const [colegio, setColegio] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");

  const [email, setEmail] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [grado, setGrado] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");

  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarRepetirPassword, setMostrarRepetirPassword] = useState(false);

  const [isNewSchool, setIsNewSchool] = useState(false);


  if (!colegios) {
    return <Loading />;
  }

  const nombresDepartamentos = Array.from(
    new Set(Object.keys(colegios).map((key) => colegios[key].departamento))
  ).sort();

  const nombresMunicipios = Array.from(
    new Set(
      Object.keys(colegios)
        .filter((key) => colegios[key].departamento === departamento)
        .map((key) => colegios[key].municipio
      )
    )
  ).sort();

  const nombresColegios = Array.from(
    new Set(
      Object.keys(colegios)
        .filter(
          (key) =>
            colegios[key].departamento === departamento &&
            colegios[key].municipio === municipio
        )
        .map((key) => colegios[key].nombre_establecimiento)
    )
  ).sort();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [
        nombres,
        apellidos,
        nombreUsuario,
        email,
        grado,
        colegio,
        // departamento,
        // municipio,
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
        nombres,
        apellidos,
        departamento,
        municipio,
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
      setNombres("");
      setApellidos("");
      setDepartamento("");
      setMunicipio("");

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

  const handleCheckboxChange = () => {
    setIsNewSchool(!isNewSchool);
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className={styles.titulo}>Crear Cuenta</h1>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <div className={styles.infoColegio}>
          <p>Información del usuario.</p>
        </div>
        <div className={styles.container}>
          <label htmlFor="nombres">
            <img className={styles.icono} src={nombreRegistro} />
          </label>
          <input
            id="nombres"
            type="text"
            placeholder="Nombres"
            className={styles.input}
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="apellido">
            <img className={styles.icono} src={nombreRegistro} />
          </label>
          <input
            id="apellido"
            type="text"
            placeholder="Apellidos"
            className={styles.input}
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </div>
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
        <div className={styles.infoColegio}>
          <p>Información del colegio.</p>
        </div>
        <div className={styles.container}>
          <img className={styles.icono} src={ubicacion} />
          <select
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            className={styles.input2}
          >
            <option value="">-- Selecciona un departamento --</option>
            {nombresDepartamentos.map((dep, index) => (
              <option key={index} value={dep}>
                {dep}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.container}>
          <img className={styles.icono} src={ubicacion} />
          <select
            value={municipio}
            onChange={(e) => setMunicipio(e.target.value)}
            className={styles.input2}
          >
            <option value="">-- Selecciona un municipio --</option>
            {nombresMunicipios.map((mun, index) => (
              <option key={index} value={mun}>
                {mun}
              </option>
            ))}
          </select>
        </div>
        {!isNewSchool && (
          <div className={styles.container}>
            <img className={styles.icono} src={imgColegio} />
            <select
              value={colegio}
              onChange={(e) => setColegio(e.target.value)}
              className={styles.input2}
            >
              <option value="">-- Selecciona un colegio --</option>
              {nombresColegios.map((col, index) => (
                <option key={index} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="addNewSchool"
            checked={isNewSchool}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="addNewSchool">El colegio no está en la lista</label>
        </div>
        {isNewSchool && (
          <div className={styles.container}>
            <img className={styles.icono} src={imgColegio} />
            <input
              type="text"
              value={colegio}
              onChange={(e) => setColegio(e.target.value)}
              placeholder="Nombre del colegio"
              className={styles.input}
            />
          </div>
        )}

        <div className={styles.container}>
          <img className={styles.icono} src={gradoImg} />
          <select
            value={grado}
            onChange={(e) => setGrado(e.target.value)}
            className={styles.input2}
          >
            <option className={styles.input2} value="">
              -- Selecciona un Grado --
            </option>
            {GRADO.map((opcion) => (
              <option key={opcion}>{opcion}</option>
            ))}
          </select>
        </div>
        <div className={styles.infoColegio}>
          <p>Asegúrate de usar una contraseña que puedas recordar.</p>
        </div>
        <div className={styles.container}>
          <label htmlFor="password">
            <img className={styles.icono} src={contraseña} />
          </label>
          <input
            id="password"
            type={mostrarPassword ? "text" : "password"}
            placeholder="Contraseña"
            className={styles.input3}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setMostrarPassword(!mostrarPassword)}
            className={styles.iconoMostrar}
          >
            {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className={styles.container}>
          <label htmlFor="repetirContraseña">
            <img className={styles.icono} src={contraseña} />
          </label>
          <input
            id="repetirContraseña"
            type={mostrarRepetirPassword ? "text" : "password"}
            placeholder="Repetir Contraseña"
            className={styles.input3}
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
          <span
            onClick={() => setMostrarRepetirPassword(!mostrarRepetirPassword)}
            className={styles.iconoMostrar}
          >
            {mostrarRepetirPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
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
