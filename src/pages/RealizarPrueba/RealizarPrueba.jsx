import styles from "./RealizarPrueba.module.css";
import matematicasImg from "../../assets/matematicasImg.png";
import lecturaImg from "../../assets/lecturaImg.png";
import socialesImg from "../../assets/socialesImg.png";
import naturalesImg from "../../assets/naturalesImg.png";
import inglesImg from "../../assets/inglesImg.png";
import Tabs from "../../components/Tabs/Tabs";
import useTabs from "../../hooks/useTabs";
import { useParams } from "react-router-dom";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import MatematicasPreguntas from "../../components/MatematicasPreguntas/MatematicasPreguntas";
import { useEffect } from "react";
import LecturaCriticaPreguntas from "../../components/LecturaCriticaPreguntas/LecturaCriticaPreguntas";
import SocialesPreguntas from "../../components/SocialesPreguntas/SocialesPreguntas";
import NaturalesPreguntas from "../../components/NaturalesPreguntas/NaturalesPreguntas";
import InglesPreguntas from "../../components/InglesPreguntas/InglesPreguntas";

const tabs = [
  {
    label: (
      <div className={styles.tabs}>
        <img src={matematicasImg} alt="Logo" className={styles.tabsImg} />
        Matemáticas
      </div>
    ),
    index: "Matemáticas",
    Component: MatematicasPreguntas,
  },
  {
    label: (
      <div className={styles.tabs}>
        <img src={lecturaImg} alt="Logo" className={styles.tabsImg} />
        Lectura Crítica
      </div>
    ),
    index: "Lectura Critica",
    Component: LecturaCriticaPreguntas,
  },
  {
    label: (
      <div className={styles.tabs}>
        <img src={socialesImg} alt="Logo" className={styles.tabsImg} />
        Sociales
      </div>
    ),
    index: "Sociales",
    Component: SocialesPreguntas,
  },
  {
    label: (
      <div className={styles.tabs}>
        <img src={naturalesImg} alt="Logo" className={styles.tabsImg} />
        Naturales
      </div>
    ),
    index: "Naturales",
    Component: NaturalesPreguntas,
  },
  {
    label: (
      <div className={styles.tabs}>
        <img src={inglesImg} alt="Logo" className={styles.tabsImg} />
        Ingles
      </div>
    ),
    index: "Ingles",
    Component: InglesPreguntas,
  },
];

const RealizarPrueba = () => {
  const { selectedTab, handleTabChange } = useTabs();
  const { setSimulacroId, setSelectArea } = usePerfilUsuario();
  const { id } = useParams();

  useEffect(() => {
    setSimulacroId(id);
    setSelectArea(selectedTab);
  }, [id, selectedTab]);

  return (
    <div>
      <Tabs selectedTab={selectedTab} onClick={handleTabChange} tabs={tabs} />
    </div>
  );
};

export default RealizarPrueba;
