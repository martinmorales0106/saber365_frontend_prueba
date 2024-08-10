import styles from "./Inicio.module.css";
import Boton from "../../components/Boton/Boton";
import imagen1 from "../../assets/Imagen-inicio-1.png";
import preparateInicio from "../../assets/preparate-inicio.png";
import aprendizajeInicio from "../../assets/Aprende-inicio.png";
import confianza from "../../assets/aprendizaje-electronico.png";
import preparacion from "../../assets/Preparacion-iicio.png";
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
          {auth.id ? (
            auth.admin ? (
              <div className={styles.boton1}>
                <Link to="/admin" className={styles.link}>
                  <Boton text="🚀 Ir a mi Admin" />
                </Link>
              </div>
            ) : (
              <div className={styles.boton1}>
                <Link to="/usuario" className={styles.link}>
                  <Boton text="🚀 Ir a mi Cuenta" />
                </Link>
              </div>
            )
          ) : (
            <div className={styles.boton1}>
              <Link to="/autenticar" className={styles.link}>
                <Boton text="🚀 Comienza Ahora" />
              </Link>
            </div>
          )}
        </div>
        <div>
          <div className={styles.container_imagen1}>
            <img src={imagen1} className={styles.imagen1} />
          </div>
        </div>
      </div>
      <h2 className={styles.titulo2}>
        ¿Por qué utilizar Saber365 para alcanzar un nivel superior?
      </h2>
      <div className={styles.container2}>
        <div className={styles.info}>
          <img src={preparateInicio} className={styles.icono} />
          <h2>Prepárate para el éxito.</h2>
          <p className={styles.parrafos2}>
            Descubre preguntas de práctica cuidadosamente seleccionadas y
            recursos de apoyo diseñados para que domines cada tema. En nuestra
            plataforma, encontrarás herramientas educativas que te impulsarán
            hacia el dominio total de la prueba.
          </p>
        </div>
        <div className={styles.info}>
          <img src={aprendizajeInicio} className={styles.icono} />
          <h2>Aprende a tu propio ritmo.</h2>
          <p className={styles.parrafos2}>
            Descubre las áreas desafiantes, practica en cualquier momento y
            sigue tu progreso a lo largo del tiempo.
          </p>
        </div>
        <div className={styles.info}>
          <img src={confianza} className={styles.icono} />
          <h2>Construyes confianza.</h2>
          <p className={styles.parrafos2}>
            La práctica continua con preguntas y recursos te proporcionará la
            seguridad y serenidad necesarias para enfrentar con éxito la prueba
            saber.
          </p>
        </div>
        <div className={styles.info}>
          <img src={preparacion} className={styles.icono} />
          <h2>Preparación asequible.</h2>
          <p className={styles.parrafos2}>
            Ofrecemos opciones de preparación a precios accesibles, garantizando
            un camino asequible hacia tu éxito en la prueba.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
