import styles from "./HeaderUsuario.module.css";
import inicioImg from "../../assets/inicioImg.png";
import { useState } from "react";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";

const pag = [
  {
    title: "Inicio",
    path: "/",
    cName: styles.navText,
    icon: <img src={inicioImg} alt="inicio" className={styles.icono} />,
  },
  {
    title: "Pruebas",
    path: "/pruebas",
    cName: styles.navText,
    icon: <img src={inicioImg} alt="pruebas" className={styles.icono} />,
  },
  {
    title: "Resultados",
    path: "/resultados",
    cName: styles.navText,
    icon: <img src={inicioImg} alt="resultados" className={styles.icono} />,
  },
];

const HeaderUsuario = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className={styles.navbar}>
          <div >
            <Link to="#" className={styles.menuBars}>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <p>Hola</p>
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

export default HeaderUsuario;
