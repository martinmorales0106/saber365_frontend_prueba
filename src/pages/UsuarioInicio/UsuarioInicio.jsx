import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";
import { FormatearTiempo } from "../../helpers/FormatearTiempo";
import { formatearFecha } from "../../helpers/formatearFecha";
import Boton from "../../components/Boton/Boton";
import styles from "./UsuarioInicio.module.css";
import bannerUsuarioImg from "../../assets/bannerUsuarioImg.png";
import BarraProgreso from "../../components/PerfilUsuarioInicio/BarraProgreso/BarraProgreso";
import ContadorSaber11 from "../../components/PerfilUsuarioInicio/ContadorSaber11/ContadorSaber11";
import BotonesAccionRapida from "../../components/PerfilUsuarioInicio/BotonesAccionRapida/BotonesAccionRapida";
import CalendarioActividades from "../../components/PerfilUsuarioInicio/CalendarioActividades/CalendarioActividades";
import MotivacionDelDia from "../../components/PerfilUsuarioInicio/MotivacionDelDia/MotivacionDelDia";
import ProgresoMaterias from "../../components/PerfilUsuarioInicio/ProgresoMaterias/ProgresoMaterias";
import TopPuntajes from "../../components/PerfilUsuarioInicio/TopPuntajes/TopPuntajes";

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

  simulacrosCompletados.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // total de simulacros completados
  const totalSimulacros = simulacrosCompletados.length;

  // sacar los puntajes del usuario
  const puntajesGlobales =
    simulacrosCompletados?.map((sim) => sim.puntaje_global) || [];

  // Obtener el puntaje más alto
  const puntajeMasAlto =
    puntajesGlobales.length > 0 ? Math.max(...puntajesGlobales) : 0;

  const { nivel, mensaje } = obtenerNivelDesempeño(puntajeMasAlto);

  // promedio de puntajes
  const totalPuntajes = puntajesGlobales.reduce((acc, curr) => acc + curr, 0);
  const puntajePromedio =
    puntajesGlobales.length > 0
      ? (totalPuntajes / puntajesGlobales.length).toFixed(0)
      : 0;

  const obtenerTopPuntajePorArea = (simulacrosCompletados) => {
    const topPuntajes = {};

    simulacrosCompletados.forEach((simulacro) => {
      const puntajes = simulacro.puntaje_por_area;

      Object.entries(puntajes).forEach(([area, puntaje]) => {
        if (!topPuntajes[area] || puntaje > topPuntajes[area]) {
          topPuntajes[area] = puntaje;
        }
      });
    });

    return topPuntajes;
  };

  const topPuntajePorAreaCompletados = obtenerTopPuntajePorArea(
    simulacrosCompletados
  );
  const materias = Object.entries(topPuntajePorAreaCompletados).map(
    ([nombre, progreso]) => ({
      nombre,
      progreso,
    })
  );

  const obtenerAreaMasAltaYMasBaja = (topPuntajePorArea) => {
    const entradas = Object.entries(topPuntajePorArea);

    if (entradas.length === 0) return { areaMasAlta: null, areaMasBaja: null };

    let areaMasAlta = entradas[0][0];
    let areaMasBaja = entradas[0][0];
    let maxPuntaje = entradas[0][1];
    let minPuntaje = entradas[0][1];

    entradas.forEach(([area, puntaje]) => {
      if (puntaje > maxPuntaje) {
        maxPuntaje = puntaje;
        areaMasAlta = area;
      }
      if (puntaje < minPuntaje) {
        minPuntaje = puntaje;
        areaMasBaja = area;
      }
    });

    return { areaMasAlta, areaMasBaja };
  };

  const { areaMasAlta, areaMasBaja } = obtenerAreaMasAltaYMasBaja(
    topPuntajePorAreaCompletados
  );
  // Obtener los dos simulacros más recientes
  const simulacrosMasRecientes = simulacrosCompletados.slice(0, 2);

  const miPuntaje = topPuntajeGlobal?.mayorPuntajeUsuario;

  const isUserInTopPuntajes = topPuntajeGlobal?.mejoresPuntajesGlobales?.some(
    (puntaje) => puntaje.id_usuario === miPuntaje?.id_usuario
  );

  // Función para obtener la imagen correspondiente a cada área

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
            <img
              src={bannerUsuarioImg}
              alt="Banner Usuario"
              className={styles.bannerImagen}
            />
          </div>

          <div className={styles.contenedor}>
            <h2 className={styles.titulo}>
              🧠 ¡Tu camino hacia el Saber empieza aquí!
            </h2>
            <p className={styles.mensaje}>
              Organízate, practica y prepárate cada día con nuestros simulacros.
            </p>

            <div className={styles.seccionGrid}>
              <div className={styles.tarjeta}>
                <div
                  className={`${styles.contenedorInterno} ${styles.contador}`}
                >
                  <div className={styles.contenedorTexto2}>
                    <h2 className={styles.tituloTarjeta}>
                      El tiempo es tu mejor aliado
                    </h2>
                    <ContadorSaber11 />
                    <p className={styles.textoSecundario}>
                      Aprovecha cada día para practicar, repasar y llegar con
                      seguridad a la prueba. ¡Tú puedes lograrlo!
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.tarjeta}>
                <div
                  className={`${styles.contenedorInterno} ${styles.calendario}`}
                >
                  <div className={styles.contenedorTexto}>
                    <div className={styles.icono}>📅</div>
                    <div>
                      <h2 className={styles.tituloTarjeta}>
                        Tu calendario de estudio y eventos
                      </h2>
                      <p className={styles.textoSecundario}>
                        Visualiza tus eventos, simulacros agendados y fechas
                        claves para las Pruebas saber.
                      </p>
                    </div>
                  </div>
                  <CalendarioActividades />
                </div>
              </div>
            </div>
          </div>

          {simulacrosCompletados.length > 0 && (
            <h2 className={styles.tituloBarraProgreso}>
              📊 Tu Progreso Personal
            </h2>
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
                <div className={styles.label}>🏆 Mejor Puntaje</div>
              </div>
              <div className={styles.cardEstadistica}>
                <div className={styles.valor}>{totalSimulacros}</div>
                <div className={styles.label}>📘 Simulacros Completados</div>
              </div>
              <div className={styles.cardEstadistica}>
                <div className={styles.valor}>{puntajePromedio}</div>
                <div className={styles.label}>🧮 Puntaje Promedio</div>
              </div>
              <div
                className={`${styles.cardEstadistica} ${styles.mejorMateria}`}
              >
                <div className={styles.valor}>{areaMasAlta}</div>
                <div className={styles.label}>📈 Mejor Área</div>
              </div>
              <div
                className={`${styles.cardEstadistica} ${styles.peorMateria}`}
              >
                <div className={styles.valor}>{areaMasBaja}</div>
                <div className={styles.label}>🔻 A Mejorar</div>
              </div>
            </div>
          )}
          <div>
            <ProgresoMaterias materias={materias} />
          </div>
          <div>
            <TopPuntajes
              topPuntajeGlobal={topPuntajeGlobal}
              miPuntaje={miPuntaje}
              isUserInTopPuntajes={isUserInTopPuntajes}
              topPuntajePorArea={topPuntajePorArea}
            />
          </div>
          <div>
            <MotivacionDelDia />
          </div>

          {simulacrosMasRecientes.length > 0 && (
            <h2 className={styles.tituloSimulacroUltimos}>
              📋 Últimos simulacros realizados
            </h2>
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
                      <h6>
                        {FormatearTiempo(
                          simulacro.simulacro.tiempo - simulacro.tiempo_prueba
                        )}
                      </h6>
                    </div>
                    <h3 className={styles.tituloPrueba}>
                      {" "}
                      {simulacro.simulacro.titulo}
                    </h3>
                    <h4 className={styles.fechaSimulacro}>
                      {formatearFecha(simulacro.createdAt)}
                    </h4>
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
          <div>
            <BotonesAccionRapida />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuarioInicio;
