import PropTypes from "prop-types";
import styles from "./NoResultado.module.css";
import logoImg from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Boton from "../Boton/Boton";


const NoResultado = ({ text, toLink = "/", textBoton = "" }) => {
  return (
    <div className={styles.container2}>
      <h2>{text}</h2>
      <div className={styles.container3}>
        <div className={styles.logo}>
          <img src={logoImg} alt="Logo" />
        </div>
        {textBoton && toLink && (
          <div>
            <Link to={toLink} className={styles.link}>
              <Boton text={textBoton} className={styles.button} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Validaciones de props
NoResultado.propTypes = {
  text: PropTypes.string.isRequired,
  toLink: PropTypes.string, // Ahora es opcional
  textBoton: PropTypes.string,
};

export default NoResultado;
