import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Footer from "../../components/Footer/Footer";
import HeaderAuth from "../../components/HeaderAuth/HeaderAuth";
import Loading from "../../components/Loading/Loading";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  
  if (cargando) {
    return <Loading />;
  }

  return (
    <>
      {auth ? (
        <div>
          <HeaderAuth />
          <div>
            <main>
              <Outlet />
            </main>
          </div>
          <Footer />
        </div>
      ) : (
        <Navigate to="/sin-autenticar" />
      )}
    </>
  );
};

export default RutaProtegida;
