import styles from "./RealizarPrueba.module.css";
import matematicasImg from "../../assets/matematicasImg.png";
import lecturaImg from "../../assets/lecturaImg.png";
import socialesImg from "../../assets/socialesImg.png";
import naturalesImg from "../../assets/naturalesImg.png";
import inglesImg from "../../assets/inglesImg.png";
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
  const { setSimulacroId, setSelectArea, obtenerSimulacrosFinalizados, simulacroRealizado } = usePerfilUsuario();
  const { id } = useParams();
  const {auth} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setSimulacroId(id);
    setSelectArea(selectedTab);

    // Verificar si el simulacro está finalizado
    const simulacroFinalizado = obtenerSimulacrosFinalizados.find((item) => item.id_simulacro === parseInt(id) && item.id_usuario === auth.id);
    if (simulacroFinalizado) {
      // Enviar al usuario a la página de finalización
      navigate(`/usuario/finalizar-sesion/${simulacroFinalizado.id}`);
    }
  }, [id, selectedTab, obtenerSimulacrosFinalizados, navigate, simulacroRealizado]);


  return (
    <div>
      <Tabs selectedTab={selectedTab} onClick={handleTabChange} tabs={tabs} />
    </div>
  );
};

export default RealizarPrueba;
