import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import styles from "./CalendarioActividades.module.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const obtenerEventosGuardados = () => {
  const guardados = localStorage.getItem("eventosSaber");
  const eventos = guardados ? JSON.parse(guardados) : {};

  const eventosFijos = [
    {
      fecha: "2025-08-10",
      texto: "📘 Aplicación de examen de la Prueba Saber 11º Calendario A.",
      hora: "00:00",
      protegido: true,
    },
    {
      fecha: "2025-10-10",
      texto: "Resultados individuales de la Prueba Saber 11º Calendario A.",
      hora: "00:00",
      protegido: true,
    },
    {
      fecha: "2025-05-10",
      texto: "🔴 Simulacro 1 - Preparación",
      hora: "06:00",
      protegido: true,
    },
    {
      fecha: "2025-06-20",
      texto: "🔴 Simulacro 2 - Preparación",
      hora: "06:00",
      protegido: true,
    },
    {
      fecha: "2025-07-30",
      texto: "🔴 Simulacro 3 - Preparación",
      hora: "06:00",
      protegido: true,
    },
    {
      fecha: "2025-03-31",
      texto:
        "Inicia el Registro y recaudo ordinario de la Prueba Saber 11º Calendario A.",
      hora: "00:00",
      protegido: true,
    },
    {
      fecha: "2025-05-5",
      texto:
        "Inicia el Registro y recaudo extraordinario de la Prueba Saber 11º Calendario A.",
      hora: "00:00",
      protegido: true,
    },
    {
      fecha: "2025-04-30",
      texto:
        "Finaliza el Registro y recaudo ordinario de la Prueba Saber 11º Calendario A.",
      hora: "00:00",
      protegido: true,
    },
    {
      fecha: "2025-05-16",
      texto:
        "Finaliza el Registro y recaudo extraordinario de la Prueba Saber 11º Calendario A, Ojo: Ultimo plazo para pagar.",
      hora: "00:00",
      protegido: true,
    },
    {
      fecha: "2025-07-25",
      texto: "Citación para la Prueba Saber 11º Calendario A.",
      hora: "00:00",
      protegido: true,
    },
  ];

  eventosFijos.forEach(({ fecha, texto, hora, protegido }) => {
    if (!eventos[fecha]) {
      eventos[fecha] = [{ texto, hora, protegido }];
    } else {
      const yaExiste = eventos[fecha].some((ev) => ev.texto === texto);
      if (!yaExiste) {
        eventos[fecha].push({ texto, hora, protegido });
        eventos[fecha].sort((a, b) => a.hora.localeCompare(b.hora));
      }
    }
  });

  return eventos;
};

const guardarEventos = (eventos) => {
  localStorage.setItem("eventosSaber", JSON.stringify(eventos));
};

