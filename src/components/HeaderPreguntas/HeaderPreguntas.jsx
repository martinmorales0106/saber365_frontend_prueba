import styles from "./HeaderPreguntas.module.css";
import inicioImg from "../../assets/inicioImg.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import logo from "../../assets/Logo principal color.png";
import useAuth from "../../hooks/useAuth";
import iconoUsuario from "../../assets/usuario-inicio.png";
import pruebasimg from "../../assets/pruebasImg.png";
import resultadosImg from "../../assets/resultadosImg.png";
import perfilImg from "../../assets/perfilImg.png";

const pag = [
  {
    title: "Inicio",
    path: "/usuario",
    cName: styles.navText,
    icon: <img src={inicioImg} alt="inicio" className={styles.icono} />,
  },
  {
    title: "Pruebas",
    path: "/usuario/pruebas",
    cName: styles.navText,
    icon: <img src={pruebasimg} alt="pruebas" className={styles.icono} />,
  },
  {
    title: "Resultados",
    path: "/usuario/resultados",
    cName: styles.navText,
    icon: <img src={resultadosImg} alt="resultados" className={styles.icono} />,
  },
  {
    title: "Perfil",
    path: "/perfil",
    cName: styles.navText,
    icon: <img src={perfilImg} alt="resultados" className={styles.icono} />,
  },
];

const HeaderPreguntas = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const { auth } = useAuth();

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.contenedor_logo}>
          <img className={styles.logo} src={logo} alt="Logo de saber365" />
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
    </div>
  );
};

export default HeaderPreguntas;
