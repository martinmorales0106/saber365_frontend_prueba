import { Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import usePregunta from "../../hooks/usePregunta";
import styles from "./ModalPregunta.module.css";
import Alerta from "../Alerta/Alerta";
import cerrarImg from "../../assets/cerrarImg.png";
import useSimulacro from "../../hooks/useSimulacro";

const GRADO = [
  "Tercero",
  "Cuarto",
  "Quinto",
  "Sexto",
  "Séptimo",
  "Octavo",
  "Noveno",
  "Décimo",
  "Undécimo",
];

const RESPUESTACORRECTA = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

const SESION = ["1", "2"];

const AREA = [
  "Matemáticas",
  "Lectura Critica",
  "Sociales",
  "Naturales",
  "Ingles",
  "Lenguaje",
  "C. Ciudadana",
];

const ModalPregunta = () => {
  const {
    modalPregunta,
    handleModalPregunta,
    submitPregunta,
    alerta,
    preguntap,
  } = usePregunta();

  const { simulacros } = useSimulacro();
  const titulos = simulacros.map((simulacro) => simulacro.titulo);

  const [id, setId] = useState("");
  const [contexto, setContexto] = useState("");
  const [imagen, setImagen] = useState("");
  const [preguntaText, setPreguntaText] = useState("");
  const [tituloTexto, setTituloTexto] = useState("");
  const [pieTexto, setPieTexto] = useState("");
  const [opcionA, setOpcionA] = useState("");
  const [opcionB, setOpcionB] = useState("");
  const [opcionC, setOpcionC] = useState("");
  const [opcionD, setOpcionD] = useState("");
  const [opcionE, setOpcionE] = useState("");
  const [opcionF, setOpcionF] = useState("");
  const [opcionG, setOpcionG] = useState("");
  const [opcionH, setOpcionH] = useState("");
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
  const [tema, setTema] = useState("");
  const [subtema, setSubTema] = useState("");
  const [opcion_invalida, setOpcion_invalida] = useState("");
  const [img_opcion_invalida, setImg_opcion_invalida] = useState("");
  const [enlace, setEnlace] = useState("");
  const [numero, setNumero] = useState("");
  const [simulacro, setSimulacro] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(preguntap);
  useEffect(() => {
    if (preguntap?.id) {
      setId(preguntap.id);
      setContexto(preguntap.contexto);
      setImagen(preguntap.imagen);
      setPreguntaText(preguntap.pregunta);
      setTituloTexto(preguntap.titulo_texto);
      setPieTexto(preguntap.pie_texto);
      setOpcionA(preguntap.opcionA);
      setOpcionB(preguntap.opcionB);
      setOpcionC(preguntap.opcionC);
      setOpcionD(preguntap.opcionD);
      setOpcionE(preguntap.opcionE);
      setOpcionF(preguntap.opcionF);
      setOpcionG(preguntap.opcionG);
      setOpcionH(preguntap.opcionH);
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
      setTema(preguntap.tema);
      setSubTema(preguntap.sub_tema);
      setOpcion_invalida(preguntap.opcion_invalida);
      setImg_opcion_invalida(preguntap.img_opcion_invalida);
      setEnlace(preguntap.enlace);
      setSimulacro(preguntap.titulo_simulacro.toString());
      setNumero(preguntap.numero);
    } else {
      setId("");
      setContexto("");
      setImagen("");
      setPreguntaText("");
      setOpcionA("");
      setOpcionB("");
      setOpcionC("");
      setOpcionD("");
      setOpcionE("");
      setOpcionF("");
      setOpcionG("");
      setOpcionH("");
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
      setTema("");
      setSubTema("");
      setSimulacro("");
      setOpcion_invalida("");
      setImg_opcion_invalida("");
      setEnlace("");
      setNumero("");
    }
  }, [preguntap]);

  const uploadImagen = async (e, setImageState) => {
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

    setImageState(file.secure_url);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await submitPregunta({
        id,
        contexto,
        imagen,
        titulo_texto: tituloTexto,
        pie_texto: pieTexto,
        pregunta: preguntaText,
        opcionA,
        opcionB,
        opcionC,
        opcionD,
        opcionE,
        opcionF,
        opcionG,
        opcionH,
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
        tema,
        sub_tema: subtema,
        opcion_invalida,
        img_opcion_invalida,
        enlace,
        numero,
        simulacro,
      });
    } else {
      await submitPregunta({
        contexto,
        imagen,
        titulo_texto: tituloTexto,
        pie_texto: pieTexto,
        pregunta: preguntaText,
        opcionA,
        opcionB,
        opcionC,
        opcionD,
        opcionE,
        opcionF,
        opcionG,
        opcionH,
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
        tema,
        sub_tema: subtema,
        opcion_invalida,
        img_opcion_invalida,
        enlace,
        numero,
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
                  <label className={styles.label}>Numero de Item:</label>
                  <input
                    type="number"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Titulo del Texto:</label>
                  <input
                    type="text"
                    value={tituloTexto}
                    onChange={(e) => setTituloTexto(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Contexto:</label>
                  <textarea
                    value={contexto}
                    onChange={(e) => setContexto(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                    rows={5} // Puedes ajustar este valor según tus necesidades
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>pie del contexto:</label>
                  <input
                    type="text"
                    value={pieTexto}
                    onChange={(e) => setPieTexto(e.target.value)}
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
                    onChange={(e) => uploadImagen(e, setImagen)}
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
                  <textarea
                    value={preguntaText}
                    onChange={(e) => setPreguntaText(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                    rows={5} // Puedes ajustar este valor según tus necesidades
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
                  <label htmlFor="img" className={styles.label}>
                    Imagen Opcion A:
                  </label>
                  <input
                    type="file"
                    id="img"
                    accept="image/*"
                    onChange={(e) => uploadImagen(e, setOpcionA)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                {loading ? (
                  <h3 className={styles.tituloImagen}>Cargando Imagen...</h3>
                ) : (
                  <div className={styles.tituloImagen}>
                    <img src={opcionA} alt="Imagen" className={styles.imagen} />
                  </div>
                )}
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
                  <label htmlFor="img" className={styles.label}>
                    Imagen Opcion B:
                  </label>
                  <input
                    type="file"
                    id="img"
                    accept="image/*"
                    onChange={(e) => uploadImagen(e, setOpcionB)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                {loading ? (
                  <h3 className={styles.tituloImagen}>Cargando Imagen...</h3>
                ) : (
                  <div className={styles.tituloImagen}>
                    <img src={opcionB} alt="Imagen" className={styles.imagen} />
                  </div>
                )}
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
                  <label htmlFor="img" className={styles.label}>
                    Imagen Opcion C:
                  </label>
                  <input
                    type="file"
                    id="img"
                    accept="image/*"
                    onChange={(e) => uploadImagen(e, setOpcionC)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                {loading ? (
                  <h3 className={styles.tituloImagen}>Cargando Imagen...</h3>
                ) : (
                  <div className={styles.tituloImagen}>
                    <img src={opcionC} alt="Imagen" className={styles.imagen} />
                  </div>
                )}
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
                  <label htmlFor="img" className={styles.label}>
                    Imagen Opcion D:
                  </label>
                  <input
                    type="file"
                    id="img"
                    accept="image/*"
                    onChange={(e) => uploadImagen(e, setOpcionD)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                {loading ? (
                  <h3 className={styles.tituloImagen}>Cargando Imagen...</h3>
                ) : (
                  <div className={styles.tituloImagen}>
                    <img src={opcionD} alt="Imagen" className={styles.imagen} />
                  </div>
                )}
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Opción E:</label>
                  <input
                    type="text"
                    value={opcionE}
                    onChange={(e) => setOpcionE(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Opción F:</label>
                  <input
                    type="text"
                    value={opcionF}
                    onChange={(e) => setOpcionF(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Opción G:</label>
                  <input
                    type="text"
                    value={opcionG}
                    onChange={(e) => setOpcionG(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Opción H:</label>
                  <input
                    type="text"
                    value={opcionH}
                    onChange={(e) => setOpcionH(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Respuesta Correcta:</label>
                  <select
                    value={respuesta_correcta}
                    onChange={(e) => setRespuestaCorrecta(e.target.value)}
                    className={styles.select}
                  >
                    <option className={styles.input2} value="">
                      -- Selecciona una Respuesta --
                    </option>
                    {RESPUESTACORRECTA.map((opcion) => (
                      <option key={opcion}>{opcion}</option>
                    ))}
                  </select>
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
                  <textarea
                    value={justificacion}
                    onChange={(e) => setJustificacion(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                    rows={5} // Puedes ajustar este valor según tus necesidades
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
                    onChange={(e) => uploadImagen(e, setImgJustificacion)}
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
                  <label className={styles.label}>Opciones no validas:</label>
                  <textarea
                    value={opcion_invalida}
                    onChange={(e) => setOpcion_invalida(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                    rows={5} // Puedes ajustar este valor según tus necesidades
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="img" className={styles.label}>
                    Imagen opciones no validas:
                  </label>
                  <input
                    type="file"
                    id="img"
                    accept="image/*"
                    onChange={(e) => uploadImagen(e, setImg_opcion_invalida)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                {loading ? (
                  <h3 className={styles.tituloImagen}>Cargando Imagen...</h3>
                ) : (
                  <div className={styles.tituloImagen}>
                    <img
                      src={img_opcion_invalida}
                      alt="Imagen opcion invalida"
                      className={styles.imagen}
                    />
                  </div>
                )}
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Sesión:</label>
                  <select
                    value={sesion}
                    onChange={(e) => setSesion(e.target.value)}
                    className={styles.select}
                  >
                    <option className={styles.input2} value="">
                      -- Selecciona una Sesión --
                    </option>
                    {SESION.map((opcion) => (
                      <option key={opcion}>{opcion}</option>
                    ))}
                  </select>
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
                  <label className={styles.label}>Tema:</label>
                  <input
                    type="text"
                    value={tema}
                    onChange={(e) => setTema(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Sub Tema:</label>
                  <input
                    type="text"
                    value={subtema}
                    onChange={(e) => setSubTema(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Enlace:</label>
                  <input
                    type="text"
                    value={enlace}
                    onChange={(e) => setEnlace(e.target.value)}
                    className={styles.input}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.label}>Simulacro: </label>
                  <select
                    value={simulacro.toString()}
                    onChange={(e) => setSimulacro(e.target.value)}
                    className={styles.select}
                    autoComplete="off"
                  >
                    <option className={styles.input2} value="">
                      -- Selecciona una Titulo --
                    </option>
                    {titulos.map((opcion) => (
                      <option key={opcion}>{opcion}</option>
                    ))}
                  </select>
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
