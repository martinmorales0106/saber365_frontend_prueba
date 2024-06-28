import { Link, useParams } from "react-router-dom";
import styles from "./FinalizarSesion.module.css";
import logo from "../../assets/Logo principal color.png";
import Boton from "../../components/Boton/Boton";
import useAuth from "../../hooks/useAuth";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import { useEffect } from "react";

const FinalizarSesion = () => {
  const {
    simulacroRealizado,
    preguntasSimulacro,
    submitRespuestas,
    obtenerSimulacroRealizado,
  } = usePerfilUsuario();
  const { auth } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const fetchSimulacroRealizado = async () => {
      await obtenerSimulacroRealizado(id);
    };
    fetchSimulacroRealizado();
  }, [id]);

  if (!simulacroRealizado.id) {
    return <di>Cargando...</di>;
  }

  // Combinar los arrays de estado_preguntas_sesion
  const estado_preguntas_combinado =
    simulacroRealizado.estado_preguntas_sesion2 !== null
      ? simulacroRealizado.estado_preguntas_sesion1.concat(
          simulacroRealizado.estado_preguntas_sesion2 || []
        )
      : simulacroRealizado.estado_preguntas_sesion1 || [];

  // Sumar los tiempos de prueba de ambas sesiones
  const tiempo_prueba_combinado =
    simulacroRealizado.tiempo_prueba_sesion1 +
    simulacroRealizado.tiempo_prueba_sesion2;

  const handleSubmit = async () => {
    const conteoPorArea = {};

    estado_preguntas_combinado.forEach((resultado) => {
      const { area, esCorrecta } = resultado;

      if (!conteoPorArea[area]) {
        conteoPorArea[area] = { correctas: 0, totales: 0 };
      }

      conteoPorArea[area].totales++;

      if (esCorrecta) {
        conteoPorArea[area].correctas++;
      }
    });

    const porcentajePorArea = {};

    Object.keys(conteoPorArea).forEach((area) => {
      const { correctas, totales } = conteoPorArea[area];
      porcentajePorArea[area] = totales > 0 ? (correctas / totales) * 100 : 0;
    });

    const puntajeGlobal = Math.round(
      (3 * porcentajePorArea.Matemáticas +
        3 * porcentajePorArea["Lectura Critica"] +
        3 * porcentajePorArea.Sociales +
        3 * porcentajePorArea.Naturales +
        1 * porcentajePorArea.Ingles) *
        (5 / 13)
    );

    const clasificarGlobal = (porcentaje) => {
      if (porcentaje < 201) {
        return "Insuficiente";
      } else if (porcentaje >= 201 && porcentaje <= 280) {
        return "Mínimo";
      } else if (porcentaje > 280 && porcentaje <= 350) {
        return "Satisfactorio";
      } else {
        return "Avanzado";
      }
    };
    const clasificarMatematicas = (porcentaje) => {
      if (porcentaje < 36) {
        return "Insuficiente";
      } else if (porcentaje >= 36 && porcentaje <= 50) {
        return "Mínimo";
      } else if (porcentaje > 50 && porcentaje <= 70) {
        return "Satisfactorio";
      } else {
        return "Avanzado";
      }
    };

    // Función para clasificar el desempeño en Lectura Crítica
    const clasificarLecturaCritica = (porcentaje) => {
      if (porcentaje < 35) {
        return "Insuficiente";
      } else if (porcentaje >= 35 && porcentaje <= 50) {
        return "Mínimo";
      } else if (porcentaje > 50 && porcentaje <= 65) {
        return "Satisfactorio";
      } else {
        return "Avanzado";
      }
    };

    // Función para clasificar el desempeño en Sociales
    const clasificarSociales = (porcentaje) => {
      if (porcentaje < 35) {
        return "Insuficiente";
      } else if (porcentaje >= 35 && porcentaje <= 55) {
        return "Mínimo";
      } else if (porcentaje > 55 && porcentaje <= 70) {
        return "Satisfactorio";
      } else {
        return "Avanzado";
      }
    };

    // Función para clasificar el desempeño en Naturales
    const clasificarNaturales = (porcentaje) => {
      if (porcentaje < 40) {
        return "Insuficiente";
      } else if (porcentaje >= 40 && porcentaje <= 55) {
        return "Mínimo";
      } else if (porcentaje > 55 && porcentaje <= 70) {
        return "Satisfactorio";
      } else {
        return "Avanzado";
      }
    };

    // Función para clasificar el desempeño en Inglés
    const clasificarIngles = (porcentaje) => {
      if (porcentaje <= 47) {
        return "-A";
      } else if (porcentaje >= 48 && porcentaje <= 57) {
        return "A1";
      } else if (porcentaje >= 58 && porcentaje <= 67) {
        return "A2";
      } else if (porcentaje >= 68 && porcentaje <= 78) {
        return "B1";
      } else {
        return "B+";
      }
    };

    // Clasificar desempeño por área
    const desempenoMatematicas = clasificarMatematicas(
      porcentajePorArea.Matemáticas
    );
    const desempenoLecturaCritica = clasificarLecturaCritica(
      porcentajePorArea["Lectura Critica"]
    );
    const desempenoSociales = clasificarSociales(porcentajePorArea.Sociales);
    const desempenoNaturales = clasificarNaturales(porcentajePorArea.Naturales);
    const desempenoIngles = clasificarIngles(porcentajePorArea.Ingles);

    const tiempo = Number(tiempo_prueba_combinado);

    await submitRespuestas({
      id_usuario: auth.id,
      id_simulacro: preguntasSimulacro[0].id_simulacro,
      estado_preguntas: estado_preguntas_combinado,
      puntaje_global: puntajeGlobal,
      nivel_alcanzado: clasificarGlobal(puntajeGlobal),
      puntaje_por_area: porcentajePorArea,
      nivel_por_area: {
        Matemáticas: desempenoMatematicas,
        "Lectura Critica": desempenoLecturaCritica,
        Sociales: desempenoSociales,
        Naturales: desempenoNaturales,
        Ingles: desempenoIngles,
      },
      tiempo_prueba: tiempo,
    });
    // setOpcionesSeleccionadas("");
  };

  return (
    <>
      <div className={styles.fondo}>
        <div className={styles.container}>
          <div className={styles.contenedor_logo}>
            <Link to="/">
              <img className={styles.logo} src={logo} alt="Logo de saber365" />
            </Link>
          </div>
          {simulacroRealizado.sesion_completada ? (
            <div>
              <div className={styles.parrafos}>
                <h2>Tu sesión ha finalizado con éxito</h2>
              </div>
              <div className={styles.parrafos}>
                <h3>Presiona en el botón para ver tus resultados</h3>
              </div>
              <div className={styles.boton}>
                <Boton
                  text="Ver el Resultado del Simulacro"
                  onClick={() => {
                    handleSubmit();
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <div className={styles.parrafos}>
                <h2>Tu sesión ha finalizado con éxito</h2>
              </div>
              <div className={styles.parrafos}>
                <h3>Completa las dos sesiones para obtener tus resultados</h3>
              </div>
              <div className={styles.boton}>
                <Link
                  to={`/confirmar-prueba/${simulacroRealizado.id_simulacro}`}
                  className={styles.link}
                >
                  <Boton
                    text="Ir a completar la otra sesión"
                  />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FinalizarSesion;
