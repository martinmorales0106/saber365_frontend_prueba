import { useEffect, useState } from "react";
import styles from "./MotivacionDelDia.module.css";

const MotivacionDelDia = () => {
  const tips = [
    "🎯 Establece metas pequeñas cada día. ¡Los logros constantes generan confianza!",
    "📚 Dedica al menos 25 minutos diarios al repaso. La constancia es la clave.",
    "📝 Haz simulacros como si fueran reales. Te ayudan a mejorar tu enfoque.",
    "🔄 Repasa lo que aprendiste ayer antes de comenzar algo nuevo.",
    "💡 Usa colores o mapas mentales para recordar mejor los conceptos.",
    "📖 Lee en voz alta para reforzar la memoria auditiva.",
    "🧩 Divide temas complejos en partes pequeñas. Paso a paso se llega más lejos.",
    "🧠 Resume con tus propias palabras lo que estudias.",
    "✍️ Crea preguntas tipo examen mientras estudias.",
    "🕵️ Estudia como si fueras a enseñar el tema a otra persona.",
    "📅 Planifica tu semana de estudio cada domingo.",
    "🛌 Respeta tus horas de sueño. Dormir también es estudiar.",
    "🌿 Estudia en un espacio limpio y sin distracciones.",
    "📵 Apaga notificaciones durante las sesiones de estudio.",
    "🤔 Haz pausas para reflexionar, no solo memorices.",
  ];

  const consejos = [
    "🧘 Respira profundo 3 veces antes de estudiar. Te ayuda a concentrarte mejor.",
    "☕ Evita cafeína excesiva. Dormir bien es más útil que estudiar cansado.",
    "🚶 Da un paseo corto antes de una sesión de estudio larga. Oxigena tu mente.",
    "🕒 Tómate 5 minutos de descanso por cada 25 de estudio. ¡Tu cerebro lo agradecerá!",
    "🎵 Escucha música relajante antes de empezar. Te ayuda a reducir la ansiedad.",
    "🧃 Mantente hidratado. Un cerebro con agua rinde mejor.",
    "📵 Aleja el celular o ponlo en modo avión mientras estudias.",
    "🎯 Define un objetivo claro para cada sesión de estudio.",
    "👀 Lee primero por encima antes de profundizar en el contenido.",
    "🛑 Si te sientes muy cansado, descansa. Estudiar agotado no sirve.",
    "🗂️ Crea fichas de repaso con preguntas y respuestas. ¡El aprendizaje activo es más efectivo!",
    "💬 Explica lo que estudias a otra persona. Refuerza tu comprensión.",
    "🔁 Revisa cada semana lo que viste los días anteriores.",
    "👂 Usa audiolibros o podcasts si estás cansado de leer.",
    "📊 Cambia de técnica si no te está funcionando la actual. Sé flexible.",
  ];

  const videos = [
    "https://youtu.be/uk0xNnEy90w",
    "https://youtu.be/EGYWvYVLGM0",
    "https://youtu.be/3vyRFj6Jjws",
    "https://youtu.be/e_-XTcJI0sc",
    "https://youtu.be/YGciKOjXdYM",
  ];

  const [tip, setTip] = useState("");
  const [consejo, setConsejo] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const hoy = new Date();
    const dayOfYear = Math.floor(
      (hoy - new Date(hoy.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    );

    const tipIndex = dayOfYear % tips.length;
    const consejoIndex = dayOfYear % consejos.length;
    const videoIndex = dayOfYear % videos.length;

    setTip(tips[tipIndex]);
    setConsejo(consejos[consejoIndex]);

    const originalUrl = videos[videoIndex];
    const embedUrl = originalUrl.includes("youtu.be")
      ? originalUrl.replace("youtu.be/", "www.youtube.com/embed/")
      : originalUrl;

    setVideoUrl(embedUrl);
  }, []);

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.tituloGeneral}>✨ Motivación y Tip del Día</h2>
      <div className={styles.contenido}>
        <div className={styles.tarjetaTexto}>
          <h3 className={styles.subtitulo}>📌 Tip del Día</h3>
          <p className={styles.texto}>{tip}</p>

          <h3 className={styles.subtitulo}>💬 Consejo de Estudio</h3>
          <p className={styles.texto}>{consejo}</p>
        </div>

        <div className={styles.tarjetaVideo}>
          <h3 className={styles.subtitulo}>🎥 Video Motivacional</h3>
          <p className={styles.descripcion}>
            Mira este video corto para inspirarte y mantenerte enfocado en tu
            objetivo.
          </p>
          <div className={styles.videoWrapper}>
            <iframe
              className={styles.video}
              src={videoUrl}
              title="Video motivacional"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivacionDelDia;
