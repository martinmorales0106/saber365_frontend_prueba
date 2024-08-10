import styles from "./AdminInicio.module.css";
import bannerUsuarioImg from "../../assets/bannerUsuarioImg.png";
import useAuth from "../../hooks/useAuth";

const AdminInicio = () => {
  const { auth } = useAuth();
  
  return (
    <div className={styles.fondo}>
      <div className={styles.container}>
        <div className={styles.contenedor}>
          <div className={styles.banner}>
            <div className={styles.bannerParrafo}>
              <h1 className={styles.bannerTitulo}>
                ¡Bienvenido a Saber365 <br /> {auth?.nombreUsuario}! 🚀
              </h1>
              <p className={styles.bannerContenido}>
                Explora, aprende y avanza con nosotros. En Saber365, te
                ofrecemos una experiencia única para prepararte y alcanzar tus
                metas.
                <br /> ¡Diviértete mientras te preparas para el éxito! 📚✨
              </p>
            </div>
            <img src={bannerUsuarioImg} />
          </div>
          </div>
          </div>
          </div>
  )
}

export default AdminInicio