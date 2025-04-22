import styles from "./BotonesAccionRapida.module.css";
import { useNavigate } from "react-router-dom";

const BotonesAccionRapida = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className={styles.titulo}>🧭 Acciones Rápidas</h2>
      <div className={styles.contenedor}>
        <div className={styles.botones}>
          <button
            className={styles.boton}
            onClick={() => navigate("/usuario/pruebas")}
          >
            📘 Simulacros
          </button>
          <button
            className={styles.boton}
            onClick={() => navigate("/usuario/resultados")}
          >
            📊 Ver Resultados
          </button>
          <button
            className={styles.boton}
            onClick={() => navigate("/usuario/perfil")}
          >
            🔧 Personaliza tu Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotonesAccionRapida;
