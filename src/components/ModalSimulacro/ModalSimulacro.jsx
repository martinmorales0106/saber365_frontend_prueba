import { Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import useSimulacro from "../../hooks/useSimulacro";
import styles from "./ModalSimulacro.module.css";
import Alerta from "../Alerta/Alerta";
import cerrarImg from "../../assets/cerrarImg.png";

const GRADO = ["SÉPTIMO", "NOVENO", "UNDÉCIMO"];

const ModalSimulacro = () => {
  const {
    modalSimulacro,
    handleModalSimulacro,
    submitSimulacro,
    mostrarAlerta,
    alerta,
    simulacrop,
  } = useSimulacro();

  const [id, setId] = useState("");
  const [imagen, setImagen] = useState("");
  const [titulo, setTitulo] = useState("");
  const [grado, setGrado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad_preguntas, setCantidad_preguntas] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [numero_sesiones, setNumero_sesiones] = useState("");
  const [puntaje_maximo, setPuntaje_maximo] = useState("");
  const [precio, setPrecio] = useState(0);
  const [activo, setActivo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (simulacrop?.id) {
      setId(simulacrop.id);
      setImagen(simulacrop.imagen);
      setTitulo(simulacrop.titulo);
      setGrado(simulacrop.grado);
      setDescripcion(simulacrop.descripcion);
      setCantidad_preguntas(simulacrop.cantidad_preguntas);
      setTiempo(simulacrop.tiempo);
      setNumero_sesiones(simulacrop.numero_sesiones);
      setPuntaje_maximo(simulacrop.puntaje_maximo);
      setPrecio(simulacrop.precio);
      setActivo(simulacrop.activo);

      return;
    }
    setId("");
    setImagen("");
    setTitulo("");
    setGrado("");
    setDescripcion("");
    setCantidad_preguntas("");
    setTiempo("");
    setNumero_sesiones("");
    setPuntaje_maximo("");
    setPrecio("");
    setActivo("");
  }, [simulacrop]);

  const uploadImagen = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "saber365");
    data.append("cloud_name", "dnkasq2l0");

    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dnkasq2l0/image/upload",
      {
        method: "post",
        body: data,
      }
    );

    const file = await res.json();

    setImagen(file.secure_url);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [
        imagen,
        titulo,
        grado,
        descripcion,
        cantidad_preguntas,
        tiempo,
        numero_sesiones,
        puntaje_maximo,
        precio,
      ].includes("")
    ) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (id) {
      await submitSimulacro({
        id,
        imagen,
        titulo,
        grado,
        descripcion,
        cantidad_preguntas,
        tiempo,
        numero_sesiones,
        puntaje_maximo,
        precio,
      });
    } else {
      await submitSimulacro({
        imagen,
        titulo,
        grado,
        descripcion,
        cantidad_preguntas,
        tiempo,
        numero_sesiones,
        puntaje_maximo,
        precio,
        activo,
      });
    }
  };

  const { msg } = alerta;

  return (
    <Transition show={modalSimulacro} as={Fragment}>
      <Dialog
        as="div"
        className={styles.modalOverlay}
        onClose={handleModalSimulacro}
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
                  onClick={handleModalSimulacro}
                >
                  <img src={cerrarImg} className={styles.icono} />
                </button>
              </div>
              <div className={styles.modalTitle}>
                {id ? "Editar Simulacro" : "Crear Simulacro"}
              </div>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Titulo:</label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
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
                  <label htmlFor="imagen" className={styles.label}>
                    Imagen:
                  </label>
                  <input
                    type="file"
                    id="imagen"
                    accept="image/*"
                    onChange={uploadImagen}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                {loading ? (
                  <h3 className={styles.tituloImagen}>Cargando Imagen...</h3>
                ) : (
                  <div className={styles.tituloImagen}>
                    <img
                      src={imagen}
                      alt="Imagen del simulacro"
                      className={styles.imagen}
                    />
                  </div>
                )}
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Descripción:</label>
                  <input
                    type="text"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.label}>Cantidad de preguntas:</label>
                  <input
                    type="number"
                    value={cantidad_preguntas}
                    onChange={(e) => setCantidad_preguntas(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.label}>Tiempo:</label>
                  <input
                    type="text"
                    value={tiempo}
                    onChange={(e) => setTiempo(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.label}>Número de sesiones:</label>
                  <input
                    type="number"
                    value={numero_sesiones}
                    onChange={(e) => setNumero_sesiones(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.label}>Puntaje Máximo:</label>
                  <input
                    type="number"
                    value={puntaje_maximo}
                    onChange={(e) => setPuntaje_maximo(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.label}>Precio:</label>
                  <input
                    type="number"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
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

export default ModalSimulacro;
