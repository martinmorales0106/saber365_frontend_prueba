import styles from "./ProgresoMaterias.module.css";
import PropTypes from "prop-types";

import matematicasImg from "../../../assets/matematicasImg.png";
import lecturaImg from "../../../assets/lecturaImg.png";
import socialesImg from "../../../assets/socialesImg.png";
import naturalesImg from "../../../assets/naturalesImg.png";
import inglesImg from "../../../assets/inglesImg.png";
import Boton from "../../Boton/Boton";
import Swal from "sweetalert2";

const getColor = (progreso) => {
  if (progreso >= 75) return styles.progresoAlto;
  if (progreso >= 60) return styles.progresoMedio;
  if (progreso >= 40) return styles.progresoBajo;
  return styles.progresoMuyBajo;
};

const getEtiqueta = (progreso) => {
  if (progreso >= 75) return "Excelente";
  if (progreso >= 60) return "En proceso";
  if (progreso >= 40) return "Debe mejorar";
  return "Crítico";
};

const getIcono = (progreso) => {
  if (progreso >= 75) return "✅";
  if (progreso >= 60) return "🟡";
  if (progreso >= 40) return "🟠";
  return "🔴";
};

const getImg = (nombre) => {
  if (nombre === "Matemáticas") return matematicasImg;
  if (nombre === "Naturales") return naturalesImg;
  if (nombre === "Sociales") return socialesImg;
  if (nombre === "Lectura Crítica") return lecturaImg;
  if (nombre === "Inglés") return inglesImg;
  return null;
};

const submitBoton = () => {
  Swal.fire({
    icon: "info",
    title: "Oops...",
    text: "Estamos trabajando para brindarte mas información!",
    didOpen: () => {
      const confirmButton = Swal.getConfirmButton();
      confirmButton.style.backgroundColor = "#0f3861";
      confirmButton.style.color = "#ffffff";
    },
  });
};

