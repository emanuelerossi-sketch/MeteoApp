import "../css/Load.css";

// Componente per mostrare il caricamento
export function Load() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <h2>Carico i dati...</h2>
    </div>
  );
}