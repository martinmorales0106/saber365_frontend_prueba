import styles from "./UsuarioInicio.module.css";
import bannerUsuarioImg from "../../assets/bannerUsuarioImg.png";
import useAuth from "../../hooks/useAuth";

const UsuarioInicio = () => {
    const {auth} = useAuth();
  return (
    <div className={styles.fondo}>
      <div className={styles.container}>
        <div className={styles.contenedor}>
          <div className={styles.banner}>
            <div className={styles.bannerParrafo}>
              <h1 className={styles.bannerTitulo}>¡Bienvenido a Saber365 <br/> {auth.nombre_Usuario}! 🚀</h1>
              <p className={styles.bannerContenido}>
                Explora, aprende y avanza con nosotros. En Saber365, te
                ofrecemos una experiencia única para prepararte y alcanzar tus
                metas.<br/> ¡Diviértete mientras te preparas para el éxito! 📚✨
              </p>
            </div>
          <img src={bannerUsuarioImg}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuarioInicio;
