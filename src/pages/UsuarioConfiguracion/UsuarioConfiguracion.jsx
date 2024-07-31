import styles from "./UsuarioConfiguracion.module.css";
import configuracionImg from "../../assets/configuraciones.png";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Alerta from "../../components/Alerta/Alerta";
import usuarioLogin from "../../assets/Usuario-login.png";
import emailImg from "../../assets/email.png";
import gradoImg from "../../assets/Grado.png";
import contraseña from "../../assets/login-contraseña.png";
import imgColegio from "../../assets/colegio.png";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const GRADO = ["Tercero","Cuarto","Quinto","Sexto","Séptimo","Octavo", "Noveno","Décimo", "Undécimo"];

const UsuarioConfiguracion = () => {
  const { auth, setAuth } = useAuth();
  const { updateUsuario, mostrarAlerta, alerta, updateUsuarioContraseña } =
    usePerfilUsuario();

  const [id, setId] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [colegio, setColegio] = useState("");
  const [grado, setGrado] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [nuevoPassword, setNuevoPassword] = useState("");
  const [alertaUsuario, setAlertaUsuario] = useState(false);
  const [alertaContraseña, setAlertaContraseña] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarNuevoPassword, setMostrarNuevoPassword] = useState(false);
  const [mostrarRepetirPassword, setMostrarRepetirPassword] = useState(false);

  useEffect(() => {
    if (auth?.id) {
      setId(auth.id);
      setNombreUsuario(auth.nombreUsuario);
      setEmail(auth.email);
      setColegio(auth.colegio);
      setGrado(auth.grado);
      return;
    }
    setId("");
    setNombreUsuario("");
    setEmail("");
    setColegio("");
    setGrado("");
  }, [auth]);

  // Actualizar un campo específico del formulario

  const submitEditarUsuario = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los cambios o realizar cualquier otra lógica

    if ([nombreUsuario, grado, colegio, email].includes("")) {
      setAlertaUsuario(true);
      setAlertaContraseña(false);

      mostrarAlerta({
        msg: "Todos los campos son obligatorios para actualizar la información de tu perfil.",
        error: true,
      });
      return;
    }

    const editado = {
      id,
      nombreUsuario,
      colegio,
      grado,
      email,
    };

    updateUsuario(editado);
    setAuth(editado);
    localStorage.setItem("authUser", JSON.stringify(editado));
    setAlertaUsuario(true);
    setAlertaContraseña(false);
  };

  const confirmarEnviarInformacion = (e) => {
    e.preventDefault();
    // preguntar al usuario
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Vas a modificar la información para acceder a Saber365",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, modificar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a enviar la información del usuario
        submitEditarUsuario(e); // Aquí pasamos el evento `e`
      }
    });
  };

  const handleEditarUsuario = (e) => {
    e.preventDefault();

    if ([password, nuevoPassword, repetirPassword].includes("")) {
      setAlertaContraseña(true);
      setAlertaUsuario(false);

      mostrarAlerta({
        msg: "Todos los campos son obligatorios para modificar la contraseña.",
        error: true,
      });
      return;
    }

    if (password.length < 8) {
      setAlertaContraseña(true);
      setAlertaUsuario(false);
      mostrarAlerta({
        msg: "La Contraseña debe tener mínimo 8 caracteres",
        error: true,
      });
      return;
    }

    if (nuevoPassword.length < 8) {
      setAlertaContraseña(true);
      setAlertaUsuario(false);
      mostrarAlerta({
        msg: "La nueva contraseña debe tener mínimo 8 caracteres",
        error: true,
      });
      return;
    }

    if (nuevoPassword !== repetirPassword) {
      setAlertaContraseña(true);
      setAlertaUsuario(false);
      mostrarAlerta({
        msg: "Las contraseñas no son iguales. Por favor, revisa la contraseña.",
        error: true,
      });
      return;
    }

    const editado = {
      id: auth.id,
      password,
      nuevoPassword,
    };
    updateUsuarioContraseña(editado);
    setAlertaContraseña(true);
    setAlertaUsuario(false);
  };

  const confirmarEnviarContraseña = (e) => {
    e.preventDefault();
    // preguntar al usuario
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Vas a modificar tu contraseña para acceder a Saber365",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, modificar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a enviar la información del usuario
        handleEditarUsuario(e); // Aquí pasamos el evento `e`
      }
    });
  };

  const { msg, error } = alerta;

  return (
    <div className={styles.fondo}>
      <div className={styles.container2}>
        <div className={styles.contenedor}>
          <form
            onSubmit={confirmarEnviarInformacion}
            className={styles.formulario}
          >
            <div className={styles.tituloConfiguracion}>
              <img
                className={styles.icono2}
                src={configuracionImg}
                alt="Logo"
              />
              <h2>Ajuste de Perfil</h2>
            </div>
            <div>
              <h3>Información del usuario</h3>
              <p>Actualiza la información de tu perfil.</p>
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
                <img
                  className={styles.icono}
                  src={emailImg}
                  alt="Icono de email"
                />
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
                <option className={styles.input2} value="">
                  -- Selecciona un Grado --
                </option>
                {GRADO.map((opcion) => (
                  <option key={opcion}>{opcion}</option>
                ))}
              </select>
            </div>
            {msg && alertaUsuario && error === true && (
              <Alerta alerta={alerta} />
            )}
            <div className={styles.contenedor_botones}>
              <input
                type="submit"
                value="Guardar Cambios"
                className={styles.boton}
              />
            </div>
          </form>
        </div>
        <div className={styles.contenedor2}>
          <form
            onSubmit={confirmarEnviarContraseña}
            className={styles.formulario}
          >
            <div>
              <h3>Contraseña</h3>
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
                className={styles.input}
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
              <label htmlFor="nuevaContraseña">
                <img className={styles.icono} src={contraseña} />
              </label>
              <input
                id="nuevaContraseña"
                type={mostrarNuevoPassword ? "text" : "password"}
                placeholder="Nueva Contraseña"
                className={styles.input}
                value={nuevoPassword}
                onChange={(e) => setNuevoPassword(e.target.value)}
              />
              <span
                onClick={() => setMostrarNuevoPassword(!mostrarNuevoPassword)}
                className={styles.iconoMostrar}
              >
                {mostrarNuevoPassword ? <FaEyeSlash /> : <FaEye />}
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
                className={styles.input}
                value={repetirPassword}
                onChange={(e) => setRepetirPassword(e.target.value)}
              />
              <span
                onClick={() =>
                  setMostrarRepetirPassword(!mostrarRepetirPassword)
                }
                className={styles.iconoMostrar}
              >
                {mostrarRepetirPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {msg && alertaContraseña && error === true && (
              <Alerta alerta={alerta} />
            )}
            <div className={styles.contenedor_botones}>
              <input
                type="submit"
                value="Guardar Cambios"
                className={styles.boton}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsuarioConfiguracion;
