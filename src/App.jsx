import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio/Inicio";
import SinRegistrar from "./layouts/SinRegistrar/SinRegistrar";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import Login from "./pages/Login/Login";
import Registrar from "./pages/Registrar/Registrar";
import { AuthProvider } from "./context/AuthProvider";
import ConfirmarCuenta from "./pages/ConfirmarCuenta/ConfirmarCuenta";
import RutaProtegida from "./layouts/RutaProtegida/RutaProtegida";
import PerfilUsuario from "./layouts/PerfilUsuario/PerfilUsuario";
import UsuarioInicio from "./pages/UsuarioInicio/UsuarioInicio";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RutaProtegida />}>
            <Route index element={<Inicio />} />
          </Route>

          <Route path="/sin-autenticar" element={<SinRegistrar />}>
            <Route index element={<Inicio />} />
          </Route>

          <Route path="/autenticar" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>

          <Route path="/usuario" element={<PerfilUsuario />}>
          <Route index element={<UsuarioInicio />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
