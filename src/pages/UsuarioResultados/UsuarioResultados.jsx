import styles from "./UsuarioResultados.module.css";
import bannerUsuarioResultadosImg from "../../assets/bannerUsuarioResultadosImg.png";
import { formatearFecha } from "../../helpers/formatearFecha";
import Boton from "../../components/Boton/Boton";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import { Link } from "react-router-dom";
import NoResultado from "../../components/NoResultado/NoResultado";
import { FormatearTiempo } from "../../helpers/FormatearTiempo";
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
  Filler, //
} from "chart.js";
import { Bar } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
  Filler //
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
  // Prepare labels based on the grade
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

const BarChart2 = (simulacrosCompletados) => {
  // Preparar los datos para Chart.js
  const etiquetas = simulacrosCompletados.map(
    (simulacro) => simulacro.simulacro.titulo
  );
  const datos = simulacrosCompletados.map(
    (simulacro) => simulacro.puntaje_global
  );

  const data = {
    labels: etiquetas,
    datasets: [
      {
        label: "Puntaje Global",
        data: datos,
        borderColor: "rgba(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Puntaje Global",
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
          text: "Simulacro",
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
        text: "Puntaje Global por Simulacro",
        color: "#000", // Color del título
        font: {
          size: 16, // Tamaño del título
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
      annotation: {
        annotations: [
          {
            type: "line",
            mode: "horizontal",
            scaleID: "y",
            value: 250,
            borderColor: "orange",
            borderWidth: 2,
            borderDash: [10, 5],
            label: {
              content: "250",
              enabled: true,
              position: "right",
              backgroundColor: "orange",
              font: {
                size: 8,
              },
            },
          },
          {
            type: "line",
            mode: "horizontal",
            scaleID: "y",
            value: 300,
            borderColor: "yellow",
            borderWidth: 2,
            borderDash: [10, 5],
            label: {
              content: "300",
              enabled: true,
              position: "right",
              backgroundColor: "yellow",
              font: {
                size: 8,
              },
            },
          },
          {
            type: "line",
            mode: "horizontal",
            scaleID: "y",
            value: 380,
            borderColor: "green",
            borderWidth: 2,
            borderDash: [10, 5],
            label: {
              content: "380",
              enabled: true,
              position: "right",
              backgroundColor: "green",
              font: {
                size: 8,
              },
            },
          },
        ],
      },
    },
  };

  return <Bar data={data} options={options} />;
};

const UsuarioResultados = () => {
  const {
    simulacrosCompletados,
    obtenerSimulacroFinalizado,
    setSimulacroId,
    obtenerPosicionSimulacro,
    obtenerPosicionPorArea,
  } = usePerfilUsuario();

  const groupedSimulacros = groupByGrade(simulacrosCompletados);

  return (
    <div className={styles.fondo}>
      <div className={styles.container}>
        <div className={styles.contenedor}>
          <div className={styles.banner}>
            <div className={styles.bannerParrafo}>
              <h1 className={styles.bannerTitulo}>Resultados</h1>
              <p className={styles.bannerContenido}>
                Explora tus resultados y revisa tu progreso para avanzar en tus
                habilidades.
                <br />
                <br />
                Sigue trabajando en ti y verás los resultados.
              </p>
            </div>
            <img src={bannerUsuarioResultadosImg} alt="Banner Resultados" />
          </div>
          <div className={styles.tableContainer}>
            {simulacrosCompletados.length > 0 && (
              <h3 className={styles.subtitulo}>Simulacros Realizados</h3>
            )}

            {simulacrosCompletados.length > 0 ? (
              <table className={styles.tablaEncabezado}>
                <thead>
                  <tr>
                    <th>Simulacro</th>
                    <th>Grado</th>
                    <th>Puntaje Global</th>
                    <th>Número de Preguntas</th>
                    <th>Tiempo</th>
                    <th>Fecha de Aplicación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {simulacrosCompletados.map((simulacro) => (
                    <tr key={simulacro.id}>
                      <td>{simulacro.simulacro.titulo}</td>
                      <td>{simulacro.simulacro.grado}</td>
                      <td>{Math.ceil(simulacro.puntaje_global)}</td>
                      <td>{simulacro.simulacro.cantidad_preguntas}</td>
                      <td>
                        {FormatearTiempo(
                          simulacro.simulacro.tiempo - simulacro.tiempo_prueba
                        )}
                      </td>
                      <td>{formatearFecha(simulacro.updatedAt)}</td>
                      <td className={styles.boton}>
                        <Link
                          to={`/usuario/resultados/resultado/${simulacro.id}`}
                          className={styles.link}
                        >
                          <Boton
                            text="Ver más"
                            onClick={() => {
                              obtenerSimulacroFinalizado(simulacro.id);
                              setSimulacroId(simulacro.simulacro.id);
                              obtenerPosicionSimulacro(
                                simulacro.id_simulacro,
                                simulacro.id_usuario
                              );
                              obtenerPosicionPorArea(
                                simulacro.id_simulacro,
                                simulacro.id_usuario
                              );
                            }}
                          />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <NoResultado
                text="El usuario no ha realizado ningún simulacro."
                toLink="/usuario/pruebas"
                textBoton="Realizar un simulacro"
              />
            )}
          </div>
          <div>
            {simulacrosCompletados.length > 0 && (
              <h3 className={styles.desempeño}>Desempeño por puntaje global</h3>
            )}
            {Object.keys(groupedSimulacros).map((grade) => (
              <div key={grade} className={styles.grafico}>
                <h4>Grado: {grade}</h4>
                {BarChart2(groupedSimulacros[grade])}
              </div>
            ))}
          </div>
          {simulacrosCompletados.length > 0 && (
            <h3 className={styles.subtitulo}>Resultado general</h3>
          )}

          {Object.keys(groupedSimulacros).map((grade) => (
            <div key={grade} className={styles.grafico}>
              <h4>Grado: {grade}</h4>
              {groupedSimulacros[grade] && (
                <table className={styles.tablaEncabezado}>
                  <thead>
                    <tr>
                      <th>Simulacro</th>
                      <th>Puntaje Global</th>
                      {(grade === "Undécimo" || grade === "Décimo") && (
                        <th>Lectura Crítica</th>
                      )}

                      {grade != "Undécimo" && grade != "Décimo" && (
                        <th>Lenguaje</th>
                      )}

                      <th>Matemáticas</th>

                      {(grade === "Undécimo" || grade === "Décimo") && (
                        <th>Sociales</th>
                      )}

                      {(grade === "Noveno" ||
                        grade === "Octavo" ||
                        grade === "Séptimo" ||
                        grade === "Sexto" ||
                        grade === "Quinto") && <th>C. Ciudadanas</th>}

                      {grade != "Cuarto" && grade != "Tercero" && (
                        <th>Naturales</th>
                      )}

                      {(grade === "Undécimo" ||
                        grade === "Décimo" ||
                        grade === "Noveno") && <th>Inglés</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {groupedSimulacros[grade].map((simulacro) => (
                      <tr key={simulacro.id}>
                        <td>{simulacro.simulacro.titulo}</td>
                        <td>{Math.ceil(simulacro.puntaje_global)}</td>
                        {(grade === "Undécimo" || grade === "Décimo") && (
                          <td>
                            {Math.ceil(
                              simulacro.puntaje_por_area["Lectura Crítica"]
                            )}
                          </td>
                        )}

                        {grade != "Undécimo" && grade != "Décimo" && (
                          <td>
                            {Math.ceil(simulacro.puntaje_por_area["Lenguaje"])}
                          </td>
                        )}

                        <td>
                          {Math.ceil(simulacro.puntaje_por_area["Matemáticas"])}
                        </td>

                        {(grade === "Undécimo" || grade === "Décimo") && (
                          <td>
                            {Math.ceil(simulacro.puntaje_por_area["Sociales"])}
                          </td>
                        )}

                        {(grade === "Noveno" ||
                          grade === "Octavo" ||
                          grade === "Séptimo" ||
                          grade === "Sexto" ||
                          grade === "Quinto") && (
                          <td>
                            {Math.ceil(
                              simulacro.puntaje_por_area["C. Ciudadanas"]
                            )}
                          </td>
                        )}

                        {grade != "Cuarto" && grade != "Tercero" && (
                          <td>
                            {Math.ceil(simulacro.puntaje_por_area["Naturales"])}
                          </td>
                        )}

                        {(grade === "Undécimo" ||
                          grade === "Décimo" ||
                          grade === "Noveno") && (
                          <td>
                            {Math.ceil(simulacro.puntaje_por_area["Inglés"])}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}

          <div>
            {simulacrosCompletados.length > 0 && (
              <h3 className={styles.desempeño}>Desempeño por área</h3>
            )}
            {Object.keys(groupedSimulacros).map((grade) => (
              <div key={grade} className={styles.grafico}>
                <h4>Grado: {grade}</h4>
                {barChart(groupedSimulacros[grade])}
              </div>
            ))}
          </div>

          {simulacrosCompletados.length > 0 && (
            <h3 className={styles.subtitulo}>Nivel de desempeño</h3>
          )}

          {Object.keys(groupedSimulacros).map((grade) => (
            <div key={grade} className={styles.grafico}>
              <h4>Grado: {grade}</h4>
              {groupedSimulacros[grade]?.length > 0 && (
                <table className={styles.tablaEncabezado}>
                  <thead>
                    <tr>
                      <th>Simulacro</th>
                      <th>Puntaje Global</th>
                      {(grade === "Undécimo" || grade === "Décimo") && (
                        <th>Lectura Crítica</th>
                      )}

                      {grade != "Undécimo" && grade != "Décimo" && (
                        <th>Lenguaje</th>
                      )}

                      <th>Matemáticas</th>

                      {(grade === "Undécimo" || grade === "Décimo") && (
                        <th>Sociales</th>
                      )}

                      {(grade === "Noveno" ||
                        grade === "Octavo" ||
                        grade === "Séptimo" ||
                        grade === "Sexto" ||
                        grade === "Quinto") && <th>C. Ciudadanas</th>}

                      {grade != "Cuarto" && grade != "Tercero" && (
                        <th>Naturales</th>
                      )}

                      {(grade === "Undécimo" ||
                        grade === "Décimo" ||
                        grade === "Noveno") && <th>Inglés</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {groupedSimulacros[grade].map((simulacro) => (
                      <tr key={simulacro.id}>
                        <td>{simulacro.simulacro.titulo}</td>
                        <td>{simulacro.nivel_alcanzado}</td>

                        {(grade === "Undécimo" || grade === "Décimo") && (
                          <td>
                            {simulacro.nivel_por_area["Lectura Crítica"] ||
                              "N/A"}
                          </td>
                        )}

                        {grade != "Undécimo" && grade != "Décimo" && (
                          <td>
                            {simulacro.nivel_por_area["Lenguaje"] || "N/A"}
                          </td>
                        )}

                        <td>
                          {simulacro.nivel_por_area["Matemáticas"] || "N/A"}
                        </td>

                        {(grade === "Undécimo" || grade === "Décimo") && (
                          <td>
                            {simulacro.nivel_por_area["Sociales"] || "N/A"}
                          </td>
                        )}
                        {(grade === "Noveno" ||
                          grade === "Octavo" ||
                          grade === "Séptimo" ||
                          grade === "Sexto" ||
                          grade === "Quinto") && (
                          <td>
                            {simulacro.nivel_por_area["C. Ciudadanas"] || "N/A"}
                          </td>
                        )}

                        {grade != "Cuarto" && grade != "Tercero" && (
                          <td>
                            {simulacro.nivel_por_area["Naturales"] || "N/A"}
                          </td>
                        )}

                        {(grade === "Undécimo" ||
                          grade === "Décimo" ||
                          grade === "Noveno") && (
                          <td>{simulacro.nivel_por_area["Inglés"] || "N/A"}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsuarioResultados;
