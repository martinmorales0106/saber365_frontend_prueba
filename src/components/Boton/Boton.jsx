import styles from "./Boton.module.css"; 

const Boton = (boton) => {
    return (
      <button
        className={styles.boton}
        onClick={boton.onClick}
      >
       {boton.icono ? (<img className={styles.icono} src={boton.icono}/>):null} {boton.text}
      </button>
    );
}

export default Boton