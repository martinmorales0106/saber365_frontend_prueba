export const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha)
    const opciones = {
        // weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: "numeric",
        minute: "numeric",
    }
    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}