const CalendarioActividades = () => {
  const [mesActual, setMesActual] = useState(new Date());
  const [eventos, setEventos] = useState(obtenerEventosGuardados());
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [nuevoEvento, setNuevoEvento] = useState("");
  const [nuevaHora, setNuevaHora] = useState("");
  const [mesSeleccionado, setMesSeleccionado] = useState(mesActual.getMonth());
  const [anioSeleccionado, setAnioSeleccionado] = useState(
    mesActual.getFullYear()
  );

  useEffect(() => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const hoyStr = format(hoy, "yyyy-MM-dd", { locale: es });

    const fechaSaber = new Date(2025, 7, 10); // Nota: Los meses van de 0 a 11, por eso el 3 corresponde a abril
    fechaSaber.setHours(0, 0, 0, 0);

    const diferenciaEnMs = fechaSaber - hoy;
    const diasRestantes = Math.ceil(diferenciaEnMs / (1000 * 60 * 60 * 24));
    const alertaSaberMostrada = localStorage.getItem("alertaSaberMostrada");

    const mostrarEventos = () => {
      if (eventos[hoyStr]) {
        const mensajes = eventos[hoyStr]
          .map(
            (ev) =>
              `<li style="margin-bottom: 6px;">${ev.hora} - ${ev.texto}</li>`
          )
          .join("");

        Swal.fire({
          icon: "info",
          title: "🔔 Tienes eventos hoy:",
          html: `<ul style="text-align: left; padding-left: 20px; margin-top: 10px;">${mensajes}</ul>`,
          confirmButtonText: "Entendido",
          customClass: {
            popup: "evento-alerta-popup",
            title: "evento-alerta-titulo",
          },
        });
      }
    };

    const mostrarAlertaSaber = () => {
      const fechaFormateada = format(fechaSaber, "d 'de' MMMM 'de' yyyy", {
        locale: es,
      });

      return Swal.fire({
        title: "📘 ¡Atención!",
        html: `<b>La prueba Saber 11º es en ${diasRestantes} día(s)</b><br/>🗓️ <b>${fechaFormateada}</b><br/>¡Prepárate bien!`,
        icon: "info",
        confirmButtonText: "Entendido",
      }).then(() => {
        // Guardar que ya se mostró hoy
        localStorage.setItem("alertaSaberMostrada", hoyStr);
        mostrarEventos(); // Mostrar después la alerta de eventos
      });
    };

    // Verifica si la alerta ya fue mostrada el día de hoy
    if (
      diasRestantes <= 7 &&
      diasRestantes >= 0 &&
      alertaSaberMostrada !== hoyStr
    ) {
      mostrarAlertaSaber();
    } else {
      mostrarEventos(); // Si no hay alerta Saber, mostramos directamente eventos
    }
  }, []);

  const cambiarMes = (tipo) => {
    setMesActual(
      tipo === "next" ? addMonths(mesActual, 1) : subMonths(mesActual, 1)
    );
  };

  const handleAgregarEvento = () => {
    if (!nuevoEvento || !diaSeleccionado || !nuevaHora) return;

    const fecha = format(diaSeleccionado, "yyyy-MM-dd", { locale: es });
    const nuevo = { texto: nuevoEvento, hora: nuevaHora };

    const eventosActuales = { ...eventos };
    eventosActuales[fecha] = eventosActuales[fecha]
      ? [...eventosActuales[fecha], nuevo]
      : [nuevo];

    // Ordenar por hora
    eventosActuales[fecha].sort((a, b) => a.hora.localeCompare(b.hora));

    setEventos(eventosActuales);
    guardarEventos(eventosActuales);
    setNuevoEvento("");
    setNuevaHora("");
  };

  const handleEliminarEvento = (indice) => {
    const fecha = format(diaSeleccionado, "yyyy-MM-dd", { locale: es });
    const eventosDelDia = eventos[fecha] || [];

    const eventoAEliminar = eventosDelDia[indice];

    if (eventoAEliminar.protegido) {
      Swal.fire({
        icon: "warning",
        title: "⛔ No se puede eliminar",
        text: "Este evento está fijado y no puede ser eliminado.",
        confirmButtonText: "Entendido",
      });
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar el evento: "${eventoAEliminar.texto}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevosEventos = [...eventosDelDia];
        nuevosEventos.splice(indice, 1);

        const nuevosEventosTotales = { ...eventos };
        if (nuevosEventos.length > 0) {
          nuevosEventosTotales[fecha] = nuevosEventos;
        } else {
          delete nuevosEventosTotales[fecha];
        }

        setEventos(nuevosEventosTotales);
        guardarEventos(nuevosEventosTotales);

        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "El evento fue eliminado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (diaSeleccionado && !e.target.closest(`.${styles.popup}`)) {
        setDiaSeleccionado(null);
        setNuevaHora(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [diaSeleccionado]);

  const generarCalendario = () => {
    const inicioMes = startOfMonth(mesActual);
    const finMes = endOfMonth(mesActual);
    const inicio = startOfWeek(inicioMes, { weekStartsOn: 1 });
    const fin = endOfWeek(finMes, { weekStartsOn: 1 });

    const dias = [];
    let dia = inicio;

    while (dia <= fin) {
      dias.push(dia);
      dia = addDays(dia, 1);
    }

    return dias;
  };

  const dias = generarCalendario();

  return (
    <div className={styles.calendario}>
      <div className={styles.header}>
        <button onClick={() => cambiarMes("prev")}>←</button>
        <h2>{format(mesActual, "MMMM yyyy", { locale: es })}</h2>
        <button onClick={() => cambiarMes("next")}>→</button>
      </div>

      <div className={styles.grid}>
        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d, i) => (
          <div key={i} className={styles.diaTitulo}>
            {d}
          </div>
        ))}

        {dias.map((dia, i) => {
          const fechaStr = format(dia, "yyyy-MM-dd", { locale: es });
          const tieneEvento = eventos[fechaStr];
          const esHoy = isSameDay(dia, new Date());
          return (
            <div
              key={i}
              className={`${styles.celda} ${
                !isSameMonth(dia, mesActual) ? styles.otroMes : ""
              } ${tieneEvento ? styles.conEvento : ""} ${
                esHoy ? styles.hoy : ""
              }`}
              onClick={() => setDiaSeleccionado(dia)}
            >
              {format(dia, "d")}
            </div>
          );
        })}
      </div>

      {diaSeleccionado && (
        <div className={styles.popup}>
          <h4>
            📌 Eventos para{" "}
            {format(diaSeleccionado, "dd MMM yyyy", { locale: es })}
          </h4>
          <ul className={styles.listaEventos}>
            {(
              eventos[format(diaSeleccionado, "yyyy-MM-dd", { locale: es })] ||
              []
            ).map((ev, i) => (
              <li className={styles.cadaEvento} key={i}>
                <span>
                  {ev.hora} - {ev.texto}
                </span>
                {ev.protegido ? (
                  <span style={{ marginLeft: "6px", color: "#888" }}>🔒</span>
                ) : (
                  <button
                    className={styles.botonEliminar}
                    onClick={() => handleEliminarEvento(i)}
                  >
                    ❌
                  </button>
                )}
              </li>
            ))}
          </ul>
          <input
            type="time"
            value={nuevaHora}
            onChange={(e) => setNuevaHora(e.target.value)}
            required
          />

          <input
            type="text"
            value={nuevoEvento}
            placeholder="Nuevo evento"
            onChange={(e) => setNuevoEvento(e.target.value)}
          />
          <button className={styles.popupButton} onClick={handleAgregarEvento}>
            Agregar
          </button>
          <button
            className={styles.popupButton}
            onClick={() => {
              setDiaSeleccionado(null);
              setNuevaHora(null);
            }}
          >
            Cerrar
          </button>
        </div>
      )}

      <div className={styles.selectorFecha}>
        <select
          value={mesSeleccionado}
          onChange={(e) => setMesSeleccionado(Number(e.target.value))}
        >
          {[
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ].map((mes, index) => (
            <option key={index} value={index}>
              {mes}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1900"
          max="2100"
          value={anioSeleccionado}
          onChange={(e) => setAnioSeleccionado(Number(e.target.value))}
          className={styles.inputAnio}
        />

        <button
          className={styles.popupButton}
          onClick={() =>
            setMesActual(new Date(anioSeleccionado, mesSeleccionado, 1))
          }
        >
          Ir a fecha
        </button>
      </div>
      <div className={styles.diaHoy}>
        <button
          className={styles.popupButton}
          onClick={() => {
            setMesActual(new Date());
          }}
        >
          Ir a hoy
        </button>
      </div>
    </div>
  );
};

CalendarioActividades.propTypes = {
  fechasEstudio: PropTypes.arrayOf(PropTypes.string),
  fechasSimulacro: PropTypes.arrayOf(PropTypes.string),
  fechasExamen: PropTypes.arrayOf(PropTypes.string),
};
export default CalendarioActividades;
