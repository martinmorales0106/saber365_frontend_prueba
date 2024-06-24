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
import PerfilAdmin from "./layouts/PerfilAdmin/PerfilAdmin";
import AdminUsuarios from "./pages/AdminUsuarios/AdminUsuarios";
import { UsuarioProvider } from "./context/UsuarioProvider";
import UsuariosEliminados from "./pages/UsuariosEliminados/UsuariosEliminados";
import AdminSimulacros from "./pages/AdminSimulacros/AdminSimulacros";
import { SimulacroProvider } from "./context/SimulacroProvider";
import SimulacrosEliminados from "./pages/SimulacrosEliminados/SimulacrosEliminados";
import AdminPreguntas from "./pages/AdminPreguntas/AdminPreguntas";
import { PreguntaProvider } from "./context/PreguntaProvider";
import PreguntasEliminadas from "./pages/PreguntasEliminadas/PreguntasEliminadas";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UsuarioProvider>
          <SimulacroProvider>
            <PreguntaProvider>
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

                <Route path="/admin" element={<PerfilAdmin />}>
                  <Route index element={<UsuarioInicio />} />
                  <Route path="usuarios" element={<AdminUsuarios />} />
                  <Route
                    path="usuarios/usuarios-eliminados"
                    element={<UsuariosEliminados />}
                  />
                  <Route path="simulacros" element={<AdminSimulacros />} />
                  <Route
                    path="simulacros/simulacros-eliminados"
                    element={<SimulacrosEliminados />}
                  />
                  <Route path="preguntas" element={<AdminPreguntas />} />
                  <Route path="preguntas/preguntas-eliminadas" element={<PreguntasEliminadas />} />
                </Route>
              </Routes>
            </PreguntaProvider>
          </SimulacroProvider>
        </UsuarioProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
