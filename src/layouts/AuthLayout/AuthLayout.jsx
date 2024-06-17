import { Link, Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import logo from "../../assets/Logo principal color.png";

const AuthLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.fondo}>
        <div className={styles.contenedor_logo}>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="Logo de saber365" />
          </Link>
        </div>
        <main className={styles.main}>
          <div>
            <Outlet />
          </div>
        </main>
        <div className={styles.derechos}>
          <p>© 2024 Saber365. Todos los Derechos Reservados.</p>
          <p>
            Algunas de la información de saber365 han sido tomadas del material
            de apoyo libre y gratuito del ICFES.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
