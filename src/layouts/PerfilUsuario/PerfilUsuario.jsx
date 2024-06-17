import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import HeaderUsuario from "../../components/HeaderUsuario/HeaderUsuario";
import styles from "./PerfilUsuario.module.css";

const PerfilUsuario = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth.id ? (
        <div>
          <div className={styles.aside}>
            <HeaderUsuario />
          </div>
          <main className={styles.main}>
            <Outlet />
          </main>
        </div>
      ) : (
        <Navigate to="/sin-autenticar" />
      )}
    </>
  );
};

export default PerfilUsuario;
