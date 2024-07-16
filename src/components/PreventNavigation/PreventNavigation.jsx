import { useEffect } from 'react';

const PreventNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
      }
    };

    const handlePopState = (event) => {
      // Restaurar la ubicación actual y bloquear el evento de popstate para evitar la navegación hacia atrás
      window.history.pushState(null, null, window.location.href);
      event.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);

    // Restaurar la ubicación actual al montar el componente para evitar la navegación hacia atrás
    window.history.pushState(null, null, window.location.href);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null; // No se renderiza ningún contenido visible
};

export default PreventNavigation;