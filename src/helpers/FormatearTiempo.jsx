export const FormatearTiempo = (tiempo) => {
  const horas = Math.floor(tiempo / 3600);
  const minutos = Math.floor((tiempo % 3600) / 60);
  const segundos = tiempo % 60;

  const horasFormateadas = horas.toString().padStart(2, "0");
  const minutosFormateados = minutos.toString().padStart(2, "0");
  const segundosFormateados = segundos.toString().padStart(2, "0");

  return `${horasFormateadas}h:${minutosFormateados}':${segundosFormateados}''`;
};

