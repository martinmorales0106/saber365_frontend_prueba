import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styles from "./PerfilAdmin.module.css";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin";
import Loading from "../../components/Loading/Loading";

const PerfilAdmin = () => {
  const { auth, cargando } = useAuth();

  if (cargando) {
    return <Loading />;
  }

  return (
    <>
      {auth.admin ? (
        <div>
          <div className={styles.aside}>
            <HeaderAdmin />
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

export default PerfilAdmin;
