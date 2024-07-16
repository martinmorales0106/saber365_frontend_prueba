import styles from "./UsuarioConfiguracion.module.css";
import configuracionImg from "../../assets/configuraciones.png";

const UsuarioConfiguracion = () => {
  return (
    <div className={styles.fondo}>
      <div className={styles.container}>
        <div className={styles.contenedor}>
          <div className={styles.tituloConfiguracion}>
            <img className={styles.icono} src={configuracionImg} alt="Logo" />
            <h2>Ajuste de Perfil</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuarioConfiguracion;
