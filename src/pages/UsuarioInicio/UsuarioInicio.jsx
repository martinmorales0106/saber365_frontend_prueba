import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useAuth from "../../hooks/useAuth";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import { FormatearTiempo } from "../../helpers/FormatearTiempo";
import { formatearFecha } from "../../helpers/formatearFecha";
import Boton from "../../components/Boton/Boton";
import styles from "./UsuarioInicio.module.css";
import bannerUsuarioImg from "../../assets/bannerUsuarioImg.png";
import matematicasImg from "../../assets/matematicasImg.png";
import lecturaImg from "../../assets/lecturaImg.png";
import socialesImg from "../../assets/socialesImg.png";
import naturalesImg from "../../assets/naturalesImg.png";
import inglesImg from "../../assets/inglesImg.png";
import ciudadanaImg from "../../assets/ciudadanaImg.png";
import NoResultado from "../../components/NoResultado/NoResultado";
import { useState } from "react";
import BarraProgreso from "../../components/BarraProgreso/BarraProgreso";

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const groupByGrade = (simulacros) => {
  return simulacros.reduce((acc, simulacro) => {
    const grade = simulacro.simulacro.grado;
    if (!acc[grade]) {
      acc[grade] = [];
    }
    acc[grade].push(simulacro);
    return acc;
  }, {});
};

