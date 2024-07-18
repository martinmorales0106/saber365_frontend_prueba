import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import styles from "./PreguntasLayout.module.css";
import HeaderPreguntas from "../../components/HeaderPreguntas/HeaderPreguntas";
import Loading from "../../components/Loading/Loading";

const PreguntasLayout = () => {
  const { auth, cargando } = useAuth();

  if (cargando) {
    return <Loading />;
  }

  return (
    <>
      {auth.id ? (
        <div>
          <div className={styles.aside}>
            <HeaderPreguntas />
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

export default PreguntasLayout;
