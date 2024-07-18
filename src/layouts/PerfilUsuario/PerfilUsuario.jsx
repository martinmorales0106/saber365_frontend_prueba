import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import HeaderUsuario from "../../components/HeaderUsuario/HeaderUsuario";
import styles from "./PerfilUsuario.module.css";
import Loading from "../../components/Loading/Loading";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";

const PerfilUsuario = () => {
  const { auth, cargando } = useAuth();
  const { cargandoTopPuntaje, cargandoTopPuntajeArea } = usePerfilUsuario();

  if ((cargando, cargandoTopPuntaje, cargandoTopPuntajeArea)) {
    return <Loading />;
  }

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
