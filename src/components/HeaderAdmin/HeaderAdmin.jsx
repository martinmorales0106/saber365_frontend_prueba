import styles from "./HeaderAdmin.module.css";
import usuariosImg from "../../assets/inicio-sesion.png";
import inicioImg from "../../assets/inicioImg.png";
import { useState } from "react";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import logo from "../../assets/Logo principal color.png";
import useAuth from "../../hooks/useAuth";
import iconoUsuario from "../../assets/usuario-inicio.png";
import cerrar from "../../assets/cerrar-sesion.png";
import pruebasimg from "../../assets/pruebasImg.png";
import preguntasImg from "../../assets/preguntasAdminImg.png";
import perfilImg from "../../assets/perfilImg.png";

const pag = [
  {
    title: "Inicio",
    path: "/admin",
    cName: styles.navText,
    icon: <img src={inicioImg} alt="inicio" className={styles.icono} />,
  },
  {
    title: "Usuarios",
    path: "/admin/usuarios",
    cName: styles.navText,
    icon: <img src={usuariosImg} alt="inicio" className={styles.icono} />,
  },
  {
    title: "Simulacros",
    path: "/admin/simulacros",
    cName: styles.navText,
    icon: <img src={pruebasimg} alt="pruebas" className={styles.icono} />,
  },
  {
    title: "Preguntas",
    path: "/admin/preguntas",
    cName: styles.navText,
    icon: <img src={preguntasImg} alt="resultados" className={styles.icono} />,
  },
  {
    title: "Perfil",
    path: "/perfil",
    cName: styles.navText,
    icon: <img src={perfilImg} alt="resultados" className={styles.icono} />,
  },
];

const HeaderAdmin = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const { auth, cerrarSesionAuth } = useAuth();

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    localStorage.removeItem("token");
  };

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className={styles.navbar}>
          <div>
            <Link to="#" className={styles.menuBars}>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <div className={styles.contenedor_logo}>
            <Link to="/">
              <img className={styles.logo} src={logo} alt="Logo de saber365" />
            </Link>
          </div>
          <div className={styles.parrafos}>
            <div>
              <p>{auth.nombreUsuario}</p>
              <p>{auth.grado}</p>
            </div>
          </div>
          <div className={styles.parrafos}>
            <img src={iconoUsuario} className={styles.iconoUsuario} />
          </div>
          <div className={styles.cerrar}>
            <Link to="/sin-autenticar" onClick={handleCerrarSesion}>
              <img src={cerrar} className={styles.icono} />
            </Link>
          </div>
        </div>
        <nav
          className={
            sidebar ? `${styles.navMenu} ${styles.active}` : styles.navMenu
          }
        >
          <ul className={styles.navMenuItems} onClick={showSidebar}>
            <li className={styles.navbarToggle}>
              <Link to="#" className={styles.menuBars}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {pag.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
};

export default HeaderAdmin;
