import styles from "./RealizarPrueba.module.css";
import matematicasImg from "../../assets/matematicasImg.png";
import lecturaImg from "../../assets/lecturaImg.png";
import socialesImg from "../../assets/socialesImg.png";
import naturalesImg from "../../assets/naturalesImg.png";
import inglesImg from "../../assets/inglesImg.png";
import ciudadanaImg from "../../assets/ciudadanaImg.png";
import Tabs from "../../components/Tabs/Tabs";
import useTabs from "../../hooks/useTabs";
import { useNavigate, useParams } from "react-router-dom";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import MatematicasPreguntas from "../../components/MatematicasPreguntas/MatematicasPreguntas";
import { useEffect } from "react";
import LecturaCriticaPreguntas from "../../components/LecturaCriticaPreguntas/LecturaCriticaPreguntas";
import SocialesPreguntas from "../../components/SocialesPreguntas/SocialesPreguntas";
import NaturalesPreguntas from "../../components/NaturalesPreguntas/NaturalesPreguntas";
import InglesPreguntas from "../../components/InglesPreguntas/InglesPreguntas";
import useAuth from "../../hooks/useAuth";
import CCiudadanasPreguntas from "../../components/CCiudadanasPreguntas/CCiudadanasPreguntas";
import LenguajePreguntas from "../../components/LenguajePreguntas/LenguajePreguntas";

const RealizarPrueba = () => {
  const { selectedTab, handleTabChange } = useTabs();
  const {
    setSimulacroId,
    setSelectArea,
    obtenerSimulacrosFinalizados,
    simulacroRealizado,
  } = usePerfilUsuario();
  const { id } = useParams();
  const { auth } = useAuth();

  const navigate = useNavigate();

  const createTab = (labelText, imgSrc, index, Component) => ({
    label: (
      <div className={styles.tabs}>
        <img src={imgSrc} alt="Logo" className={styles.tabsImg} />
        {labelText}
      </div>
    ),
    index,
    Component,
  });

  const tabs = [
    createTab(
      "Matemáticas",
      matematicasImg,
      "Matemáticas",
      MatematicasPreguntas
    ),
  ];

  if (auth.grado === "Tercero" || auth.grado === "Cuarto") {
    tabs.push(createTab("Lenguaje", lecturaImg, "Lenguaje", LenguajePreguntas));
  }

  if (["Octavo", "Séptimo", "Sexto", "Quinto"].includes(auth.grado)) {
    tabs.push(
      createTab("Lenguaje", lecturaImg, "Lenguaje", LenguajePreguntas),
      createTab(
        "C. Ciudadanas",
        ciudadanaImg,
        "C. Ciudadanas",
        CCiudadanasPreguntas
      ),
      createTab("Naturales", naturalesImg, "Naturales", NaturalesPreguntas)
    );
  }

  if (auth.grado === "Noveno") {
    tabs.push(
      createTab("Lenguaje", lecturaImg, "Lenguaje", LenguajePreguntas),
      createTab(
        "C. Ciudadanas",
        ciudadanaImg,
        "C. Ciudadanas",
        CCiudadanasPreguntas
      ),
      createTab("Naturales", naturalesImg, "Naturales", NaturalesPreguntas),
      createTab("Inglés", inglesImg, "Inglés", InglesPreguntas)
    );
  }

  if (["Décimo", "Undécimo"].includes(auth.grado)) {
    tabs.push(
      createTab(
        "Lectura Crítica",
        lecturaImg,
        "Lectura Crítica",
        LecturaCriticaPreguntas
      ),
      createTab("Sociales", socialesImg, "Sociales", SocialesPreguntas),
      createTab("Naturales", naturalesImg, "Naturales", NaturalesPreguntas),
      createTab("Inglés", inglesImg, "Inglés", InglesPreguntas)
    );
  }

  useEffect(() => {
    setSimulacroId(id);
    setSelectArea(selectedTab);

    // Verificar si el simulacro está finalizado
    const simulacroFinalizado = obtenerSimulacrosFinalizados.find(
      (item) =>
        item.id_simulacro === parseInt(id) && item.id_usuario === auth.id
    );
    if (simulacroFinalizado) {
      // Enviar al usuario a la página de finalización
      navigate(`/usuario/finalizar-sesion/${simulacroFinalizado.id}`);
    }
  }, [
    id,
    selectedTab,
    obtenerSimulacrosFinalizados,
    navigate,
    simulacroRealizado,
    auth.id,
    setSelectArea,
    setSimulacroId,
  ]);

  return (
    <div>
      <Tabs selectedTab={selectedTab} onClick={handleTabChange} tabs={tabs} />
    </div>
  );
};

export default RealizarPrueba;
