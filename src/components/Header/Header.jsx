import styles from "./Header.module.css";
import logo from "../../assets/Logo principal color.png";
import inicioSesion from "../../assets/inicio-sesion.png";
import inicioCuenta from "../../assets/inicio-cuenta.png";
import Boton from "../Boton/Boton";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className={styles.container}>
        <div className={styles.contenedor_logo}>
          <img className={styles.logo} src={logo} alt="Logo de saber365" />
        </div>
        <div className={styles.contenedor_enlaces}>
         
        </div>
        <div className={styles.contenedor_botones}>
          <Link className={styles.link} to="/autenticar">
            <Boton icono={inicioSesion} text="Iniciar Sesión" />
          </Link>
          <Link className={styles.link} to="/autenticar/registrar">
            <Boton icono={inicioCuenta} text="Crear Cuenta" />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
