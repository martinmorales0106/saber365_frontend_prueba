import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styles from "./PerfilAdmin.module.css";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin";

const PerfilAdmin = () => {
    const { auth } = useAuth();

    return (
      <>
        {auth.admin ? (
          <div>
            <div className={styles.aside}>
              <HeaderAdmin/>
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
}

export default PerfilAdmin