const barChart = (simulacrosCompletados) => {
  // Preparar los datos para Chart.js
  let etiquetas = [];
  const grado = simulacrosCompletados?.[0]?.simulacro?.grado;

  switch (grado) {
    case "Undécimo":
    case "Décimo":
      etiquetas = [
        "Inglés",
        "Lectura Crítica",
        "Matemáticas",
        "Naturales",
        "Sociales",
      ];
      break;
    case "Noveno":
      etiquetas = [
        "Inglés",
        "Lenguaje",
        "Matemáticas",
        "Naturales",
        "C. Ciudadanas",
      ];
      break;
    case "Octavo":
    case "Séptimo":
    case "Sexto":
    case "Quinto":
      etiquetas = ["Lenguaje", "Matemáticas", "Naturales", "C. Ciudadanas"];
      break;
    case "Cuarto":
    case "Tercero":
      etiquetas = ["Lenguaje", "Matemáticas"];
      break;
    default:
      etiquetas = [];
  }

  const datasets = simulacrosCompletados.map((simulacro, index) => {
    return {
      label: `${simulacro.simulacro.titulo}`,
      data: etiquetas.map((area) => simulacro.puntaje_por_area[area]),
      backgroundColor: `hsl(${index * 60}, 100%, 50%)`, // Generar colores diferentes
    };
  });

  const data = {
    labels: etiquetas,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Puntaje",
          color: "#000", // Color del título del eje Y
          font: {
            size: 16, // Tamaño del título del eje Y
          },
        },
        ticks: {
          color: "#000", // Color de las etiquetas del eje Y
          font: {
            size: 14, // Tamaño de las etiquetas del eje Y
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Área",
          color: "#000", // Color del título del eje X
          font: {
            size: 16, // Tamaño del título del eje X
          },
        },
        ticks: {
          color: "#000", // Color de las etiquetas del eje X
          font: {
            size: 14, // Tamaño de las etiquetas del eje X
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Puntaje por Área en Cada Simulacro",
        color: "#000", // Color del título
        font: {
          size: 14, // Tamaño del título
        },
      },
      legend: {
        labels: {
          color: "#000", // Cambiar color de los labels
          font: {
            size: 14, // Cambiar tamaño de los labels
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

const obtenerNivelDesempeño = (puntaje) => {
  if (puntaje <= 220) {
    return {
      nivel: "Insuficiente",
      mensaje:
        "Estás dando los primeros pasos. No te desanimes, cada intento te acerca más a mejorar tus habilidades.",
    };
  } else if (puntaje <= 300) {
    return {
      nivel: "Mínimo",
      mensaje:
        "Estás progresando bien. Sigue practicando y pronto dominarás aún más conceptos.",
    };
  } else if (puntaje <= 380) {
    return {
      nivel: "Satisfactorio",
      mensaje:
        "¡Excelente trabajo! Demuestras un buen dominio de los conceptos. Sigue reforzando tus habilidades para llegar aún más lejos.",
    };
  } else {
    return {
      nivel: "Avanzado",
      mensaje:
        "¡Felicidades! Has alcanzado un nivel avanzado en este proceso. Tu dedicación y esfuerzo se reflejan en un desempeño más elavado.",
    };
  }
};

const UsuarioInicio = () => {
  const { auth } = useAuth();
  const { topPuntajeGlobal, topPuntajePorArea, simulacrosCompletados } =
    usePerfilUsuario();

  const [areaSeleccionada, setAreaSeleccionada] = useState("Matemáticas");

  const groupedSimulacros = groupByGrade(simulacrosCompletados);

  simulacrosCompletados.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  console.log(simulacrosCompletados);

  // total de simulacros completados
  const totalSimulacros = simulacrosCompletados.length;

  // sacar los puntajes del usuario
  const puntajesGlobales = simulacrosCompletados.map(
    (sim) => sim.puntaje_global
  );

  // Obtener el puntaje más alto
  const puntajeMasAlto = Math.max(...puntajesGlobales);
  const { nivel, mensaje } = obtenerNivelDesempeño(puntajeMasAlto);

  // promedio de puntajes
  const totalPuntajes = puntajesGlobales.reduce((acc, curr) => acc + curr, 0);
  const puntajePromedio =
    puntajesGlobales.length > 0
      ? (totalPuntajes / puntajesGlobales.length).toFixed(0)
      : 0;

  // Obtener los dos simulacros más recientes
  const simulacrosMasRecientes = simulacrosCompletados.slice(0, 2);

  const miPuntaje = topPuntajeGlobal?.mayorPuntajeUsuario;

  const isUserInTopPuntajes = topPuntajeGlobal?.mejoresPuntajesGlobales?.some(
    (puntaje) => puntaje.id_usuario === miPuntaje?.id_usuario
  );

  // Función para obtener la imagen correspondiente a cada área
  const getAreaImage = (area) => {
    switch (area) {
      case "Matemáticas":
        return matematicasImg;
      case "Lectura Crítica":
        return lecturaImg;
      case "Lenguaje":
        return lecturaImg;
      case "Sociales":
        return socialesImg;
      case "C. Ciudadanas":
        return ciudadanaImg;
      case "Naturales":
        return naturalesImg;
      case "Inglés":
        return inglesImg;
      default:
        return null;
    }
  };

  const claseFondoPorNivel = {
    Insuficiente: styles.insuficiente,
    Mínimo: styles.minimo,
    Satisfactorio: styles.satisfactorio,
    Avanzado: styles.avanzado,
  };

  return (
    <div className={styles.fondo}>
      <div className={styles.container}>
        <div className={styles.contenedor}>
          <div className={styles.banner}>
            <div className={styles.bannerParrafo}>
              <h1 className={styles.bannerTitulo}>
                ¡Bienvenido a Saber365 <br /> {auth?.nombreUsuario}! 🚀
              </h1>
              <p className={styles.bannerContenido}>
                Explora, aprende y avanza con nosotros. En Saber365, te
                ofrecemos una experiencia única para prepararte y alcanzar tus
                metas.
                <br /> ¡Diviértete mientras te preparas para el éxito! 📚✨
              </p>
            </div>
            <img src={bannerUsuarioImg} />
          </div>
          {simulacrosCompletados.length > 0 && (
            <h2 className={styles.tituloBarraProgreso}>Tu Desempeño</h2>
          )}
          {simulacrosCompletados.length > 0 && (
            <div className={styles.contenedorBarraProgreso}>
              <div className={styles.contenedorBarra}>
                <BarraProgreso current={puntajeMasAlto} />
              </div>
              <div
                className={`${styles.contenedorNivelAlcanzado} ${claseFondoPorNivel[nivel]}`}
              >
                <h2 className={styles.nivelDesempeño}>
                  Nivel de Desempeño: {nivel}
                </h2>
                <p className={styles.nivelMensaje}>{mensaje}</p>
              </div>
            </div>
          )}
          {simulacrosCompletados.length > 0 && (
            <div className={styles.contenedorEstadistica}>
              <div className={styles.cardEstadistica}>
                <div className={styles.valor}>{puntajeMasAlto}</div>
                <div className={styles.label}>Mejor Puntaje</div>
              </div>
              <div className={styles.cardEstadistica}>
                <div className={styles.valor}>{totalSimulacros}</div>
                <div className={styles.label}>Simulacros Completados</div>
              </div>
              <div className={styles.cardEstadistica}>
                <div className={styles.valor}>{puntajePromedio}</div>
                <div className={styles.label}>Puntaje Promedio</div>
              </div>
            </div>
          )}

          {simulacrosCompletados.length > 0 && (
            <h2 className={styles.desempeño}>Gráfica de desempeño por área</h2>
          )}

          {simulacrosCompletados.length > 0 && (
            <div className={styles.contenedorNivelDesempeño}>
              <p>
                En la siguiente gráfica se presenta el rendimiento obtenido en
                cada una de las áreas evaluadas durante los simulacros. Esta
                visualización permite identificar fortalezas y oportunidades de
                mejora en asignaturas clave como{" "}
                <strong>
                  Inglés, Lenguaje: Lectura Crítica, Matemáticas, Ciencias
                  Naturales y Sociales: Competencias Ciudadanas
                </strong>
                , proporcionando una visión integral del desempeño académico.
              </p>
              <p>
                Cada barra representa el puntaje obtenido en el simulacro, lo
                que facilita la comparación entre áreas y ayuda a establecer
                estrategias para mejorar el desempeño en futuras evaluaciones.
              </p>
            </div>
          )}

          {simulacrosCompletados.length > 0 ? (
            <>
              {Object.keys(groupedSimulacros).map((grade) => (
                <div key={grade} className={styles.grafico}>
                  <h4>Grado: {grade}</h4>
                  {barChart(groupedSimulacros[grade])}
                </div>
              ))}
            </>
          ) : (
            <NoResultado
              text="El usuario no ha realizado ningún simulacro."
              toLink="/usuario/pruebas"
              textBoton="Realizar un simulacro"
            />
          )}

          {topPuntajeGlobal.mejoresPuntajesGlobales.length > 0 && (
            <h2 className={styles.h2MejorePuntajes}>Top mejores puntajes</h2>
          )}
          <div className={styles.contenedorTop}>
            <div className={styles.topEstudiantes}>
              {topPuntajeGlobal.mejoresPuntajesGlobales.length > 0 && (
                <h4>Según puntajes globales</h4>
              )}
              {topPuntajeGlobal.mejoresPuntajesGlobales?.length > 0 ? (
                <ol className={styles.listaPuntajes}>
                  {topPuntajeGlobal.mejoresPuntajesGlobales.map(
                    (puntaje, index) => (
                      <li
                        key={index}
                        className={`${styles.itemPuntaje} ${
                          puntaje.nombreUsuario === miPuntaje?.nombreUsuario
                            ? styles.bordeVerde
                            : ""
                        }`}
                      >
                        <div className={styles.usuarioInfo}>
                          <span className={styles.nombreUsuario}>
                            {puntaje.nombreUsuario}
                          </span>
                          <span className={styles.grado}>{puntaje.grado}</span>
                        </div>
                        <div className={styles.usuarioInfo}>
                          <span className={styles.puntajeGlobal}>
                            {Math.ceil(puntaje.puntaje_global)}
                          </span>
                          <span className={styles.tiempoPrueba}>
                            {FormatearTiempo(
                              puntaje.tiempo - puntaje.tiempo_prueba
                            )}
                          </span>
                        </div>
                        <div>
                          <span className={styles.tituloSimulacro}>
                            {puntaje.titulo}
                          </span>
                        </div>
                      </li>
                    )
                  )}
                </ol>
              ) : null}

              {!isUserInTopPuntajes && miPuntaje ? (
                <div className={styles.miPuntaje}>
                  <div className={styles.contenedorNumero}>
                    <span className={styles.indiceNumero}>
                      {miPuntaje.posicion}
                    </span>
                  </div>
                  <div className={styles.usuarioInfo}>
                    <span className={styles.nombreUsuario}>
                      {miPuntaje.nombreUsuario}
                    </span>
                    <span className={styles.grado}>{miPuntaje.grado}</span>
                  </div>
                  <div className={styles.usuarioInfo}>
                    <span className={styles.puntajeGlobal}>
                      {Math.ceil(miPuntaje.puntaje_global)}
                    </span>
                    <span className={styles.tiempoPrueba}>
                      {FormatearTiempo(
                        miPuntaje.tiempo - miPuntaje.tiempo_prueba
                      )}
                    </span>
                  </div>
                  <div>
                    <span className={styles.tituloSimulacro}>
                      {miPuntaje.titulo}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className={styles.contenedorPorArea}>
              {topPuntajePorArea["Matemáticas"].mejoresPuntajesPorArea.length >
                0 && <h4>Según puntajes por área</h4>}
              {Object.keys(topPuntajePorArea).map((area) => (
                <button
                  key={area}
                  className={`${styles.botonArea} ${
                    areaSeleccionada === area ? styles.botonActivo : ""
                  }`}
                  onClick={() => setAreaSeleccionada(area)}
                >
                  {area}
                </button>
              ))}

              {topPuntajePorArea["Matemáticas"].mejoresPuntajesPorArea.length >
              0 ? (
                <div className={styles.areasContainer}>
                  {(areaSeleccionada
                    ? [areaSeleccionada]
                    : Object.keys(topPuntajePorArea)
                  ).map((area, index) => {
                    const areaData = topPuntajePorArea[area];
                    if (
                      !areaData.mayorPuntajeUsuario &&
                      areaData.mejoresPuntajesPorArea.length === 0
                    ) {
                      return (
                        <div key={index} className={styles.areaVacia}>
                          <p>
                            No hay puntajes registrados para el área{" "}
                            <strong>{area}</strong>.
                          </p>
                        </div>
                      );
                    }
                    return (
                      <div key={index} className={styles.areaItem}>
                        <div className={styles.contenedorlogo}>
                          <img
                            src={getAreaImage(area)}
                            alt={`${area} logo`}
                            className={styles.areaImg}
                          />
                          <h4 className={styles.area}>{area}</h4>
                        </div>
                        <div className={styles.areaPuntajes}>
                          <ul className={styles.listaMejoresPuntajes}>
                            {topPuntajePorArea[
                              area
                            ]?.mejoresPuntajesPorArea?.map((puntaje, index) => (
                              <li
                                key={index}
                                className={`${styles.itemPuntaje} ${
                                  puntaje.id_usuario === miPuntaje?.id_usuario
                                    ? styles.bordeVerde
                                    : ""
                                }`}
                              >
                                <div className={styles.usuarioInfo}>
                                  <span className={styles.nombreUsuario}>
                                    {puntaje.nombreUsuario}
                                  </span>
                                  <span className={styles.grado}>
                                    {puntaje.grado}
                                  </span>
                                </div>
                                <div className={styles.usuarioInfo}>
                                  <span className={styles.puntajeArea}>
                                    {Math.ceil(puntaje.puntaje_area)}
                                  </span>
                                </div>
                                <div>
                                  <span className={styles.tituloSimulacro}>
                                    {puntaje.titulo}
                                  </span>
                                </div>
                              </li>
                            ))}
                            {!topPuntajePorArea[
                              area
                            ]?.mejoresPuntajesPorArea?.some(
                              (puntaje) =>
                                puntaje.id_usuario ===
                                topPuntajePorArea[area]?.mayorPuntajeUsuario
                                  ?.id_usuario
                            ) &&
                              topPuntajePorArea[area]?.mayorPuntajeUsuario && (
                                <div className={styles.miPuntaje}>
                                  <div className={styles.contenedorNumero}>
                                    <span className={styles.indiceNumero}>
                                      {
                                        topPuntajePorArea[area]
                                          ?.mayorPuntajeUsuario.posicion
                                      }
                                    </span>
                                  </div>
                                  <div className={styles.usuarioInfo}>
                                    <span className={styles.nombreUsuario}>
                                      {
                                        topPuntajePorArea[area]
                                          ?.mayorPuntajeUsuario.nombreUsuario
                                      }
                                    </span>
                                    <span className={styles.grado}>
                                      {
                                        topPuntajePorArea[area]
                                          ?.mayorPuntajeUsuario.grado
                                      }
                                    </span>
                                  </div>
                                  <div className={styles.usuarioInfo}>
                                    <span className={styles.puntajeArea}>
                                      {Math.ceil(
                                        topPuntajePorArea[area]
                                          ?.mayorPuntajeUsuario.puntaje_area
                                      )}
                                    </span>
                                  </div>
                                  <div>
                                    <span className={styles.tituloSimulacro}>
                                      {
                                        topPuntajePorArea[area]
                                          ?.mayorPuntajeUsuario.titulo
                                      }
                                    </span>
                                  </div>
                                </div>
                              )}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
              {/* Agregar el mayor puntaje del usuario si no está en los tres primeros */}
            </div>
          </div>
          {simulacrosMasRecientes.length > 0 && (
            <h3>Últimos simulacros realizados</h3>
          )}
          <div className={styles.containerPruebas}>
            {simulacrosMasRecientes.length > 0
              ? simulacrosMasRecientes.map((simulacro) => (
                  <div key={simulacro.id} className={styles.simulacros}>
                    <div className={styles.titulo}>
                      <img
                        src={simulacro.simulacro.imagen}
                        className={styles.imagen}
                      />
                      <h5>
                        {FormatearTiempo(
                          simulacro.simulacro.tiempo - simulacro.tiempo_prueba
                        )}
                      </h5>
                    </div>
                    <h3 className={styles.tituloPrueba}>
                      {" "}
                      {simulacro.simulacro.titulo}
                    </h3>
                    <h5 className={styles.fechaSimulacro}>
                      {formatearFecha(simulacro.createdAt)}
                    </h5>
                    <div className={styles.contenedorPuntajes}>
                      <p>
                        Puntaje Global:{" "}
                        <span className={styles.span}>
                          {Math.ceil(simulacro.puntaje_global)}
                        </span>
                      </p>
                      <p>
                        Nivel Alcanzado:{" "}
                        <span className={styles.span}>
                          {simulacro.nivel_alcanzado}
                        </span>
                      </p>
                      <p>
                        Respuestas Correctas:{" "}
                        <span className={styles.span}>
                          {simulacro.estado_preguntas.reduce(
                            (contador, pregunta) =>
                              contador + (pregunta.esCorrecta ? 1 : 0),
                            0
                          )}
                        </span>
                      </p>
                      <p>
                        Porcentaje de Aciertos:{" "}
                        <span className={styles.span}>
                          {Math.round(
                            (simulacro.estado_preguntas.reduce(
                              (contador, pregunta) =>
                                contador + (pregunta.esCorrecta ? 1 : 0),
                              0
                            ) /
                              simulacro.estado_preguntas.length) *
                              100
                          )}
                          %
                        </span>
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div>
            {simulacrosMasRecientes.length > 0 && (
              <div>
                <Link to="/usuario/resultados" className={styles.link}>
                  <Boton text="Ver todos los Simulacros" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuarioInicio;
