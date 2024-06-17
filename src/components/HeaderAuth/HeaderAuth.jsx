import styles from "./HeaderAuth.module.css";
import logo from "../../assets/Logo principal color.png";
import cerrar from "../../assets/cerrar-sesion.png";
import iconoUsuario from "../../assets/usuario-inicio.png";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const HeaderAuth = () => {
  const { auth, cerrarSesionAuth } = useAuth();

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    localStorage.removeItem("token");
  };

  return (
    <>
      <header className={styles.container}>
        <div className={styles.contenedor_logo}>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="Logo de saber365" />
          </Link>
        </div>
        <div className={styles.contenedor_botones}>
          <div className={styles.cuenta}>
              <Link to="/usuario" className={styles.link} >
              <p>Hola, {auth.nombreUsuario}</p>
                <p className={styles.parrafoCuenta}>
                  <img src={iconoUsuario} className={styles.iconoUsuario} /> Mi
                  Cuenta
                </p>
              </Link>
          </div>
          <div className={styles.cerrar}>
            <Link to="/sin-autenticar" onClick={handleCerrarSesion}>
              <img src={cerrar} className={styles.icono} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderAuth;