const recomendacionesPorMateria = {
  Naturales: [
    {
      rango: [0, 40],
      recomendacion:
        "Reconoce información suministrada en tablas, gráficas y esquemas de una sola variable independiente, y la asocia con nociones de los conceptos básicos (tiempo, posición, velocidad, imantación y filtración). ",
      temasClave: [
        "Relaciones entre seres vivos (interacciones básicas).",
        "Nociones de homeóstasis (regulación interna sencilla).",
        "Tiempo, posición y velocidad (movimiento rectilíneo uniforme).",
        "Fuerzas simples (empuje, tracción, gravedad).",
        "Propiedades físicas de la materia (color, estado, punto de ebullición, densidad).",
        "Métodos de separación de mezclas (filtración, decantación).",
        "Cambios de estado físico (fusión, solidificación, evaporación).",
        "Problemas ambientales básicos (contaminación, reciclaje, uso del agua).",
      ],
    },
    {
      rango: [41, 60],
      recomendacion:
        "Interrelaciona conceptos, leyes y teorías científicas con información presentada en diversos contextos, en los que intervienen dos o más variables, para hacer inferencias sobre una situación problema o un fenómeno natural.",
      temasClave: [
        "Herencia y genética básica (genes, alelos, genotipo/fenotipo, dominancia).",
        "Relaciones ecológicas complejas (redes tróficas, ciclos de materia, flujo de energía).",
        "Evolución y adaptación.",
        "Sistemas y órganos del cuerpo humano.",
        "Leyes del movimiento (1ª y 2ª Ley de Newton).",
        "Energía mecánica (cinética y potencial) y su transformación.",
        "Ondas (frecuencia, amplitud, longitud de onda).",
        "Leyes de la termodinámica (nociones básicas).",
        "Reacciones químicas (reactivos, productos, conservación de la masa).",
        "Tabla periódica (estructura y propiedades de los elementos).",
        "Tipos de enlaces químicos (iónico, covalente, metálico).",
        "Estequiometria básica.",
        "Análisis crítico de problemáticas globales (efecto invernadero, uso de transgénicos, contaminación).",
        "Evaluación de impacto científico-tecnológico en contextos reales (energías renovables, biotecnología).",
      ],
    },
    {
      rango: [61, 75],
      recomendacion:
        "usa conceptos, teorías o leyes en la solución de situaciones problema que involucran procedimientos, habilidades, conocimientos y un lenguaje propio de las ciencias naturales. ",
      temasClave: [
        "Biotecnología y genética molecular (ADN, ARN, síntesis de proteínas, manipulación genética, transgénicos).",
        "Evolución y selección natural con base en evidencia científica.",
        "Ecología avanzada: dinámica poblacional, factores limitantes, sucesión ecológica, ecosistemas y resiliencia ambiental.",
        "Homeóstasis y regulación fisiológica en seres vivos.",
        "Ley de conservación de la energía y su aplicación a sistemas físicos complejos.",
        "Electromagnetismo aplicado (ley de Faraday, campo magnético, inducción.",
        "Cinemática y dinámica en sistemas no lineales (movimiento parabólico, fricción, plano inclinado).",
        "Análisis de ondas en fenómenos reales (ej. sonido, luz, terremotos).",
        "Termoquímica (entalpía, calor de reacción, leyes de Hess).",
        "Cinética química y factores que afectan la velocidad de reacción.",
        "Equilibrio químico y principios de Le Chatelier.",
        "Química aplicada a problemáticas reales (agua potable, tratamiento de residuos, materiales biodegradables).",
        "Evaluación del impacto de desarrollos científicos en contextos locales y globales (nanotecnología, energía nuclear, biomedicina).",
        "nvestigación escolar sobre problemáticas locales (contaminación, salud, reciclaje).",
      ],
    },
    {
      rango: [76, 100],
      recomendacion: "🌟 ¡Excelente desempeño en Ciencias Naturales!",
      temasClave: [
        "Has alcanzado el nivel avanzado. Sigue explorando, cuestionando y aprendiendo. El conocimiento no tiene límites… ¡y tú tampoco!.",
      ],
    },
  ],
  Sociales: [
    {
      rango: [0, 40],
      recomendacion:
        "Reconoce deberes del Estado colombiano y situaciones de protección o vulneración de derechos en el marco del Estado Social de Derecho; identifica relaciones entre conductas de las personas y sus cosmovisiones; y reconoce las dimensiones presentes en una situación, problema, decisión tomada o propuesta de solución.",
      temasClave: [
        "Derechos fundamentales y deberes ciudadanos.",
        "Estado Social de Derecho en Colombia.",
        "Eventos históricos clave relacionados con derechos y ciudadanía.",
        "Relación entre el entorno geográfico y los procesos sociales.",
        "Cosmovisiones, diversidad cultural y su influencia en la conducta humana.",
        "Comprensión y contextualización de fuentes.",
        "Dimensiones de un problema social.",
      ],
    },
    {
      rango: [41, 60],
      recomendacion:
        "Identifica prejuicios o intenciones contenidos en una afirmación y reconoce las dimensiones e intereses involucrados en un problema o alternativa de solución. Así mismo, identifica algunos conceptos básicos de las ciencias sociales y modelos conceptuales, y valora y contextualiza la información presentada en una fuente.",
      temasClave: [
        "Intención y prejuicio en el discurso político y ciudadano.",
        "Intereses y posturas de actores sociales y políticos.",
        "Dimensiones de los problemas sociales y decisiones políticas.",
        "Comparación de contextos históricos.",
        "Reconocimiento de actores y modelos históricos.",
        "Relaciones entre territorio, sociedad y poder.",
        "Factores físicos y humanos que condicionan fenómenos sociales.",
        "Intereses económicos y consecuencias de políticas públicas.",
        "Modelos económicos básicos.",
        "Relación entre cosmovisión, identidad y práctica social.",
        "Prejuicios y estereotipos en la vida social.",
        "Conceptos fundantes y modelos básicos de análisis social.",
        "Análisis de fuentes y valoración crítica.",
      ],
    },
    {
      rango: [61, 75],
      recomendacion:
        "Conoce algunas disposiciones de la Constitución Política de Colombia que posibilitan la participación ciudadana y el control a los poderes públicos; analiza y compara enunciados, intereses y argumentos; y evalúa alternativas de solución a un problema. Analiza situaciones a partir de conceptos básicos de las ciencias sociales o de contextos históricos y/o geográficos. A su vez, relaciona fuentes y políticas con modelos conceptuales, y valora los contenidos de una fuente.",
      temasClave: [
        "Constitución Política de Colombia.",
        "Mecanismos de participación ciudadana.",
        "Organismos de control.",
        "Separación de poderes.",
        "Derechos y deberes fundamentales.",
        "Espacio geográfico y su organización.",
        "Dimensiones geográficas.",
        "Sostenibilidad y problemáticas ambientales.",
        "Desigualdades territoriales.",
        "Proceso de independencia y formación de la República.",
        "Violencia bipartidista y conflicto armado.",
        "Modernización del Estado y reformas.",
        "Ciudadanía en la historia.",
        "Modelos económicos.",
        "Indicadores económicos y sociales.",
        "Relaciones económicas globales.",
        "Conflictos de interés y relaciones de poder.",
        "Actores sociales y sus intereses.",
        "Diferencias entre argumentos, prejuicios, intenciones.",
        "Interpretación crítica de fuentes primarias y secundarias.",
        "Análisis de discursos y narrativas.",
      ],
    },
    {
      rango: [76, 100],
      recomendacion: "🌟¡Gran dominio en Sociales!",
      temasClave: [
        "Entiendes el mundo y tu rol en él. Sigue cuestionando y construyendo una ciudadanía informada y crítica.",
      ],
    },
  ],
  "Lectura Crítica": [
    {
      rango: [0, 40],
      recomendacion:
        "Comprende textos continuos y discontinuos de manera literal. Reconoce información explícita y la relaciona con el contexto. ",
      temasClave: [
        "Comprensión literal de textos.",
        "Estructura de textos (continuos y discontinuos).",
        "Relaciones básicas entre ideas (cohesión y coherencia).",
        "Fenómenos semánticos básicos: sinónimos y antónimos.",
        "Diferencia entre proposición y párrafo.",
        "Sentido local y global del texto.",
        "Intención comunicativa del autor.",
        "Relación entre textos: contraste, similitud y complementación.",
      ],
    },
    {
      rango: [41, 60],
      recomendacion:
        "Interpreta información de textos al inferir contenidos implícitos y reconocer estructuras, estrategias discursivas y juicios valorativos.",
      temasClave: [
        "Inferencia de información implícita.",
        "Jerarquización de la información.",
        "Relaciones intertextuales y lógicas.",
        "Reconocimiento de la intención comunicativa.",
        "Marcadores textuales y su función.",
        "Reconocimiento y función de figuras literarias.",
        "Uso del lenguaje en contexto.",
        "Análisis y síntesis de información.",
        "Estructura sintáctica en textos discontinuos.",
        "Evaluación de argumentos.",
      ],
    },
    {
      rango: [61, 75],
      recomendacion:
        "Reflexiona a partir de un texto sobre la visión de mundo del autor (costumbres, creencias, juicios, carácter ideológico-político y posturas éticas, entre otros). Asimismo, da cuenta de elementos paratextuales significativos presentes en el texto. Finalmente, valora y contrasta los elementos mencionados con la posición propia.",
      temasClave: [
        "Visión de mundo del autor.",
        "Contextualización histórica, cultural y social.",
        "Paratextos y su función interpretativa.",
        "Evaluación crítica del contenido y del discurso.",
        "Relación y contraste de textos.",
        "Análisis literario aplicado.",
        "Construcción de argumentos y toma de postura.",
        "Formulación de hipótesis de lectura.",
        "Solución de problemas interpretativos complejos.",
      ],
    },
    {
      rango: [76, 100],
      recomendacion: "🌟¡Lectura crítica impecable!",
      temasClave: [
        "Tu comprensión y análisis textual son de alto nivel (Avanzado). Lee más, piensa más… ¡vas por excelente camino!.",
      ],
    },
  ],
  Inglés: [
    {
      rango: [0, 40],
      recomendacion:
        "Comprender y usar expresiones cotidianas y frases básicas relacionadas con necesidades inmediatas. Debe poder interactuar de manera simple, especialmente si el interlocutor habla lento y claro.",
      temasClave: [
        "Saludar, presentarse e interactuar socialmente (Greetings & Introductions).",
        "Información personal básica (Personal Information).",
        "Vocabulario esencial (Essential Vocabulary).",
        "Verbo “to be” y estructuras básicas (Grammar Foundations).",
        "Pronombres personales (Subject Pronouns).",
        "Vocabulario de rutinas diarias y actividades comunes (Daily Routines).",
        "Comprensión de instrucciones y preguntas simples (Basic Listening & Reading Comprehension).",
        "Formación de frases simples (Simple Sentence Construction).",
        "Describir personas, objetos y lugares (Descriptions).",
        "Comprensión y uso del presente simple (Simple Present Tense).",
      ],
    },
    {
      rango: [41, 60],
      recomendacion:
        "Comprender y producir frases y expresiones comunes relacionadas con temas de relevancia personal. Debes poder intercambiar información básica sobre actividades cotidianas y describir su entorno y experiencias pasadas con frases simples.",
      temasClave: [
        "Temas personales ampliados (Extended Personal Information.",
        "Vida cotidiana y tareas comunes (Everyday Activities).",
        "Verbos en pasado (Simple Past Tense).",
        "Familia y relaciones personales (Family & Relationships.",
        "Lugares de interés y la ciudad (Places in Town & Directions).",
        "Expresiones de cantidad y frecuencia (Quantifiers & Frequency Adverbs).",
        "Comparativos y superlativos (Comparatives and Superlatives).",
        "Tiempo futuro básico (Going to & Will).",
        "Descripciones más detalladas (Describing People, Places & Things).",
        "Conectores y cohesión básica (Basic Discourse Markers).",
      ],
    },
    {
      rango: [61, 75],
      recomendacion:
        "Comprender ideas principales en textos orales y escritos sobre temas familiares. Interactuar con fluidez básica en contextos cotidianos, especialmente si ha tenido exposición previa a esas situaciones. Producir textos y discursos simples pero bien estructurados sobre intereses personales, experiencias, planes, opiniones y deseos.",
      temasClave: [
        "Comprensión global de textos (Reading for Gist and Details).",
        "Producción de párrafos y textos coherentes (Paragraph Writing & Coherence).",
        "Descripciones y narraciones (Descriptions & Storytelling).",
        "Opiniones y argumentación básica (Expressing Opinions and Preferences).",
        "Planes y predicciones (Talking about Future Plans).",
        "Vocabulario temático ampliado (Thematic Vocabulary Expansion).",
        "Interacción en viajes y situaciones reales (Functional Language in Real-life Situations).",
        "Verbos modales (Modals for Advice, Obligation and Permission).",
        "Condicionales básicos (First and Second Conditionals).",
        "Escucha activa con comprensión global (Listening for Main Ideas and Specific Information).",
      ],
    },
    {
      rango: [76, 100],
      recomendacion: "🌟¡Inglés sobresaliente!",
      temasClave: [
        "Tu nivel es destacado. Sigue practicando y expándete al mundo con confianza.",
      ],
    },
  ],
  Matemáticas: [
    {
      rango: [0, 40],
      recomendacion:
        "Hacer comparaciones y establecer relaciones entre los datos presentados, e identificar y extraer información local y global de manera directa. Lo anterior en contextos familiares o personales que involucran gráficas con escala explícita, cuadrícula o, por lo menos, líneas horizontales u otros formatos con poca información.",
      temasClave: [
        "Representación y lectura de datos en gráficos y tablas.",
        "Conceptos básicos de estadística descriptiva.",
        "Transformación entre representaciones (gráfica, tabla, verbal).",
        "Noción básica de probabilidad.",
        "Veracidad de afirmaciones a partir de datos.",
      ],
    },
    {
      rango: [41, 60],
      recomendacion:
        "Selecciona información, señala errores y hace distintos tipos de transformaciones y manipulaciones aritméticas y algebraicas sencillas; esto para enfrentarse a problemas que involucran el uso de conceptos de proporcionalidad, factores de conversión, áreas y desarrollos planos, en contextos laborales u ocupacionales, matemáticos o científicos, y comunitarios o sociales. ",
      temasClave: [
        "Proporcionalidad y razones.",
        "Interpretación y transformación de gráficas.",
        "Lectura de información en formatos no convencionales.",
        "Desarrollos de planos y reconocimiento de figuras tridimensionales.",
        "Probabilidad de eventos simples con diferente número de casos posibles.",
        "Resolución de problemas aritméticos en contextos aplicados.",
        "Perímetros, áreas y características de figuras geométricas básicas.",
        "Escalas y conversiones no convencionales.",
        "Justificación de afirmaciones con un argumento matemático.",
        "Álgebra elemental.",
      ],
    },
    {
      rango: [61, 75],
      recomendacion:
        "Resuelve problemas y justifica la veracidad o falsedad de afirmaciones que requieren el uso de conceptos de probabilidad, propiedades algebraicas, relaciones trigonométricas y características de funciones reales. Lo anterior, en contextos principalmente matemáticos o científicos abstractos. ",
      temasClave: [
        "Eventos dependientes y espacio muestral.",
        "Conteo avanzado: permutaciones.",
        "Modelación algebraica.",
        "Propiedades de las operaciones algebraicas.",
        "Relaciones trigonométricas básicas.",
        "Fenómenos variacionales y funciones reales.",
        "Representaciones auxiliares en la solución de problemas.",
        "Transformaciones con cálculos complejos (porcentajes encadenados, tasas, crecimiento compuesto).",
        "Análisis lógico de afirmaciones y validación con múltiples argumentos.",
      ],
    },
    {
      rango: [76, 100],
      recomendacion: "🌟¡Dominio total en Matemáticas!",
      temasClave: [
        "Tus habilidades numéricas están en otro nivel. Sigue resolviendo desafíos y superándote cada día.",
      ],
    },
  ],
  // Agrega otras materias con estructura similar...
};

