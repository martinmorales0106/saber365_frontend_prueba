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
import ciudadanaImg from "../../assets/ciudadanaImg.png";

import { useEffect, useState, useRef } from "react";
import usePerfilUsuario from "../../hooks/usePerfiUsuario";

const ModalDetallesResultados = () => {
  const { modalResultado, handleModalResultado, resultadoArea } =
    usePerfilUsuario();
  const [area, setArea] = useState("");
  const [puntaje, setPuntaje] = useState("");
  const [nivel, setNivel] = useState("");
  const [puesto, setPuesto] = useState("");
  const [grado, setGrado] = useState("");
  const modalRef = useRef();

  console.log(resultadoArea);

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
    setPuesto(resultadoArea.puesto);
    setGrado(resultadoArea.grado);
  }, [resultadoArea]);

  // Nivels de desempeño
  // Lectura Crítica
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

  const lenguaje89Insuficiente = [
    "El estudiante promedio ubicado en este nivel no supera las preguntas de menor complejidad de la prueba.",
  ];

  const lenguaje89Minimo = [
    "Selecciona ideas y datos relevantes.",
    "Identifica el propósito, los temas y el mensaje principal.",
    "Relaciona información de partes del texto, para hacer conclusiones o deducir información.",
    "Identifica las causas o consecuencias de un fenómeno o situación problema, usando la información presentada en el texto.",
    "Categoriza información del texto, atendiendo a un saber previo sobre estructuras textuales y formas de organización textual.",
    "Identifica la voz que habla y la caracteriza de acuerdo con su participación y distancia con los hechos narrados.",
    "Identifica relaciones funcionales de contraste, comparación, temporalidad, ejemplificación o explicación, entre párrafos.",
    "Identifica palabras o expresiones que se pueden sustituir en el texto sin alterar el sentido de lo escrito.",
    "Relaciona códigos verbales y no verbales, para identificar el sentido de una expresión, palabra o gesto.",
    "Ubica el referente de una palabra, pronombre, nombre o sintagma dentro del texto.",
    "Identifica el uso de algunos marcadores textuales como: paréntesis, guiones, rayas, signos de admiración o signos de puntuación en la construcción del sentido de un párrafo o del texto en general.",
    "Identifica la función de una palabra o expresión dentro del contenido de un párrafo.",
    "Identifica la función que cumple un párrafo dentro del desarrollo del texto.",
  ];

  const lenguaje89Satisfactorio = [
    "Identifica el propósito del texto.",
    "Identifica los argumentos y contra argumentos expuestos.",
    "Relaciona información proveniente de diferentes partes del contenido del texto, para identificar las ideas que permiten sustentar una afirmación.",
    "Identifica los recursos utilizados en el texto para sustentar una idea.",
    "Reflexiona y hace valoraciones sobre el contenido del texto, relacionándolo con conocimientos procedentes de otras fuentes.",
    "Determina la pertinencia de información para la consecución de un propósito.",
    "Deduce información no explícita.",
    "Aplica categorías o conceptos para describir la estructura del texto y caracterizar personajes.",
    "Infiere contenidos ideológicos o culturales en los textos que lee.",
    "Identifica contenidos y estilos en un texto y los relaciona con información externa especializada, para situar el texto dentro de una tendencia literaria, época o periodo histórico.",
    "Relaciona códigos no verbales y códigos verbales para inferir el sentido o propósito no explícito de una expresión.",
    "Clasifica información, atendiendo a la función que cumple en el desarrollo del contenido.",
    "Identifica la funcionalidad del contenido de citas o referencias.",
    "Identifica los recursos retóricos utilizados en textos literarios.",
  ];

  const lenguaje89Avanzado = [
    "Identifica el propósito y la intención en textos de lenguaje figurado, de recursos expresivos y/o estilísticos.",
    "Evalúa la posición o perspectiva del autor frente al contenido del texto.",
    "Identifica la intención y funcionalidad de enunciados clave dentro del texto, en relación con el lector.",
    "Utiliza la información para interpretar nuevas situaciones o contenidos.",
    "Evalúa los matices de estilo, con respecto al efecto que buscan lograr en el lector.",
    "Identifica y explica el recurso retórico empleado por el autor en el ámbito del lenguaje literario.",
    "Identifica y caracteriza la estructura informativa del texto.",
    "Identifica y explica la relación que establecen los conectores en el proceso de argumentación de una idea.",
    "Relaciona información del texto con información sobre tendencias, épocas y escuelas literarias para caracterizar o evaluar el contenido o la forma del texto.",
  ];

  const lenguaje567Insuficiente = [
    "El estudiante promedio ubicado en este nivel no supera las preguntas de menor complejidad de la prueba.",
  ];

  const lenguaje567Minimo = [
    "Localiza e identifica datos explícitos y puntuales y reconstruye la información utilizando las mismas palabras o construyendo paráfrasis muy sencillas.",
    "Identifica las referencias hechas a partir de marcadores como pronombres y artículos.",
    "Identifica la función de un párrafo en el desarrollo del contenido.",
    "Identifica la función de temporalidad, orden y adición que cumplen algunos marcadores en una oración.",
    "Identifica el tema o la idea central y el propósito por sinonimia con el título o porque su contenido es muy cercano a sus saberes del mundo.",
    "Construye conclusiones y hace inferencias sencillas (incluyendo los casos de sinonimia conceptual) sobre partes del contenido y sobre el posible comportamiento del lector, siempre que el contenido haga alusión a valoraciones usuales y de reflexión cotidiana.",
    "Reconoce la estrategia textual que indica que una palabra o expresión tiene un sentido particular en el texto.",
  ];

  const lenguaje567Satisfactorio = [
    "Ubica información relevante en el desarrollo, discriminando entre datos muy similares.",
    "Identifica secuencias enumerativas, descriptivas o explicativas sencillas.",
    "Identifica el orden secuencial de los hechos, acciones o ideas tratados.",
    "Identifica la función que cumple un párrafo dentro del desarrollo del contenido para establecer relaciones de contraste, causa, efecto, temporalidad, adición, comparación, igualdad, etc. por referencia a conectores explícitos.",
    "Diferencia entre ideas principales y secundarias e identifica el tema o el planteamiento central y la intención del autor, aún cuando no aparezca explícita.",
    "Reconoce el alcance y profundidad con que se trata un tema.",
    "Deduce información implícita de partes o del texto global, relacionando la información del mismo con la que proviene de otras fuentes.",
    "Hace afirmaciones sobre el contenido principal.",
    "Identifica la función que cumplen palabras clave en la elaboración del sentido del texto.",
    "Identifica la función que cumplen algunos marcadores textuales (signos de admiración, comillas, paréntesis, guiones, etc.) en la estructura informativa del texto.",
    "Caracteriza al narrador atendiendo a la distancia que tiene con los hechos narrados.",
    "Caracteriza los personajes haciendo uso de información proveniente de diferentes partes del mismo.",
    "Identifica el medio de publicación adecuado atendiendo al contenido y a las características de los posibles lectores.",
  ];

  const lenguaje567Avanzado = [
    "Explica el propósito o la intención del autor cuando usa una determinada palabra o expresión.",
    "Ubica información en el texto para explicar ideas o dar cuenta de argumentos.",
    "Usa información del texto y otros conocimientos para delimitar significados de palabras o expresiones.",
    "Evalúa la adecuación del uso de ciertas palabras, expresiones o recursos retóricos.",
    "Identifica las funciones que cumplen los párrafos las secuencias de textos argumentativos.",
    "Ordena las secuencias argumentativas.",
    "Evalúa el contenido y la forma.",
  ];

  const lenguaje34Insuficiente = [
    "El estudiante promedio ubicado en este nivel no supera las preguntas de menor complejidad de la prueba.",
  ];

  const lenguaje34Minimo = [
    "Recupera información explícita del texto.",
    "Reconoce tipos de textos de uso cotidiano como cartas y noticias.",
    "Identifica la intención comunicativa de textos con referentes cotidianos.",
    "Identifica la palabra o frase que sintetiza una situación comunicativa simple (por ejemplo, el adjetivo que caracteriza a un personaje o una situación).",
  ];

  const lenguaje34Satisfactorio = [
    "Identifica elementos paratextuales (títulos, imágenes, notas a pie, epígrafes, etc.), marcas textuales (desde signos de puntuación hasta el uso de marcadores como corchetes, paréntesis, comillas, guiones etc.), secuencias de eventos, el portador textual y características de los personajes.",
    "Interpreta el lenguaje verbal y no verbal para lograr la comprensión global.",
    "Infiere el propósito del texto a partir de su contenido y del contexto social.",
  ];

  const lenguaje34Avanzado = [
    "Deduce a partir de información explícita.",
    "Identifica eventos y situaciones dentro de un texto para inferir relaciones temporales entre estos.",
    "Caracteriza personajes según las expresiones, acciones o situaciones presentadas en el texto.",
    "Compara textos de distinta tipología, incluidos textos mixtos (afiches o carteles), para diferenciar propósitos e intenciones.",
    "Comprende la coherencia global del texto tomando como base las referencias anafóricas y catafóricas, es decir, recurriendo a la información anterior o posterior al referente.",
    "Identifica los elementos narrativos del texto y las voces presentes en una narración.",
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

  const matematicas34Insuficiente = [
    "El estudiante promedio ubicado en este nivel no supera las preguntas de menor complejidad de la prueba.",
  ];

  const matematicas34Minimo = [
    "Establece equivalencias entre expresiones numéricas en situaciones que corresponden a estructuras aditivas.",
    "Compara y ordena objetos bidimensionales y tridimensionales de acuerdo con un atributo (tamaño, longitud o forma).",
    "Reconoce el dato que más se repite en un conjunto de datos.",
    "Reconoce eventos posibles e imposibles.",
    "Asigna un código numérico a un objeto y lo expresa de manera textual y simbólica.",
    "Localiza objetos de acuerdo con instrucciones referidas a posición y dirección.",
    "Reconoce congruencias entre figuras planas.",
    "Reconoce instrumentos que se utilizan para medir un atributo de un objeto o evento.",
    "Interpreta diagramas de barras y pictogramas sencillos.",
    "Enuncia las características que tienen en común los elementos de un conjunto de datos.",
    "Describe el patrón de una secuencia numérica.",
    "Resuelve problemas aditivos rutinarios que requieren una sola operación.",
    "Resuelve problemas de comparación a partir de la representación de datos y su frecuencia en una observación.",
    "Soluciona problemas de composición y descomposición de figuras planas utilizando propiedades geométricas.",
  ];

  const matematicas34Satisfactorio = [
    "Establece equivalencias entre suma y multiplicación.",
    "Verifica las características de paralelismo, perpendicularidad o cantidad de vértices de una figura plana o un sólido.",
    "Identifica el dato que reúne determinadas condiciones en un conjunto dado.",
    "Establece relaciones entre algunos términos no consecutivos en secuencias numéricas y geométricas.",
    "Concluye acerca de la posibilidad de ocurrencia de un evento aleatorio.",
    "Describe características de figuras semejantes y de figuras congruentes.",
    "Reconoce atributos medibles de una figura plana o de un sólido y establece una correspondencia con los instrumentos de medición apropiados.",
    "Organiza datos según un criterio de orden (ascendente o descendente).",
    "Usa los números para establecer el orden de los elementos en un conjunto.",
    "Localiza objetos en el plano de acuerdo con instrucciones de dirección, distancia y posición.",
    "Resuelve problemas con dos operaciones que requieren el uso de la adición para la composición o transformación.",
    "Resuelve problemas de medición de longitud y de superficie, mediante equivalencias entre unidades de medida.",
    "Resuelve problemas que requieren análisis de datos presentados en diferentes formas (listas, tablas, gráficos).",
    "Soluciona problemas rutinarios que requieren la multiplicación como adición repetida de una misma cantidad.",
    "Construye figuras planas a partir de información parcial sobre ellas.",
    "Estima la posibilidad de ocurrencia de eventos simples.",
  ];

  const matematicas34Avanzado = [
    "Establece conjeturas acerca de regularidades en contextos geométricos y numéricos.",
    "Reconoce cuándo un número es múltiplo de otro en situaciones de reparto o medición.",
    "Descompone cifras, representadas pictóricamente, en unidades, decenas y centenas.",
    "Compara objetos tridimensionales según sus diferencias y semejanzas.",
    "Determina medidas de tiempo a partir de patrones estandarizados.",
    "Describe tendencias (aumento o disminución) a partir de un conjunto de datos.",
    "Establece correspondencias entre íconos o textos que representan cantidad.",
    "Representa gráfica o simbólicamente fracciones comunes.",
    "Usa el número como ordinal, para relacionarlo con la posición de un elemento cuando se usan representaciones gráficas.",
    "Reconoce que el volumen, la capacidad y la masa son magnitudes asociadas a figuras tridimensionales.",
    "Establece correspondencias entre diferentes representaciones de un mismo conjunto de datos.",
    "Interpreta condiciones necesarias para solucionar un problema que requiere estructuras aditivas para la transformación y la comparación.",
    "Determina una medida de superficie con un patrón estandarizado.",
    "Identifica condiciones necesarias para que un polígono determinado pueda construirse.",
  ];

  const matematicas567Insuficiente = [
    "El estudiante promedio ubicado en este nivel no supera las preguntas de menor complejidad de la prueba.",
  ];

  const matematicas567Minimo = [
    "Reconoce el patrón de variación de una secuencia.",
    "Representa algunas relaciones de dependencia a través de tablas.",
    "Establece equivalencias numéricas.",
    "Asocia desarrollos planos con los respectivos sólidos.",
    "Hace clasificaciones elementales de figuras planas.",
    "Descompone en regiones parciales figuras planas y sólidos.",
    "Reconoce la congruencia, o no, entre dos figuras geométricas.",
    "Establece relaciones de orden e identifica algunas propiedades de los números naturales.",
    "Expresa simbólicamente algunas operaciones a partir de un enunciado gráfico o verbal.",
    "Reconoce y utiliza el plano cartesiano.",
    "Asocia referencias de objetos reales a medidas convencionales.",
    "Identifica atributos medibles de figuras u objetos.",
    "Organiza y clasifica información estadística.",
    "Formula y resuelve problemas que involucran situaciones aditivas de combinación, comparación e igualación.",
    "Formula y resuelve problemas que involucran situaciones multiplicativas simples.",
    "Hace recubrimientos y descompone una superficie para determinar áreas de figuras planas.",
  ];

  const matematicas567Satisfactorio = [
    "Usa ejemplos y contraejemplos para determinar la validez de propiedades y relaciones numéricas.",
    "Establece propiedades no explícitas en algunas figuras planas.",
    "Describe algunas transformaciones en el plano cartesiano.",
    "Compara figuras para intuir relaciones de semejanza entre ellas.",
    "Reconoce diferentes maneras de representar una fracción propia en relaciones parte-todo.",
    "Identifica patrones y relaciones numéricas.",
    "Modela situaciones de dependencia cuando existe relación de proporcionalidad directa entre dos magnitudes.",
    "Diferencia y calcula medidas de distintas magnitudes.",
    "Establece relaciones entre distintas formas de representación de datos.",
    "Formula y resuelve situaciones problema correspondientes a la estructura aditiva y multiplicativa de los números naturales.",
    "Resuelve problemas que requieren, para su solución, relacionar diferentes formas de representación de datos.",
    "Calcula algunas medidas de tendencia central, en conjuntos discretos, para solucionar problemas.",
    "Estima la probabilidad de un evento para resolver problemas en contextos de juego o eventos cotidianos.",
    "Usa representaciones geométricas de números figurados.",
  ];

  const matematicas567Avanzado = [
    "Establece por qué un ejemplo es pertinente a una propiedad enunciada.",
    "Describe las características de una figura plana a partir de su ilustración.",
    "Clasifica sólidos y figuras planas de acuerdo con sus propiedades.",
    "Reconoce las propiedades que son dejadas invariantes cuando se aplica una transformación en el plano.",
    "Compara figuras planas a partir de sus características explícitas y algunas no explícitas.",
    "Genera nueva información a partir de distintas representaciones de un conjunto de datos.",
    "Reconoce el número total de arreglos posibles en problemas sencillos de combinación.",
    "Interpreta el grado de probabilidad de un evento aleatorio.",
    "Diferencia las propiedades del número en relación con su contexto de uso.",
    "Identifica propiedades no convencionales de las operaciones.",
    "Establece relaciones entre diferentes unidades de medida.",
    "Compara conjuntos de datos relacionados con énfasis en cómo los datos se distribuyen.",
    "Asigna a la posibilidad de ocurrencia de un evento una medida relacionada con la posibilidad de ocurrencia de otro evento.",
    "Da significado y utiliza la fracción como operador.",
    "Reconoce algunos procedimientos para calcular la medida de atributos de figuras u objetos de acuerdo con las dimensiones iniciales.",
    "Enuncia características de un conjunto de datos a partir de algunas medidas de tendencia central.",
  ];

  const matematicas89Insuficiente = [
    "El estudiante promedio ubicado en este nivel no supera las preguntas de menor complejidad de la prueba.",
  ];

  const matematicas89Minimo = [
    "Predice patrones de variación en situaciones que presentan relaciones de proporcionalidad.",
    "Establece conjeturas a partir de representaciones gráficas de algunas funciones.",
    "Utiliza algunas propiedades de los números racionales.",
    "Identifica algunos movimientos rígidos en el plano.",
    "Clasifica figuras planas y tridimensionales de acuerdo con sus propiedades.",
    "Justifica algunos procedimientos para calcular áreas y volúmenes.",
    "Reconoce regularidades en fenómenos y eventos aleatorios.",
    "Reconoce algunas relaciones funcionales representadas gráficamente.",
    "Construye tablas a partir de expresiones algebraicas sencillas.",
    "Usa lenguaje apropiado para describir diferentes transformaciones.",
    "Establece relaciones entre distintas magnitudes.",
    "Caracteriza figuras planas y algunos sólidos a partir de su ubicación en el plano cartesiano.",
    "Establece y explica relaciones entre dimensionalidad y unidades de medida.",
    "Traduce entre diferentes formas de representación de datos.",
    "Modela y describe fenómenos de las ciencias sociales o naturales usando gráficas estadísticas.",
    "Determina si una operación es pertinente a una situación problema planteada.",
    "Utiliza diferentes estrategias para solucionar un problema aditivo o multiplicativo.",
    "Utiliza relaciones y determinadas propiedades geométricas para resolver problemas de medición.",
    "Estima la medida de un atributo a partir de un patrón de medida.",
    "Usa informaciones presentadas en tablas y diagramas de barras para solucionar problemas en contextos cotidianos o de otras áreas.",
    "Interpreta algunas medidas de tendencia central en situaciones problema sencillas.",
  ];

  const matematicas89Satisfactorio = [
    "Utiliza ecuaciones para solucionar situaciones problema.",
    "Encuentra relaciones o propiedades que determinan la formación de secuencias numéricas.",
    "Analiza situaciones modeladas a través de funciones lineales o cuadráticas.",
    "Establece conjeturas sobre propiedades y relaciones numéricas convencionales.",
    "Justifica conclusiones sobre varias propiedades de las figuras planas utilizando ejemplos.",
    "Reconoce algunos criterios de semejanza y congruencia.",
    "Pasa de una representación bidimensional a una tridimensional y viceversa.",
    "Establece comparaciones entre diferentes desarrollos planos para hallar medidas.",
    "Describe características de una figura luego de aplicar un movimiento o transformación.",
    "Utiliza el lenguaje verbal y la representación gráfica para modelar situaciones problema.",
    "Establece relaciones entre expresiones numéricas y expresiones algebraicas.",
    "Identifica objetos tridimensionales de acuerdo con sus características.",
    "Identifica la posibilidad o imposibilidad de ocurrencia de un evento según las condiciones del contexto establecido (experimento aleatorio, tablas de frecuencia, gráficos, etc.).",
    "Selecciona la información relevante a partir de una representación de un conjunto de datos.",
    "Utiliza las propiedades de la potenciación, radicación y/o logaritmación para solucionar un problema.",
    "Da significado, en un contexto, a la solución de una ecuación.",
    "Utiliza distintas unidades de medida para resolver problemas de medición.",
    "Usa informaciones presentadas en diagramas circulares para solucionar problemas en contextos cotidianos o de otras áreas.",
    "Formula y comprueba conjeturas sobre el comportamiento de fenómenos aleatorios sencillos.",
  ];

  const matematicas89Avanzado = [
    "Encuentra las relaciones o propiedades que determinan la formación de secuencias numéricas.",
    "Analiza en representaciones gráficas cartesianas comportamientos de cambio de algunas funciones.",
    "Determina y justifica el valor de verdad de algunos enunciados en contextos numéricos y geométricos.",
    "Usa definiciones o criterios de semejanza para explicar situaciones.",
    "Utiliza la descomposición de figuras planas o sólidos para determinar el área o el volumen de figuras y cuerpos.",
    "Describe características de una figura luego de aplicar varios movimientos o transformaciones.",
    "Utiliza algunas técnicas de conteo para asignar probabilidad a eventos simples.",
    "Establece relaciones de comparación entre diferentes gráficas.",
    "Reconoce y aplica varias transformaciones a figuras planas en el plano cartesiano.",
    "Reconoce términos generales o patrones en sucesiones.",
    "Establece relaciones entre las características de las figuras y sus atributos mensurables.",
    "Compara e interpreta datos provenientes de diversas fuentes.",
    "Identifica formas de representación pertinentes a la situación (histograma, circular, etc.) a partir de un conjunto de datos.",
    "Resuelve problemas que requieran la solución de sistemas de ecuaciones lineales.",
    "Usa diferentes estrategias para determinar medidas de superficies y volúmenes.",
    "Explica la pertinencia o no de la solución de un problema de cálculo de área o volumen de acuerdo con las condiciones de la situación.",
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

  const ciudadana567Insuficiente = [
    "El estudiante clasificado en este nivel no supera las preguntas de menor complejidad de la prueba.",
  ];

  const ciudadana567Minimo = [
    "Reconoce situaciones en las que se protegen o vulneran los derechos de los niños.",
    "Reconoce algunas instituciones del Estado que promueven y defienden los derechos fundamentales.",
    "Identifica algunos mecanismos que garantizan y promueven la participación democrática en el contexto escolar.",
    "Reconoce algunas de las funciones del gobierno escolar.",
    "Reconoce la importancia de las normas para la convivencia en el contexto familiar y escolar.",
    "Identifica, en un conflicto, los actores involucrados y sus puntos de vista.",
  ];

  const ciudadana567Satisfactorio = [
    "Reconoce que en una situación dada pueden presentarse diferentes argumentos o puntos de vista.",
    "Relaciona diferentes argumentos presentados en una situación.",
    "Identifica enunciados que implican rechazo o discriminación.",
    "Reconoce los mecanismos de regulación que establece la Constitución para la defensa de los principios fundamentales que consagra.",
    "Reconoce figuras de autoridad local y regional y el alcance de sus funciones.",
    "Identifica situaciones de discriminación o vulneración de derechos.",
    "Identifica un conflicto en situaciones de interacción social.",
    "Compara diferentes perspectivas de los actores involucrados en una situación.",
    "Reconoce las posibles causas y soluciones de un conflicto.",
    "Identifica los intereses de diferentes actores involucrados en una situación de conflicto.",
    "Reconoce la función, la estructura y los estamentos del gobierno escolar.",
  ];

  const ciudadana567Avanzado = [
    "Evalúa la solidez de un discurso y reconoce la intención de este.",
    "Reconoce en un discurso los prejuicios y evalúa las implicaciones que estos puedan tener en una situación dada.",
    "Conoce la organización del Estado, las instituciones de las ramas del poder político y las funciones básicas de los servidores públicos.",
    "Conoce los estamentos del gobierno escolar y las funciones de sus miembros.",
    "Comprende que es deber del Estado proteger los derechos de las diversas comunidades étnicas y culturales.",
    "Identifica figuras de autoridad y el alcance de sus funciones en diferentes contextos y niveles (familiar, escolar, local, regional y nacional).",
    "Reconoce que las diferencias de pensamiento, ideología o roles sociales generan diversos argumentos, posiciones y actitudes.",
    "Analiza diferentes posturas e intereses en situaciones cotidianas.",
    "Comprende la perspectiva de diferentes actores ante una situación.",
    "Identifica, relaciona y plantea soluciones frente a situaciones que se presentan en diferentes contextos.",
    "Analiza el efecto de una posible solución de un conflicto.",
    "Prevé los posibles efectos de las acciones de quienes interactúan en un conflicto.",
    "Identifica las diferentes dimensiones que componen un conflicto en diversos escenarios (escolar, ecológico, social, político).",
    "Analiza las razones que generan situaciones problemáticas.",
  ];

  const ciudadania89Insuficiente = [
    "El estudiante promedio ubicado en este nivel no supera las preguntas de menor complejidad de la prueba.",
  ];

  const ciudadania89Minimo = [
    "Reconoce las funciones y jerarquías de quienes integran los grupos a los que pertenece e identifica abusos de autoridad.",
    "Identifica los mecanismos legales existentes para dar solución a situaciones que lo afectan como individuo o como integrante de un grupo.",
    "Reconoce en situaciones cotidianas dadas, la presencia de un conflicto.",
    "Conoce mecanismos de mediación y conciliación frente a una situación conflictiva cotidiana.",
    "Reconoce las perspectivas de diferentes situaciones sociales.",
    "Reconoce la normatividad que rige el funcionamiento de los grupos que integra (escuela, familia, nación).",
    "Reconoce algunos de los valores culturales propios de distintos grupos humanos.",
    "Identifica los diferentes tipos de derechos y deberes establecidos en la Constitución política de Colombia, los mecanismos de protección de los mismos, y los aplica en situaciones cotidianas.",
    "Identifica las minorías (étnicas, sexuales, religiosas) dentro de la sociedad y reconoce sus derechos.",
  ];

  const ciudadania89Satisfactorio = [
    "Conoce y sabe aplicar los principios fundamentales establecidos en la Constitución política de Colombia.",
    "Comprende las funciones de los organismos del poder público en contextos nacionales, locales y escolares.",
    "Reconoce los mecanismos de participación ciudadana establecidos en la Constitución política de Colombia y sabe cómo aplicarlos en situaciones concretas.",
    "Reconoce que nuestro país es una nación multiétnica y pluricultural, y respeta y valora la identidad y las diferencias.",
    "Analiza situaciones, por ejemplo del ámbito escolar, donde se confrontan posiciones e intereses y se involucran distintas dimensiones (por ejemplo, académicas, disciplinares, sociales, familiares, deportivas, recreativas y culturales).",
    "Cuestiona prejuicios o ideas preconcebidas en situaciones sociales o en discursos que generan discriminación o exclusión.",
  ];

  const ciudadania89Avanzado = [
    "Identifica de manera concreta los mecanismos de participación ciudadana establecidos en la Constitución política de Colombia y determina en qué circunstancias se aplican.",
    "Identifica prejuicios en diferentes contextos.",
    "Establece los diferentes argumentos que justifican una posición determinada.",
    "Reconoce los diferentes actores de una situación de conflicto y las posiciones de cada uno de ellos.",
    "Reconoce la influencia que tienen determinados elementos culturales en el comportamiento de diferentes grupos humanos.",
    "Expresa una posición crítica frente a situaciones de inequidad en los contextos en que se desenvuelve (familiar, escolar).",
    "Valora las implicaciones positivas o negativas que se derivan de una decisión tomada.",
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

  const naturales567Insuficiente = [
    "El estudiante promedio ubicado en este nivel no supera las preguntas de menor complejidad de la prueba.",
  ];

  const naturales567Minimo = [
    "Reconoce relaciones entre los elementos bióticos y abióticos en un ecosistema.",
    "Compara y clasifica seres vivos y materiales de su entorno cotidiano.",
    "Reconoce algunos usos cotidianos de la energía.",
    "Identifica prácticas cotidianas para el cuidado de la salud y del ambiente.",
    "Reconoce algunas diferencias y semejanzas de las características de los seres vivos.",
    "Relaciona algunos aspectos ambientales con el estilo de vida de diferentes comunidades.",
    "Representa algunos fenómenos naturales a partir de modelos sencillos.",
    "Identifica el uso de materiales a partir de algunas propiedades físicas.",
    "Explica las diferencias entre materiales a partir de algunas propiedades físicas.",
    "Explica las relaciones entre la fuerza y el movimiento en situaciones de su entorno cotidiano.",
    "Explica los efectos de la contaminación en la salud y el ambiente.",
    "Explica el funcionamiento e interacción de algunos órganos en los seres vivos.",
    "Elabora conclusiones a partir de información derivada de experimentos sencillos.",
    "Reconoce el formato adecuado para registrar datos de un experimento sencillo.",
    "Elige instrumentos adecuados para reunir datos.",
    "Interpreta datos, gráficas de barras e información que aparece explícita en diversas situaciones.",
  ];

  const naturales567Satisfactorio = [
    "Determina criterios propios de las ciencias naturales para clasificar seres vivos y materiales del entorno.",
    "Reconoce la estructura básica de circuitos eléctricos sencillos.",
    "Reconoce la función de las plantas, animales y otros organismos en una cadena alimentaria.",
    "Reconoce que existen diversas formas y fuentes de energía.",
    "Reconoce la importancia del ejercicio en la salud.",
    "Reconoce algunas formas de contaminación ambiental.",
    "Explica algunos métodos adecuados para separar mezclas a partir de las características de sus componentes.",
    "Explica el funcionamiento y las interacciones de algunos sistemas en los seres vivos.",
    "Explica las interacciones entre algunos materiales y el entorno a partir de algunas propiedades físicas y químicas.",
    "Explica, a partir de modelos sencillos, algunos fenómenos naturales.",
    "Relaciona y explica el uso de objetos y materiales con sus propiedades físicas.",
    "Explica la importancia de cada etapa en el desarrollo de un ser vivo.",
    "Predice y da razón del comportamiento de algunas sustancias frente a variaciones de temperatura.",
    "Interpreta y compara datos presentados en tablas y diferentes tipos de gráficas que involucran una o dos variables.",
    "Usa evidencias para identificar y explicar fenómenos naturales.",
    "Presenta de forma apropiada el proceso y los resultados de experimentos sencillos en ciencias naturales.",
    "Reconoce qué preguntas pueden ser contestadas a partir de la descripción de experimentos sencillos o de sus resultados.",
  ];

  const naturales567Avanzado = [
    "Diferencia materiales naturales de materiales fabricados por el hombre.",
    "Identifica prácticas para el manejo adecuado de basuras y aguas residuales.",
    "Reconoce los principales elementos, características y dinámica de la Tierra y el espacio.",
    "Identifica algunas máquinas simples en contextos cotidianos.",
    "Explica las ventajas de algunas adaptaciones de las plantas en los ecosistemas.",
    "Explica las funciones que cumplen las partes básicas de un circuito eléctrico.",
    "Diferencia hipótesis, conclusiones y evidencias en experimentos sencillos en ciencias naturales.",
    "Determina si los resultados de experimentos sencillos son suficientes para sacar conclusiones.",
    "Propone algunos diseños experimentales sencillos para contestar preguntas.",
    "Utiliza gráficas de barras para mostrar los datos derivados de experimentos sencillos.",
    "Reconoce y relaciona las variables presentes en un experimento para resolver preguntas de investigación en contextos cotidianos.",
    "Identifica y compara datos presentados en tablas y diferentes tipos de gráficas que involucran más de dos variables.",
  ];

  const naturales89Insuficiente = [
    "El estudiante promedio ubicado en este nivel no supera las preguntas de menor complejidad de la prueba.",
  ];

  const naturales89Minimo = [
    "Reconoce algunas adaptaciones de los organismos al entorno.",
    "Reconoce el uso de productos con determinado valor de pH en la vida cotidiana.",
    "Identifica el estado de las sustancias a partir de la organización y movimiento de sus partículas.",
    "Identifica qué sustancias pueden ser nocivas para la salud y cuáles deben ser usadas con precaución.",
    "Reconoce los efectos de la desaparición de organismos en el ecosistema.",
    "Establece comparaciones entre las propiedades físicas de diversos materiales.",
    "Identifica el movimiento de un cuerpo de acuerdo con las fuerzas que actúan sobre este.",
    "Explica las funciones que cumplen las partes básicas de un circuito eléctrico.",
    "Elabora explicaciones sencillas de eventos cotidianos utilizando el lenguaje propio de las ciencias.",
    "Explica el funcionamiento e interacción de algunos sistemas en los seres vivos.",
    "Interpreta y compara información explícita presentada en tablas y diferentes tipos de gráficas que involucran más de dos variables.",
    "Reconoce qué preguntas pueden ser contestadas a partir de los resultados de investigaciones científicas.",
    "Presenta de forma apropiada el proceso y los resultados de investigaciones científicas.",
    "Elige instrumentos adecuados para reunir datos o tomar mediciones.",
    "Representa datos e información de diversos contextos en tablas de datos, gráficas, modelos o figuras.",
  ];

  const naturales89Satisfactorio = [
    "Identifica el funcionamiento de los seres vivos en términos de su estructura y procesos.",
    "Reconoce prácticas para el cuidado de la salud personal y de la comunidad.",
    "Reconoce la estructura y función de las células en plantas y animales.",
    "Reconoce modelos adecuados para representar átomos, elementos, compuestos y mezclas.",
    "Establece relaciones entre materiales de diferente densidad, masa y volumen.",
    "Reconoce el comportamiento de materiales cuando se someten a cambios de temperatura.",
    "Reconoce que las enfermedades pueden ser de origen genético o infeccioso.",
    "Hace clasificaciones de organismos a partir de características comunes empleando el lenguaje propio de las ciencias.",
    "Reconoce algunas características físicas de los biomas.",
    "Identifica algunos fenómenos de las ondas en eventos cotidianos.",
    "Identifica cambios químicos y físicos en diferentes procesos cotidianos.",
    "Reconoce algunos fenómenos asociados con la dinámica de la corteza terrestre.",
    "Explica el funcionamiento de un circuito eléctrico y la interacción de sus componentes a partir de modelos.",
    "Elabora explicaciones para ciertos fenómenos cotidianos empleando el lenguaje propio de las ciencias.",
    "Explica algunas transformaciones de energía que ocurren en diversos procesos.",
    "Elabora conclusiones y predicciones a partir de información derivada de investigaciones científicas.",
    "Reconoce patrones y regularidades en los datos derivados de una investigación científica.",
    "Representa datos e información de diferentes contextos en tablas de datos, gráficas o figuras.",
    "Interpreta y relaciona información presentada en tablas y distintos tipos de gráficas con conceptos de las ciencias.",
  ];

  const naturales89Avanzado = [
    "Determina la función de una célula con un determinado organelo y su cantidad.",
    "Reconoce el cambio de pH de una solución cuando se le adiciona otra.",
    "Relaciona las variables que describen el comportamiento de los gases.",
    "Reconoce que la similitud entre organismos son el resultado de sus adaptaciones al medio.",
    "Representa las fuerzas que actúan sobre un cuerpo en reposo o en movimiento.",
    "Reconoce algunos mecanismos biológicos para regular el tamaño de las poblaciones.",
    "Propone soluciones a problemas ambientales analizando las características del ecosistema.",
    "Explica cómo se relacionan algunas características de los organismos con las condiciones del medio que habitan.",
    "Explica que las características de los organismos están determinadas genéticamente pero que se pueden modificar por la influencia del ambiente.",
    "Explica métodos adecuados para separar diversos tipos de mezclas a partir de las características de sus componentes.",
    "Explica el funcionamiento de los seres vivos a partir de las interacciones entre los órganos y sistemas.",
    "Explica fenómenos de reflexión, refracción e interferencia en la luz.",
    "Explica las características del movimiento rectilíneo que sigue un cuerpo a partir de las relaciones entre la velocidad, el tiempo y la distancia.",
    "Evalúa hipótesis a partir de las evidencias derivadas de investigaciones científicas.",
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
                      {area === "Lectura Crítica" && (
                        <img src={lecturaImg} className={styles.iconos} />
                      )}
                      {area === "Lenguaje" && (
                        <img src={lecturaImg} className={styles.iconos} />
                      )}
                      {area === "Sociales" && (
                        <img src={socialesImg} className={styles.iconos} />
                      )}
                      {area === "C. Ciudadanas" && (
                        <img src={ciudadanaImg} className={styles.iconos} />
                      )}
                      {area === "Naturales" && (
                        <img src={naturalesImg} className={styles.iconos} />
                      )}
                      {area === "Inglés" && (
                        <img src={inglesImg} className={styles.iconos} />
                      )}
                    </div>
                    <h1>{area}</h1>
                  </div>
                  <div className={styles.puntajeArea}>
                    <h2>Puntaje:</h2>
                    <h2 className={styles.resultadoArea}>{puntaje}/100</h2>
                  </div>
                  <div className={styles.posicionContainer}>
                    <p>Posición en esta prueba:</p>
                    <h4 className={styles.posicion}>{puesto}</h4>
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
                  {area === "Matemáticas" &&
                    (grado === "Undécimo" || grado === "Décimo") && (
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

                  {area === "Matemáticas" &&
                    (grado === "Noveno" || grado === "Octavo") && (
                      <>
                        <h3 className={styles.tituloNivel}>
                          ({nivel} - {area}
                          ):
                        </h3>
                        <ul className={styles.listaHabilidades}>
                          {nivel === "Insuficiente" &&
                            matematicas89Insuficiente.map(
                              (habilidad, index) => (
                                <li key={index}>{habilidad}</li>
                              )
                            )}
                          {nivel === "Mínimo" &&
                            matematicas89Minimo.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Satisfactorio" &&
                            matematicas89Satisfactorio.map(
                              (habilidad, index) => (
                                <li key={index}>{habilidad}</li>
                              )
                            )}
                          {nivel === "Avanzado" &&
                            matematicas89Avanzado.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                        </ul>
                      </>
                    )}

                  {area === "Matemáticas" &&
                    (grado === "Séptimo" ||
                      grado === "Sexto" ||
                      grado === "Quinto") && (
                      <>
                        <h3 className={styles.tituloNivel}>
                          ({nivel} - {area}
                          ):
                        </h3>
                        <ul className={styles.listaHabilidades}>
                          {nivel === "Insuficiente" &&
                            matematicas567Insuficiente.map(
                              (habilidad, index) => (
                                <li key={index}>{habilidad}</li>
                              )
                            )}
                          {nivel === "Mínimo" &&
                            matematicas567Minimo.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Satisfactorio" &&
                            matematicas567Satisfactorio.map(
                              (habilidad, index) => (
                                <li key={index}>{habilidad}</li>
                              )
                            )}
                          {nivel === "Avanzado" &&
                            matematicas567Avanzado.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                        </ul>
                      </>
                    )}

                  {area === "Matemáticas" &&
                    (grado === "Cuarto" || grado === "Tercero") && (
                      <>
                        <h3 className={styles.tituloNivel}>
                          ({nivel} - {area}
                          ):
                        </h3>
                        <ul className={styles.listaHabilidades}>
                          {nivel === "Insuficiente" &&
                            matematicas34Insuficiente.map(
                              (habilidad, index) => (
                                <li key={index}>{habilidad}</li>
                              )
                            )}
                          {nivel === "Mínimo" &&
                            matematicas34Minimo.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Satisfactorio" &&
                            matematicas34Satisfactorio.map(
                              (habilidad, index) => (
                                <li key={index}>{habilidad}</li>
                              )
                            )}
                          {nivel === "Avanzado" &&
                            matematicas34Avanzado.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                        </ul>
                      </>
                    )}

                  {area === "Lectura Crítica" &&
                    (grado === "Undécimo" || grado === "Décimo") && (
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

                  {area === "Lenguaje" &&
                    (grado === "Noveno" || grado === "Octavo") && (
                      <>
                        <h3 className={styles.tituloNivel}>
                          ({nivel} - {area}
                          ):
                        </h3>
                        <ul className={styles.listaHabilidades}>
                          {nivel === "Insuficiente" &&
                            lenguaje89Insuficiente.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Mínimo" &&
                            lenguaje89Minimo.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Satisfactorio" &&
                            lenguaje89Satisfactorio.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Avanzado" &&
                            lenguaje89Avanzado.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                        </ul>
                      </>
                    )}

                  {area === "Lenguaje" &&
                    (grado === "Séptimo" ||
                      grado === "Sexto" ||
                      grado === "Quinto") && (
                      <>
                        <h3 className={styles.tituloNivel}>
                          ({nivel} - {area}
                          ):
                        </h3>
                        <ul className={styles.listaHabilidades}>
                          {nivel === "Insuficiente" &&
                            lenguaje567Insuficiente.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Mínimo" &&
                            lenguaje567Minimo.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Satisfactorio" &&
                            lenguaje567Satisfactorio.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Avanzado" &&
                            lenguaje567Avanzado.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                        </ul>
                      </>
                    )}

                  {area === "Lenguaje" &&
                    (grado === "Cuarto" || grado === "Tercero") && (
                      <>
                        <h3 className={styles.tituloNivel}>
                          ({nivel} - {area}
                          ):
                        </h3>
                        <ul className={styles.listaHabilidades}>
                          {nivel === "Insuficiente" &&
                            lenguaje34Insuficiente.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Mínimo" &&
                            lenguaje34Minimo.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Satisfactorio" &&
                            lenguaje34Satisfactorio.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Avanzado" &&
                            lenguaje34Avanzado.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                        </ul>
                      </>
                    )}

                  {area === "Sociales" &&
                    (grado === "Undécimo" || grado === "Décimo") && (
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

                  {area === "C. Ciudadanas" &&
                    (grado === "Noveno" || grado === "Octavo") && (
                      <>
                        <h3 className={styles.tituloNivel}>
                          ({nivel} - {area}
                          ):
                        </h3>
                        <ul className={styles.listaHabilidades}>
                          {nivel === "Insuficiente" &&
                            ciudadania89Insuficiente.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Mínimo" &&
                            ciudadania89Minimo.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Satisfactorio" &&
                            ciudadania89Satisfactorio.map(
                              (habilidad, index) => (
                                <li key={index}>{habilidad}</li>
                              )
                            )}
                          {nivel === "Avanzado" &&
                            ciudadania89Avanzado.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                        </ul>
                      </>
                    )}

                  {area === "C. Ciudadanas" &&
                    (grado === "Séptimo" ||
                      grado === "Sexto" ||
                      grado === "Quinto") && (
                      <>
                        <h3 className={styles.tituloNivel}>
                          ({nivel} - {area}
                          ):
                        </h3>
                        <ul className={styles.listaHabilidades}>
                          {nivel === "Insuficiente" &&
                            ciudadana567Insuficiente.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Mínimo" &&
                            ciudadana567Minimo.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Satisfactorio" &&
                            ciudadana567Satisfactorio.map(
                              (habilidad, index) => (
                                <li key={index}>{habilidad}</li>
                              )
                            )}
                          {nivel === "Avanzado" &&
                            ciudadana567Avanzado.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                        </ul>
                      </>
                    )}

                  {area === "Naturales" &&
                    (grado === "Undécimo" || grado === "Décimo") && (
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

                  {area === "Naturales" &&
                    (grado === "Noveno" || grado === "Octavo") && (
                      <>
                        <h3 className={styles.tituloNivel}>
                          ({nivel} - {area}
                          ):
                        </h3>
                        <ul className={styles.listaHabilidades}>
                          {nivel === "Insuficiente" &&
                            naturales89Insuficiente.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Mínimo" &&
                            naturales89Minimo.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Satisfactorio" &&
                            naturales89Satisfactorio.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Avanzado" &&
                            naturales89Avanzado.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                        </ul>
                      </>
                    )}

                  {area === "Naturales" &&
                    (grado === "Séptimo" ||
                      grado === "Sexto" ||
                      grado === "Quinto") && (
                      <>
                        <h3 className={styles.tituloNivel}>
                          ({nivel} - {area}
                          ):
                        </h3>
                        <ul className={styles.listaHabilidades}>
                          {nivel === "Insuficiente" &&
                            naturales567Insuficiente.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Mínimo" &&
                            naturales567Minimo.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Satisfactorio" &&
                            naturales567Satisfactorio.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                          {nivel === "Avanzado" &&
                            naturales567Avanzado.map((habilidad, index) => (
                              <li key={index}>{habilidad}</li>
                            ))}
                        </ul>
                      </>
                    )}

                  {area === "Inglés" &&
                    (grado === "Undécimo" ||
                      grado === "Décimo" ||
                      grado === "Noveno") && (
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
