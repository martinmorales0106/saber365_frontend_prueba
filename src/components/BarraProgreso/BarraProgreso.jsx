import PropTypes from "prop-types";
import styles from "./BarraProgreso.module.css";

const BarraProgreso = ({ current }) => {
  const min = 100;
  const max = 500;
  const clampedCurrent = Math.max(min, Math.min(current, max));
  const angle = ((clampedCurrent - min) / (max - min)) * 180; // 100 a 500 ↦ 0° a 180°

  const pointerX = 100 + 80 * Math.cos(((angle - 90) * Math.PI) / 180);
  const pointerY = 100 + 80 * Math.sin(((angle - 90) * Math.PI) / 180);

  // const textOffset = 35;

  // // calculamos la posición del texto con un poco más de radio
  // const textX =
  //   100 + (80 + textOffset) * Math.cos(((angle - 90) * Math.PI) / 180);
  // const textY =
  //   100 + (80 + textOffset) * Math.sin(((angle - 90) * Math.PI) / 180);

  const segments = [
    { from: 100, to: 220, color: "#653328", faded: "#A86F5A" }, // Marrón
    { from: 220, to: 300, color: "#E04A09", faded: "#FBB6A0" }, // Salmón
    { from: 300, to: 380, color: "#D8DC2C", faded: "#FFF8B0" }, // Amarillo
    { from: 380, to: 500, color: "#18C83F", faded: "#A5D6A7" }, // Verde
  ];

  const currentSegment = segments.find(
    (seg) => clampedCurrent >= seg.from && clampedCurrent <= seg.to
  );
  const currentColor = currentSegment ? currentSegment.color : "#000";

  return (
    <div className={styles.container}>
      <svg viewBox="20 -20 220 240" className={styles.gauge}>
        {/* Dibujar todos los segmentos como fondo */}
        {segments.map((seg, i) => {
          const startAngle = getAngle(seg.from);
          const endAngle = getAngle(seg.to);
          return (
            <path
              key={`bg-${i}`}
              d={describeArc(100, 100, 80, startAngle, endAngle)}
              fill="none"
              stroke={seg.faded}
              strokeWidth="40"
            />
          );
        })}

        {/* Dibujar progreso alcanzado con colores activos */}
        {segments.map((seg, i) => {
          if (current <= seg.from) return null;
          const actualTo = Math.min(current, seg.to);
          const startAngle = getAngle(seg.from);
          const endAngle = getAngle(actualTo);
          return (
            <path
              key={`active-${i}`}
              d={describeArc(100, 100, 80, startAngle, endAngle)}
              fill="none"
              stroke={seg.color}
              strokeWidth="35" // Cambiar el tamaño del arco de los colores
            />
          );
        })}

        {/* Flecha indicadora */}
        <line
          x1="100"
          y1="100"
          x2={pointerX}
          y2={pointerY}
          stroke={currentColor}
          strokeWidth="5"
          markerEnd="url(#arrowhead)"
        />
        {/* <text
          x={textX}
          y={textY}
          transform={`rotate(${angle}, ${textX}, ${textY})`}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fontWeight="bold"
        >
          {clampedCurrent}
        </text> */}

        <defs>
          <marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="6"
            refX="0"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 6 3, 0 6" fill={currentColor} />
          </marker>
        </defs>
        {/* Etiquetas de valores extremos */}
        <text
          x={180 + 90 * Math.cos(Math.PI)}
          y={10 + 90 * Math.sin(Math.PI)}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="#333"
          transform={`rotate(90 ${175 + 90 * Math.cos(Math.PI)} ${
            15 + 90 * Math.sin(Math.PI)
          })`}
        >
          100
        </text>
        <text
          x={260 + 90 * Math.cos(Math.PI)}
          y={20 + 90 * Math.sin(Math.PI)}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="#333"
          transform={`rotate(90 ${175 + 90 * Math.cos(Math.PI)} ${
            15 + 90 * Math.sin(Math.PI)
          })`}
        >
        {current}
        </text>
        <text
          x={260 + 90 * Math.cos(Math.PI)}
          y={40 + 90 * Math.sin(Math.PI)}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="#333"
          transform={`rotate(90 ${175 + 90 * Math.cos(Math.PI)} ${
            15 + 90 * Math.sin(Math.PI)
          })`}
        >
        Puntaje
        </text>
        <text
          x={10 + 90 * Math.cos(0)}
          y={180 + 90 * Math.sin(0)}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="#333"
          transform={`rotate(90 ${6 + 90 * Math.cos(0)} ${
            175 + 90 * Math.sin(0)
          })`}
        >
          500
        </text>
      </svg>
    </div>
  );
};

// Transforma un valor (100 a 500) en ángulo (0° a 180°)
function getAngle(value) {
  const min = 100;
  const max = 500;
  return ((value - min) / (max - min)) * 180;
}

// Calcula el arco SVG
function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle - 90);
  const end = polarToCartesian(x, y, radius, startAngle - 90);
  const largeArcFlag = endAngle - startAngle > 180 ? "1" : "0";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

BarraProgreso.propTypes = {
  goal: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};

export default BarraProgreso;
