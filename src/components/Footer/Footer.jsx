import styles from "./Footer.module.css";
import logo from "../../assets/logo.png";
import intagram from "../../assets/Intagram.png";
import tiktok from "../../assets/Tiktok.png";
import youtube from "../../assets/youtube.png";
import facebook from "../../assets/facebook.png";
import twiter from "../../assets/twiter.png";
import linkedink from "../../assets/linkedink.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className={styles.container}>
        <div className={styles.contacto}>
          <p>Contacto:</p>
          <p>WhatsApp: +57 301 463 6000</p>
          <p>Email: pruebasaber365@gmail.com</p>
        </div>
        <div className={styles.contenedor_logo}>
          <Link to="/" className={styles.link}>
            <img className={styles.logo} src={logo} alt="Logo de saber365" />
          </Link>
        </div>
        <div className={styles.redes}>
          <p>Sigue a Saber365</p>
          <div>
            <img src={intagram} className={styles.icono} />
            <img src={tiktok} className={styles.icono} />
            <img src={youtube} className={styles.icono} />
            <img src={facebook} className={styles.icono} />
            <img src={twiter} className={styles.icono} />
            <img src={linkedink} className={styles.icono} />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
