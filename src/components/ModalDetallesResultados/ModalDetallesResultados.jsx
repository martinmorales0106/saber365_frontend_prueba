import styles from "./ModalDetallesResultados.module.css";
import cerrarImg from "../../assets/CerrarNegroImg.png";
import matematicasImg from "../../assets/matematicasImg.png";
import lecturaImg from "../../assets/lecturaImg.png";
import socialesImg from "../../assets/socialesImg.png";
import naturalesImg from "../../assets/naturalesImg.png";
import inglesImg from "../../assets/inglesImg.png";
import nivelInsuficienteImg from "../../assets/nivelInsuficienteImg.png";
import nivelMininimoImg from "../../assets/nivelMininimoImg.png";
import nivelSatisfactorioImg from "../../assets/nivelSatisfactorioImg.png";
import nivelAvanzadoImg from "../../assets/nivelAvanzadoImg.png";

import { useEffect, useState, useRef } from "react";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";

const ModalDetallesResultados = () => {
  const { modalResultado, handleModalResultado, resultadoArea } =
    usePerfilUsuario();
  const [area, setArea] = useState("");
  const [puntaje, setPuntaje] = useState("");
  const [nivel, setNivel] = useState("");
  const modalRef = useRef();

  const handleCloseModal = (event) => {
    // Cierra la modal solo si se hace clic fuera de la ventana modal
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleModalResultado();
    }
  };

  useEffect(() => {
    // Agrega un event listener para el clic global
    document.addEventListener("mousedown", handleCloseModal);

    // Limpia el event listener al desmontar el componente
    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, [handleModalResultado]);

  useEffect(() => {
    setArea(resultadoArea.area);
    setPuntaje(resultadoArea.puntaje);
    setNivel(resultadoArea.nivel);
  }, [resultadoArea]);

  // Nivels de desempeño
  // Lectura Critica
  const lecturaInsuficiente = [
    "Probablemente identifica elementos literales en textos continuos y discontinuos sin establecer relaciones de significado.",
  ];

  const lecturaMinimo = [
    "Identifica información local del texto.",
    "Identifica la estructura de textos continuos y discontinuos.",
    "Identifica relaciones básicas entre componentes del texto.",
    "Identifica fenómenos semánticos básicos: sinónimos y antónimos.",
    "Reconoce en un texto la diferencia entre proposición y párrafo.",
    "Reconoce el sentido local y global del texto.",
    "Identifica intenciones comunicativas explícitas.",
    "Identifica relaciones básicas: contraste, similitud y complementación, entre textos presentes.",
  ];

  const lecturaSatisfactorio = [
    "Jerarquiza la información presente en un texto.",
    "Infiere información implícita en textos continuos y discontinuos.",
    "Establece relaciones intertextuales: definición, causaefecto, oposición y antecedente-consecuente, entre textos presentes.",
    "Reconoce la intención comunicativa del texto.",
    "Relaciona marcadores textuales en la interpretación de textos.",
    "Reconoce la función de figuras literarias.",
    "Identifica el uso del lenguaje en contexto.",
    "Analiza y sintetiza la información contenida en un texto.",
    "Identifica la estructura sintáctica en textos discontinuos.",
    "Establece la validez de argumentos en un texto.",
  ];

  const lecturaAvanzado = [
    "Propone soluciones a problemas de interpretación que subyacen en un texto.",
    "Evalúa contenidos, estrategias discursivas y argumentativas presentes en un texto.",
    "Relaciona información de dos o más textos o fragmentos de texto para llegar a una conclusión.",
    "Aplica conceptos de análisis literario para caracterizar diferentes elementos en un texto.",
    "Reconoce los contextos como elementos importantes en la valoración de un texto.",
    "Selecciona elementos locales y construye argumentos que sustentan una tesis con base en textos relacionados.",
    "Asume una postura crítica frente a los planteamientos de un texto.",
    "Plantea hipótesis de lectura a partir de las ideas presentes en un texto.",
  ];

  const matematicasInsuficiente = [
    "Probablemente puede leer información puntual (un dato, por ejemplo) relacionada con situaciones cotidianas y presentada en tablas o gráficas con escala explícita, cuadrícula o, por lo menos, líneas horizontales; pero puede tener dificultades al comparar distintos conjuntos de datos, involucrar diferentes variables o analizar situaciones alejadas de su vida diaria.",
  ];

  const matematicasMinimo = [
    "Compara datos de dos variables presentadas en una misma gráfica sin necesidad de hacer operaciones aritméticas.",
    "Identifica valores o puntos representativos en diferentes tipos de registro a partir del significado que tienen en la situación.",
    "Compara la probabilidad de eventos simples (casos favorables/casos posibles), cuando los casos posibles son los mismos en ambos eventos y en contextos similares a los presentados en el aula",
    "Toma decisiones sobre la veracidad o falsedad de una afirmación cuando esta se puede explicar verbalizando la lectura directa que se hace de la información.",
    "Cambia gráficas de barras a tablas de doble entrada.",
    "Reconoce e interpreta según el contexto el significado de promedio simple, moda, mayor, menor, máximo y mínimo.",
  ];

  const matematicasSatisfactorio = [
    "Selecciona la gráfica (que puede ser de doble entrada) correspondiente a la información de una tabla, o a partir de verbalizaciones (características de crecimiento o decrecimiento deseadas), teniendo en cuenta para la selección la escala, el tipo de variable y el tipo de gráfica.",
    "Compara información gráfica que requiere algunas manipulaciones aritméticas.",
    "Señala información representada en formatos no convencionales (mapas o infografías).",
    "Reconoce errores ocurridos al realizar una trasformación entre diferentes tipos de registro.",
    "Reconoce desarrollos planos de una forma tridimensional y viceversa.",
    "Compara la probabilidad de eventos simples en diversos contextos (casos favorables/casos posibles), incluso cuando los casos posibles de cada evento son diferentes.",
    "Selecciona información necesaria para resolver problemas que involucran operaciones aritméticas.",
    "Selecciona información necesaria para resolver problemas que involucran características medibles de figuras geométricas elementales (triángulos, cuadriláteros y circunferencias).",
    "Cambia la escala cuando la trasformación no es convencional.",
    "Justifica afirmaciones utilizando planteamientos y operaciones aritméticas o haciendo uso directo de un concepto, es decir, a partir de un único argumento.",
    "Identifica información relevante cuando el tipo de registro contiene información de más de tres categorías.",
    "Hace manipulaciones algebraicas sencillas (aritmética de términos semejantes).",
  ];

  const matematicasAvanzado = [
    "Resuelve problemas que requieren interpretar información de eventos dependientes.",
    "Realiza transformaciones de subconjuntos de información que pueden requerir el uso de operaciones complejas (cálculos de porcentajes).",
    "Resuelve problemas que requieren construir una representación auxiliar (gráficas y fórmulas) como paso intermedio para su solución.",
    "Modela usando lenguaje algebraico información dada en lenguaje natural, tablas o representaciones geométricas.",
    "Manipula expresiones algebraicas o aritméticas haciendo uso de las propiedades de las operaciones.",
    "Modela fenómenos variacionales no explícitos haciendo uso de lenguaje simbólico o gráficas.",
    "Reconoce en diferentes formatos el espacio muestral de un experimento aleatorio.",
    "Resuelve problemas de conteo que requieren el uso de permutaciones.",
    "Justifica si hay falta de información en una situación problema para tomar una decisión.",
    "Toma decisiones sobre la veracidad o falsedad de una afirmación cuando requiere el uso de varias propiedades o conceptualizaciones formales.",
  ];

  const socialesInsufuciente = [
    "Probablemente reconocer algunos derechos ciudadanos en situaciones sencillas. Adicionalmente, podría reconocer dimensiones presentes en   una problemática o sus propuestas de solución, e identificar creencias que explican  algunos comportamientos. Este estudiante probablemente no está en capacidad de utilizar conceptos de las ciencias sociales o modelos conceptuales, ni de reconocer principios constitucionales o de analizar enunciados.",
  ];

  const socialesMinimo = [
    "Identifica derechos ciudadanos y deberes del Estado establecidos en la Constitución Política de Colombia.",
    "Relaciona la conducta de una persona con su forma de ver la vida.",
    "Reconoce los efectos de una solución y las dimensiones que privilegia.",
    "Identifica contextos o procesos en los que se inscribe una fuente o evento.",
  ];

  const socialesSatisfactorio = [
    "Reconoce intenciones y prejuicios, así como argumentos similares o diferentes dados en un contexto o una situación específica.",
    "Identifica dimensiones (económicas, políticas, culturales, ambientales, etc.) involucradas en situaciones, problemáticas o propuestas de solución.",
    "Identifica y compara opiniones e intereses de diferentes actores involucrados en una situación problemática y establece relaciones entre esas posturas y posibles soluciones.",
    "Reconoce algunos conceptos básicos de las ciencias sociales.",
    "Identifica supuestos y usos de algunos modelos conceptuales.",
    "Relaciona contextos históricos y/o geográficos con fuentes, situaciones y prácticas sociales.",
    "Valora la información contenida en una fuente y reconoce sus alcances.",
  ];

  const socialesAvanzado = [
    "Conoce los procedimientos de reforma a la Constitución Política de Colombia, los mecanismos de participación ciudadana y las funciones de los organismos de control.",
    "Compara enunciados o argumentos, así como intereses y posiciones de actores en contextos en los que se discuten situaciones problemáticas o sus alternativas de solución.",
    "Relaciona propuestas de solución a un problema con su contexto de implementación, o con sus posibles impactos en ciertas dimensiones (económicas, políticas, culturales, ambientales, etc.).",
    "Entiende problemáticas, eventos o procesos sociales a partir del uso de conceptos básicos de las ciencias sociales, o a partir de contextos históricos y/o geográficos.",
    "Analiza fuentes (primarias y secundarias) para valorar inferencias o identificar intenciones, características de los actores involucrados y contextos en los que se ubican dichas fuentes.",
    "Establece relaciones entre modelos conceptuales y fuentes que los abordan o decisiones sociales que los aplican.",
  ];

  const naturalesInsuficiente = [
    "Posiblemente alcanza a reconocer información explícita, presentada de manera ordenada en tablas o gráficas, con un lenguaje cotidiano y que implica la lectura de una sola variable independiente. Por lo tanto, estos estudiantes demuestran un insuficiente desarrollo de la competencia Indagación definida en el marco teórico de la prueba.",
  ];

  const naturalesMinimo = [
    "Identifica patrones y características a partir de información presentada en textos, gráficas y tablas.",
    "Relaciona esquemas con nociones básicas del conocimiento científico.",
    "Establece predicciones a partir de datos presentados en tablas, gráficas y esquemas en donde se presentan patrones claramente crecientes o decrecientes.",
    "Ordena datos e información en gráficas y tablas.",
  ];

  const naturalesSatisfactorio = [
    "Establece relaciones de causa-efecto usando información no suministrada.",
    "Interpreta gráficas, tablas y modelos para hacer predicciones.",
    "Establece relaciones entre conceptos, leyes y teorías científicas con diseños experimentales y sus resultados.",
    "Diferencia entre evidencias y conclusiones.",
    "Plantea hipótesis basadas en evidencias.",
    "Relaciona variables para explicar algunos fenómenos naturales.",
  ];

  const naturalesAvanzado = [
    "Plantea preguntas de investigación desde las ciencias naturales a partir de un contexto determinado.",
    "Establece conclusiones derivadas de una investigación.",
    "Contrasta modelos de las ciencias naturales con fenómenos cotidianos.",
    "Resuelve situaciones problema haciendo uso de conceptos, leyes y teorías de las ciencias naturales.",
    "Comunica resultados de procesos de investigación científica.",
    "Analiza fenómenos naturales con base en los procedimientos propios de la investigación científica.",
  ];

  const inglesA = [
    "No supera las preguntas de menor complejidad de la prueba.",
  ];

  const inglesA1 = [
    "El estudiante es capaz de comprender y utilizar expresiones cotidianas de uso muy frecuente, así como frases sencillas destinadas a satisfacer necesidades inmediatas.",
    "Puede presentarse a sí mismo y a otros, pedir y dar información personal básica sobre su domicilio, sus pertenencias y las personas que conoce.",
    "Puede relacionarse de forma elemental con su interlocutor siempre que este hable despacio y con claridad y esté dispuesto a cooperar.",
  ];

  const inglesA2 = [
    "El estudiante es capaz de comprender frases y expresiones de uso frecuente relacionadas con áreas de experiencia que le son especialmente relevantes (información básica sobre sí mismo y su familia, compras, lugares de interés, ocupaciones, etc.).",
    "Sabe comunicarse a la hora de llevar a cabo tareas simples y cotidianas que no requieran más que intercambios sencillos y directos de información sobre cuestiones que le son conocidas o habituales.",
    "Sabe describir en términos sencillos aspectos de su pasado y su entorno, así como cuestiones relacionadas con sus necesidades inmediatas.",
  ];

  const inglesB1 = [
    "Comprender los puntos principales de textos claros y en lengua estándar si tratan sobre cuestiones que le son conocidas, ya sea en situaciones de trabajo, de estudio o de ocio.",
    "Sabe desenvolverse en la mayor parte de las situaciones que pueden surgir durante un viaje por zonas donde se utiliza la lengua.",
    "Es capaz de producir textos sencillos y coherentes sobre temas que le son familiares o en los que tiene un interés personal.",
    "Puede describir experiencias, acontecimientos, deseos y aspiraciones, así como justificar brevemente sus opiniones o explicar sus planes.",
  ];

  const inglesB = ["Supera las preguntas de mayor complejidad de la prueba."];

  return (
    <>
      {modalResultado && (
        <div className={styles.overlay}>
          <div className={styles.modal} ref={modalRef}>
            <div className={styles.contenedorBoton}>
              <button
                type="button"
                className={styles.closeButton}
                onClick={handleModalResultado}
              >
                <img src={cerrarImg} className={styles.icono} />
              </button>
            </div>
            <div className={styles.content}>
              <div className={styles.encabezado}>
                <div>
                  <div className={styles.areaimg}>
                    <div className={styles.contenedorIcono}>
                      {/* Mostrar icono según el área */}
                      {area === "Matemáticas" && (
                        <img src={matematicasImg} className={styles.iconos} />
                      )}
                      {area === "Lectura Critica" && (
                        <img src={lecturaImg} className={styles.iconos} />
                      )}
                      {area === "Sociales" && (
                        <img src={socialesImg} className={styles.iconos} />
                      )}
                      {area === "Naturales" && (
                        <img src={naturalesImg} className={styles.iconos} />
                      )}
                      {area === "Ingles" && (
                        <img src={inglesImg} className={styles.iconos} />
                      )}
                    </div>
                    <h1>{area}</h1>
                  </div>
                  <div className={styles.puntajeArea}>
                    <h2>Puntaje:</h2>
                    <h2 className={styles.resultadoArea}>
                      {puntaje}/100
                    </h2>
                  </div>
                  <div className={styles.posicionContainer}>
                    <p>Posición en esta prueba:</p>
                    <h4 className={styles.posicion}>1</h4>
                  </div>
                </div>

                <div>
                  {(nivel === "Insuficiente" || nivel === "-A") && (
                    <div className={styles.contenedorImagen}>
                      <img
                        src={nivelInsuficienteImg}
                        className={styles.imagenNivel}
                      />
                      <h2>{nivel}</h2>
                    </div>
                  )}
                  {(nivel === "Mínimo" || nivel === "A1") && (
                    <div className={styles.contenedorImagen}>
                      <img
                        src={nivelMininimoImg}
                        className={styles.imagenNivel}
                      />
                      <h2>{nivel}</h2>
                    </div>
                  )}
                  {(nivel === "Satisfactorio" ||
                    nivel === "A2" ||
                    nivel === "B1") && (
                    <div className={styles.contenedorImagen}>
                      <img
                        src={nivelSatisfactorioImg}
                        className={styles.imagenNivel}
                      />
                      <h2>{nivel}</h2>
                    </div>
                  )}
                  {(nivel === "Avanzado" || nivel === "B+") && (
                    <div className={styles.contenedorImagen}>
                      <img
                        src={nivelAvanzadoImg}
                        className={styles.imagenNivel}
                      />
                      <h2>{nivel}</h2>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.contenedorNivel}>
                <h3 className={styles.tituloNivel}>
                  Habilidades alcanzadas en esta prueba:
                </h3>
                <div>
                  {area === "Matemáticas" && (
                    <>
                      <h3 className={styles.tituloNivel}>
                        ({nivel} - {area}
                        ):
                      </h3>
                      <ul className={styles.listaHabilidades}>
                        {nivel === "Insuficiente" &&
                          matematicasInsuficiente.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "Mínimo" &&
                          matematicasMinimo.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "Satisfactorio" &&
                          matematicasSatisfactorio.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "Avanzado" &&
                          matematicasAvanzado.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                      </ul>
                    </>
                  )}

                  {area === "Lectura Critica" && (
                    <>
                      <h3 className={styles.tituloNivel}>
                        ({nivel} - {area}
                        ):
                      </h3>
                      <ul className={styles.listaHabilidades}>
                        {nivel === "Insuficiente" &&
                          lecturaInsuficiente.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "Mínimo" &&
                          lecturaMinimo.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "Satisfactorio" &&
                          lecturaSatisfactorio.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "Avanzado" &&
                          lecturaAvanzado.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                      </ul>
                    </>
                  )}

                  {area === "Sociales" && (
                    <>
                      <h3 className={styles.tituloNivel}>
                        ({nivel} - {area}
                        ):
                      </h3>
                      <ul className={styles.listaHabilidades}>
                        {nivel === "Insuficiente" &&
                          socialesInsufuciente.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "Mínimo" &&
                          socialesMinimo.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "Satisfactorio" &&
                          socialesSatisfactorio.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "Avanzado" &&
                          socialesAvanzado.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                      </ul>
                    </>
                  )}
                  {area === "Naturales" && (
                    <>
                      <h3 className={styles.tituloNivel}>
                        ({nivel} - {area}
                        ):
                      </h3>
                      <ul className={styles.listaHabilidades}>
                        {nivel === "Insuficiente" &&
                          naturalesInsuficiente.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "Mínimo" &&
                          naturalesMinimo.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "Satisfactorio" &&
                          naturalesSatisfactorio.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "Avanzado" &&
                          naturalesAvanzado.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                      </ul>
                    </>
                  )}

                  {area === "Ingles" && (
                    <>
                      <h3 className={styles.tituloNivel}>
                        ({nivel} - {area}
                        ):
                      </h3>
                      <ul className={styles.listaHabilidades}>
                        {nivel === "-A" &&
                          inglesA.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "A1" &&
                          inglesA1.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "A2" &&
                          inglesA2.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "B1" &&
                          inglesB1.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                        {nivel === "B+" &&
                          inglesB.map((habilidad, index) => (
                            <li key={index}>{habilidad}</li>
                          ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDetallesResultados;