const obtenerRecomendacion = (materia) => {
  const infoMateria = recomendacionesPorMateria[materia.nombre];
  if (!infoMateria) return null;

  for (let i = 0; i < infoMateria.length; i++) {
    const { rango, recomendacion, temasClave } = infoMateria[i];
    if (materia.progreso >= rango[0] && materia.progreso <= rango[1]) {
      return { recomendacion, temasClave };
    }
  }

  return null;
};

const enriquecerMaterias = (materias) => {
  return materias.map((materia) => {
    const extra = obtenerRecomendacion(materia);
    return {
      ...materia,
      ...extra,
    };
  });
};

const ProgresoMaterias = ({ materias }) => {
  console.log(materias);
  const materiasEnriquecidas = enriquecerMaterias(materias);

  return (
    <div className={styles.generalContainer}>
      <h2 className={styles.tituloGeneral}>📊 Progreso Académico</h2>
      <div className={styles.container}>
        <div className={styles.progresoContenedor}>
          <h2 className={styles.seccionTitulo}>📚 Tu Progreso por Área</h2>
          <p className={styles.descripcion}>
            Este progreso se basa en tu rendimiento en los simulacros. Revisa
            las áreas que más necesitas reforzar.
          </p>
          {materiasEnriquecidas.map((materia, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.header}>
                <span className={styles.nombre}>
                  {getIcono(materia.progreso)} {materia.nombre}
                </span>
                <span className={styles.porcentaje}>
                  {materia.progreso}%
                  <span className={styles.etiqueta}>
                    {" "}
                    - {getEtiqueta(materia.progreso)}
                  </span>
                </span>
              </div>
              <div className={styles.progressBarContainer}>
                <div
                  className={`${styles.progressBar} ${getColor(
                    materia.progreso
                  )}`}
                  style={{ width: `${materia.progreso}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.sugerenciasContenedor}>
          <h2 className={styles.seccionTitulo}>🛠️ Sugerencias y Recursos</h2>
          <p className={styles.descripcion}>
            Es importante revisar los contenidos adicionales y practicar para
            mejorar tu desempeño.
          </p>
          {materiasEnriquecidas.some((m) => m.progreso < 101) && (
            <div className={styles.sugerencias}>
              <h3>🔍 Áreas a reforzar:</h3>
              <ul>
                {materiasEnriquecidas
                  .filter((m) => m.progreso < 101)
                  .map((m, i) => (
                    <li key={i}>
                      <strong>{m.nombre}</strong>: {m.recomendacion}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
        {materiasEnriquecidas.some((m) => m.progreso < 100) && (
          <div className={styles.recursos2}>
            <h3>📖 Contenido recomendado por área</h3>
            <p className={styles.mensajeMotivacional}>
              Dedica tiempo a reforzar estos temas clave. ¡Tu esfuerzo marcará
              la diferencia y te llevará a un nivel superior!
            </p>
            <div className={styles.grid}>
              {materiasEnriquecidas
                .filter((m) => m.progreso < 100)
                .map((m, i) => (
                  <div key={i} className={styles.tarjeta}>
                    <div className={styles.contenedorImg}>
                      <img
                        src={getImg(m.nombre)}
                        alt={m.nombre}
                        className={styles.imagen}
                      />
                      <strong className={styles.nombre}>{m.nombre}</strong>
                    </div>
                    {m.temasClave && (
                      <>
                        <ul className={styles.temasClave}>
                          {m.temasClave.map((tema, j) => (
                            <li key={j}>
                              📌<span>{tema}</span>
                            </li>
                          ))}
                        </ul>
                        <div className={styles.boton}>
                          <Boton
                            text="Explorar"
                            onClick={submitBoton}
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ProgresoMaterias.propTypes = {
  materias: PropTypes.arrayOf(
    PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      progreso: PropTypes.number.isRequired,
      recomendacion: PropTypes.string, // contenido recomendado
    })
  ).isRequired,
};

export default ProgresoMaterias;
