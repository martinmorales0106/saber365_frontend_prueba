import PropTypes from "prop-types";
import styles from "./Alerta.module.css";

const Alerta = ({ alerta }) => {
  return (
    <div
      className={
        alerta.error ? styles.error : styles.noError}
    >
      {alerta.msg}
    </div>
  );
};

Alerta.propTypes = {
  alerta: PropTypes.shape({
    error: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired,
  }).isRequired,
};

export default Alerta;
