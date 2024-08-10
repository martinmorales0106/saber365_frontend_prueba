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
    setSimulacroFinalizadoId,
  } = usePerfilUsuario();
  const { auth } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const fetchSimulacroRealizado = async () => {
      setSimulacroFinalizadoId(id);
      await obtenerSimulacroRealizado(id);
    };
    fetchSimulacroRealizado();
  }, [id]);

  if (!simulacroRealizado.id && !preguntasSimulacro.id) {
    return <di>Cargando...</di>;
  }

  localStorage.removeItem(
    `contadorSegundos${simulacroRealizado?.simulacro.titulo}`
  );

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
    (simulacroRealizado.tiempo_prueba_sesion2 || 0);

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

    let porcentajePorArea;

    if (auth.grado === "Undécimo" || auth.grado === "Décimo") {
      porcentajePorArea = {
        Matemáticas: 0,
        "Lectura Crítica": 0,
        Sociales: 0,
        Naturales: 0,
        Inglés: 0,
      };
    }

    if (auth.grado === "Noveno") {
      porcentajePorArea = {
        Matemáticas: 0,
        Lenguaje: 0,
        "C. Ciudadanas": 0,
        Naturales: 0,
        Inglés: 0,
      };
    }

    if (
      auth.grado === "Octavo" ||
      auth.grado === "Séptimo" ||
      auth.grado === "Sexto" ||
      auth.grado === "Quinto"
    ) {
      porcentajePorArea = {
        Matemáticas: 0,
        Lenguaje: 0,
        "C. Ciudadanas": 0,
        Naturales: 0,
      };
    }

    if (auth.grado === "Cuarto" || auth.grado === "Tercero") {
      porcentajePorArea = {
        Matemáticas: 0,
        Lenguaje: 0,
      };
    }

    Object.keys(conteoPorArea).forEach((area) => {
      const { correctas, totales } = conteoPorArea[area];
      porcentajePorArea[area] = Math.ceil(totales > 0 ? (correctas / totales) * 100 : 0);
    });

    let puntajeGlobal;

    if (auth.grado === "Undécimo" || auth.grado === "Décimo") {
      puntajeGlobal = Math.ceil(
        (3 * (porcentajePorArea.Matemáticas || 0) +
          3 * (porcentajePorArea["Lectura Crítica"] || 0) +
          3 * (porcentajePorArea.Sociales || 0) +
          3 * (porcentajePorArea.Naturales || 0) +
          1 * (porcentajePorArea.Inglés || 0)) *
          (5 / 13)
      );
    }

    if (auth.grado === "Noveno") {
      puntajeGlobal = Math.ceil(
        (3 * (porcentajePorArea.Matemáticas || 0) +
          3 * (porcentajePorArea.Lenguaje || 0) +
          3 * (porcentajePorArea["C. Ciudadanas"] || 0) +
          3 * (porcentajePorArea.Naturales || 0) +
          1 * (porcentajePorArea.Inglés || 0)) *
          (5 / 13)
      );
    }

    if (
      auth.grado === "Octavo" ||
      auth.grado === "Séptimo" ||
      auth.grado === "Sexto" ||
      auth.grado === "Quinto"
    ) {
      puntajeGlobal = Math.ceil(
        (3 * (porcentajePorArea.Matemáticas || 0) +
          3 * (porcentajePorArea.Lenguaje || 0) +
          3 * (porcentajePorArea["C. Ciudadanas"] || 0) +
          3 * (porcentajePorArea.Naturales || 0)) *
          (5 / 12)
      );
    }

    if (auth.grado === "Cuarto" || auth.grado === "Tercero") {
      puntajeGlobal = Math.ceil(
        (3 * (porcentajePorArea.Matemáticas || 0) +
          3 * (porcentajePorArea.Lenguaje || 0)) *
          (5 / 6)
      );
    }

    const clasificarGlobal = (porcentaje) => {
      if (porcentaje < 221) {
        return "Insuficiente";
      } else if (porcentaje >= 221 && porcentaje <= 300) {
        return "Mínimo";
      } else if (porcentaje > 300 && porcentaje <= 380) {
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
      porcentajePorArea["Lectura Crítica"]
    );
    const desempenoLenguaje = clasificarLecturaCritica(
      porcentajePorArea.Lenguaje
    );
    const desempenoSociales = clasificarSociales(porcentajePorArea.Sociales);
    const desempenoCCiudadanas = clasificarSociales(
      porcentajePorArea["C. Ciudadanas"]
    );
    const desempenoNaturales = clasificarNaturales(porcentajePorArea.Naturales);
    const desempenoIngles = clasificarIngles(porcentajePorArea.Inglés);

    const tiempo = Number(tiempo_prueba_combinado);

    let nivelPorArea;

    if (auth.grado === "Undécimo" || auth.grado === "Décimo") {
      nivelPorArea = {
        Matemáticas: desempenoMatematicas,
        "Lectura Crítica": desempenoLecturaCritica,
        Sociales: desempenoSociales,
        Naturales: desempenoNaturales,
        Inglés: desempenoIngles,
      };
    }

    if (auth.grado === "Noveno") {
      nivelPorArea = {
        Matemáticas: desempenoMatematicas,
        Lenguaje: desempenoLenguaje,
        "C. Ciudadanas": desempenoCCiudadanas,
        Naturales: desempenoNaturales,
        Inglés: desempenoIngles,
      };
    }

    if (
      auth.grado === "Octavo" ||
      auth.grado === "Séptimo" ||
      auth.grado === "Sexto" ||
      auth.grado === "Quinto"
    ) {
      nivelPorArea = {
        Matemáticas: desempenoMatematicas,
        Lenguaje: desempenoLenguaje,
        "C. Ciudadanas": desempenoCCiudadanas,
        Naturales: desempenoNaturales,
      };
    }

    if (auth.grado === "Cuarto" || auth.grado === "Tercero") {
      nivelPorArea = {
        Matemáticas: desempenoMatematicas,
        Lenguaje: desempenoLenguaje,
      };
    }

    await submitRespuestas({
      id_usuario: auth.id,
      id_simulacro: simulacroRealizado?.id_simulacro,
      estado_preguntas: estado_preguntas_combinado,
      puntaje_global: puntajeGlobal,
      nivel_alcanzado: clasificarGlobal(puntajeGlobal),
      puntaje_por_area: porcentajePorArea,
      nivel_por_area:  nivelPorArea,
      tiempo_prueba: tiempo,
    });
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
                  <Boton text="Ir a completar la otra sesión" />
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
