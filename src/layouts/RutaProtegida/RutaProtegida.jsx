import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Footer from "../../components/Footer/Footer";
import HeaderAuth from "../../components/HeaderAuth/HeaderAuth";



const RutaProtegida = () => {
    
    const { auth, cargando } = useAuth();
    if (cargando) return "Cargando...";

  return (
    <>
      {auth.id ? (
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
