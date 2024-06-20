import { useState, useEffect, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import styles from "./ModalUsuario.module.css";
import useUsuario from "../../hooks/useUsuario";
import Alerta from "../Alerta/Alerta";
import cerrarImg from "../../assets/cerrarImg.png";

const ADMIN = ["TRUE", "FALSE"];
const GRADO = ["SÉPTIMO", "NOVENO", "UNDÉCIMO"];

const ModalUsuario = () => {
  const {
    modalUsuario,
    handleModalUsuario,
    submitUsuario,
    mostrarAlerta,
    alerta,
    usuariop,
  } = useUsuario();

  const [id, setId] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [colegio, setColegio] = useState("");
  const [grado, setGrado] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  useEffect(() => {
    if (usuariop?.id) {
      setId(usuariop.id);
      setNombreUsuario(usuariop.nombreUsuario);
      setEmail(usuariop.email);
      setColegio(usuariop.colegio);
      setPassword(usuariop.password);
      setGrado(usuariop.grado);
      setAdmin(`${usuariop.admin}`.toUpperCase());
      return;
    }
    setId("");
    setNombreUsuario("");
    setEmail("");
    setColegio("");
    setGrado("");
    setPassword("");
    setAdmin("");
  }, [usuariop]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [
        nombreUsuario,
        grado,
        colegio,
        email,
        password,
        id ? null : repetirPassword,
      ].includes("")
    ) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (!id && password.length < 8) {
      mostrarAlerta({
        msg: "El Password es muy corto, agrega mínimo 8 caracteres",
        error: true,
      });
      return;
    }

    if (!id && password !== repetirPassword) {
      mostrarAlerta({
        msg: "Las contraseñas no son iguales. Por favor, revisa la contraseña.",
        error: true,
      });
      setTimeout(() => {
        mostrarAlerta({});
      }, 5000);
      return;
    }

    if (id) {
      await submitUsuario({
        id,
        nombreUsuario,
        colegio,
        grado,
        email,
        admin,
        password,
      });
    } else {
      await submitUsuario({
        nombreUsuario,
        colegio,
        grado,
        email,
        password,
        admin,
      });
    }
  };

  const { msg } = alerta;

  return (
    <Transition show={modalUsuario} as={Fragment}>
      <Dialog
        as="div"
        className={styles.modalOverlay}
        onClose={handleModalUsuario}
      >
        <div className={styles.modalContentContainer}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className={styles.modal}>
              <div className={styles.contenedorBoton}>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={handleModalUsuario}
                >
                  <img src={cerrarImg} className={styles.icono} />
                </button>
              </div>
              <div className={styles.modalTitle}>
                {id ? "Editar Usuario" : "Crear Usuario"}
              </div>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Nombre de usuario:</label>
                  <input
                    type="text"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Colegio:</label>
                  <input
                    type="text"
                    value={colegio}
                    onChange={(e) => setColegio(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Grado</label>
                  <select
                    value={grado}
                    onChange={(e) => setGrado(e.target.value)}
                    className={styles.select}
                  >
                    <option className={styles.input2} value="">
                      -- Selecciona un Grado --
                    </option>
                    {GRADO.map((opcion) => (
                      <option key={opcion}>{opcion}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.label}>Contraseña:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>

                {id ? null : (
                  <div className={styles.inputContainer}>
                    <label className={styles.label}>Repetir Contraseña:</label>
                    <input
                      type="password"
                      value={repetirPassword}
                      onChange={(e) => setRepetirPassword(e.target.value)}
                      className={styles.input}
                      autoComplete="off"
                    />
                  </div>
                )}
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Es Admin?</label>
                  <select
                    value={admin}
                    onChange={(e) => setAdmin(e.target.value)}
                    className={styles.select}
                  >
                    <option className={styles.input2} value="">
                      -- Selecciona un Admin --
                    </option>
                    {ADMIN.map((opcion, index) => (
                      <option key={index} value={opcion}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>
                {msg && <Alerta alerta={alerta} />}
                <input
                  type="submit"
                  className={styles.submitButton}
                  value={id ? "Guardar Cambios" : "Crear Usuario"}
                />
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalUsuario;
