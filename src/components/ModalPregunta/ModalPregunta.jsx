import { Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import usePregunta from "../../hooks/usePregunta";
import styles from "./ModalPregunta.module.css";
import Alerta from "../Alerta/Alerta";
import cerrarImg from "../../assets/cerrarImg.png";

const GRADO = ["TERCERO","CUARTO","QUINTO","SEXTO","SÉPTIMO","OCTAVO", "NOVENO","DÉCIMO", "UNDÉCIMO"];

const AREA =["Matemáticas", "Lectura Critica","Sociales", "Naturales", "Ingles", "Lenguaje", "C. Ciudadana"]

const ModalPregunta = () => {
  const {
    modalPregunta,
    handleModalPregunta,
    submitPregunta,
    mostrarAlerta,
    alerta,
    preguntap
  } = usePregunta();

  const [id, setId] = useState("");
  const [contexto, setContexto] = useState("");
  const [imagen, setImagen] = useState("");
  const [preguntaText, setPreguntaText] = useState("");
  const [opcionA, setOpcionA] = useState("");
  const [opcionB, setOpcionB] = useState("");
  const [opcionC, setOpcionC] = useState("");
  const [opcionD, setOpcionD] = useState("");
  const [respuesta_correcta, setRespuestaCorrecta] = useState("");
  const [afirmacion, setAfirmacion] = useState("");
  const [evidencia, setEvidencia] = useState("");
  const [justificacion, setJustificacion] = useState("");
  const [img_Justificacion, setImgJustificacion] = useState("");
  const [sesion, setSesion] = useState("");
  const [area, setArea] = useState("");
  const [grado, setGrado] = useState("");
  const [competencia, setCompetencia] = useState("");
  const [componente, setComponente] = useState("");
  const [nivel, setNivel] = useState("");
  const [simulacro, setSimulacro] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preguntap?.id) {
      setId(preguntap.id);
      setContexto(preguntap.contexto);
      setImagen(preguntap.imagen);
      setPreguntaText(preguntap.pregunta);
      setOpcionA(preguntap.opcionA);
      setOpcionB(preguntap.opcionB);
      setOpcionC(preguntap.opcionC);
      setOpcionD(preguntap.opcionD);
      setRespuestaCorrecta(preguntap.respuesta_correcta);
      setAfirmacion(preguntap.afirmacion);
      setEvidencia(preguntap.evidencia);
      setJustificacion(preguntap.justificacion);
      setImgJustificacion(preguntap.img_Justificacion);
      setSesion(preguntap.sesion);
      setArea(preguntap.area);
      setGrado(preguntap.grado);
      setCompetencia(preguntap.competencia);
      setComponente(preguntap.componente);
      setNivel(preguntap.nivel);
      setSimulacro(preguntap.titulo_simulacro);
    } else {
      setId("");
      setContexto("");
      setImagen("");
      setPreguntaText("");
      setOpcionA("");
      setOpcionB("");
      setOpcionC("");
      setOpcionD("");
      setRespuestaCorrecta("");
      setAfirmacion("");
      setEvidencia("");
      setJustificacion("");
      setImgJustificacion("");
      setSesion("");
      setArea("");
      setGrado("");
      setCompetencia("");
      setComponente("");
      setNivel("");
      setSimulacro("");
    }
  }, [preguntap]);

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

  const uploadImagen2 = async (e) => {
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

    setImgJustificacion(file.secure_url);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [
        contexto,
        preguntaText,
        opcionA,
        opcionB,
        opcionC,
        opcionD,
        respuesta_correcta,
        justificacion,
        sesion,
        area,
        grado,
        competencia,
        simulacro,
      ].includes("")
    ) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (id) {
      await submitPregunta({
        id,
        contexto,
        imagen,
        pregunta: preguntaText,
        opcionA,
        opcionB,
        opcionC,
        opcionD,
        respuesta_correcta,
        afirmacion,
        evidencia,
        justificacion,
        img_Justificacion,
        sesion,
        area,
        grado,
        competencia,
        componente,
        nivel,
        simulacro,
      });
    } else {
      await submitPregunta({
        contexto,
        imagen,
        pregunta: preguntaText,
        opcionA,
        opcionB,
        opcionC,
        opcionD,
        respuesta_correcta,
        afirmacion,
        evidencia,
        justificacion,
        img_Justificacion,
        sesion,
        area,
        grado,
        competencia,
        componente,
        nivel,
        simulacro,
      });
    }
  };

  const { msg } = alerta;

  return (
    <Transition show={modalPregunta} as={Fragment}>
    <Dialog
      as="div"
      className={styles.modalOverlay}
      onClose={handleModalPregunta}
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
                onClick={handleModalPregunta}
              >
                <img src={cerrarImg} className={styles.icono} />
              </button>
            </div>
            <div className={styles.modalTitle}>
              {id ? "Editar Pregunta" : "Crear Pregunta"}
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Contexto:</label>
                <input
                  type="text"
                  value={contexto}
                  onChange={(e) => setContexto(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
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
                    alt="Imagen de la pregunta"
                    className={styles.imagen}
                  />
                </div>
              )}
              <div className={styles.inputContainer}>
                <label className={styles.label}>Pregunta:</label>
                <input
                  type="text"
                  value={preguntaText}
                  onChange={(e) => setPreguntaText(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Opción A:</label>
                <input
                  type="text"
                  value={opcionA}
                  onChange={(e) => setOpcionA(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Opción B:</label>
                <input
                  type="text"
                  value={opcionB}
                  onChange={(e) => setOpcionB(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Opción C:</label>
                <input
                  type="text"
                  value={opcionC}
                  onChange={(e) => setOpcionC(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Opción D:</label>
                <input
                  type="text"
                  value={opcionD}
                  onChange={(e) => setOpcionD(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Respuesta Correcta:</label>
                <input
                  type="text"
                  value={respuesta_correcta}
                  onChange={(e) => setRespuestaCorrecta(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Afirmación:</label>
                <input
                  type="text"
                  value={afirmacion}
                  onChange={(e) => setAfirmacion(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Evidencia:</label>
                <input
                  type="text"
                  value={evidencia}
                  onChange={(e) => setEvidencia(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Justificación:</label>
                <input
                  type="text"
                  value={justificacion}
                  onChange={(e) => setJustificacion(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="img_Justificacion" className={styles.label}>
                  Imagen Justificación:
                </label>
                <input
                  type="file"
                  id="img_Justificacion"
                  accept="image/*"
                  onChange={uploadImagen2}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>
              {loading ? (
                <h3 className={styles.tituloImagen}>Cargando Imagen...</h3>
              ) : (
                <div className={styles.tituloImagen}>
                  <img
                    src={img_Justificacion}
                    alt="Imagen Justificación"
                    className={styles.imagen}
                  />
                </div>
              )}
              <div className={styles.inputContainer}>
                <label className={styles.label}>Sesión:</label>
                <input
                  type="text"
                  value={sesion}
                  onChange={(e) => setSesion(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>
              <div className={styles.inputContainer}>
                  <label className={styles.label}>Area: </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className={styles.select}
                  >
                    <option className={styles.input2} value="">
                      -- Selecciona una Area --
                    </option>
                    {AREA.map((opcion) => (
                      <option key={opcion}>{opcion}</option>
                    ))}
                  </select>
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
                <label className={styles.label}>Competencia:</label>
                <input
                  type="text"
                  value={competencia}
                  onChange={(e) => setCompetencia(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Componente:</label>
                <input
                  type="text"
                  value={componente}
                  onChange={(e) => setComponente(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Nivel:</label>
                <input
                  type="text"
                  value={nivel}
                  onChange={(e) => setNivel(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>

              <div className={styles.inputContainer}>
                <label className={styles.label}>Simulacro:</label>
                <input
                  type="text"
                  value={simulacro}
                  onChange={(e) => setSimulacro(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                />
              </div>
              {msg && <Alerta alerta={alerta} />}
              <input
                type="submit"
                className={styles.submitButton}
                value={id ? "Guardar Cambios" : "Crear Pregunta"}
              />
            </form>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
  );
};

export default ModalPregunta;
