import styles from "./Inicio.module.css";
import Boton from "../../components/Boton/Boton";
import imagen1 from "../../assets/Imagen-inicio-1.png";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Inicio = () => {
  const { auth } = useAuth();
  return (
    <div>
      <div className={styles.fondo1}>
        <div className={styles.encabezado}>
          <h1 className={styles.titulo}>¡Bienvenido a Saber365!</h1>
          <p className={styles.parrafos}>
            Prepárate para el éxito con nuestras evaluaciones y simulacros de
            prueba Saber.
            <br /> Explora nuestro contenido educativo, diviértete aprendiendo y
            avanza hacia tus metas académicas.
            <br /> ¡Tu camino hacia el conocimiento comienza aquí!
          </p>
          {auth.id ? (<div className={styles.boton1}>
            <Link to="/" className={styles.link}>
              <Boton text="🚀 Ir a mi Cuenta" />
            </Link>
          </div>):(<div className={styles.boton1}>
            <Link to="/autenticar" className={styles.link}>
              <Boton text="🚀 Comienza Ahora" />
            </Link>
          </div>)}
        </div>
        <div>
          <div className={styles.container_imagen1}>
            <img src={imagen1} className={styles.imagen1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
