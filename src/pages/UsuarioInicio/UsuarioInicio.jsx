import { useEffect, useState } from "react";
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
import Loading from "../../components/Loading/Loading";
import NoResultado from "../../components/NoResultado/NoResultado";

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

const barChart = (simulacrosCompletados) => {
  // Preparar los datos para Chart.js
  const etiquetas = [
    "Ingles",
    "Lectura Critica",
    "Matemáticas",
    "Naturales",
    "Sociales",
  ];
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

const UsuarioInicio = () => {
  const { auth } = useAuth();
  const { topPuntajeGlobal, topPuntajePorArea, simulacrosCompletados } =
    usePerfilUsuario();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Establecer un tiempo fijo de carga de 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    // Limpiar el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  simulacrosCompletados.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

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
      case "Lectura Critica":
        return lecturaImg;
      case "Sociales":
        return socialesImg;
      case "Naturales":
        return naturalesImg;
      case "Ingles":
        return inglesImg;
      default:
        return null;
    }
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
          {simulacrosCompletados.length > 0 && (<h2 className={styles.desempeño}>Desempeño por Simulacro</h2>)}
          {simulacrosCompletados.length > 0 ? (
            <div className={styles.grafico}>
              {barChart(simulacrosCompletados)}
            </div>
          ) : (
            <NoResultado
              text="El usuario no ha realizado ningún simulacro."
              toLink="/usuario/pruebas"
              textBoton="Realizar un simulacro"
            />
          )}
          {topPuntajeGlobal > 0 && (
            <h2 className={styles.h2MejorePuntajes}>Top mejores puntajes</h2>
          )}
          <div className={styles.contenedorTop}>
            <div className={styles.topEstudiantes}>
              {topPuntajeGlobal > 0 && <h4>Según puntajes globales</h4>}
              {topPuntajeGlobal > 0 &&
              topPuntajeGlobal.mejoresPuntajesGlobales?.length > 0 ? (
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
                            {puntaje.puntaje_global}
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
                      {miPuntaje.puntaje_global}
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
              {topPuntajePorArea.length > 0 && (
                <h4>Según puntajes por área</h4>
              )}
              {topPuntajePorArea  > 0 &&
              Object.keys(topPuntajePorArea).length > 0 ? (
                <div className={styles.areasContainer}>
                  {Object.keys(topPuntajePorArea).map((area, index) => (
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
                          {topPuntajePorArea[area]?.mejoresPuntajesPorArea?.map(
                            (puntaje, index) => (
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
                                    {puntaje.puntaje_area}
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
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          {simulacrosMasRecientes.length > 0 && (
            <h2>Últimos simulacros realizados</h2>
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
                          {simulacro.puntaje_global}
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
