import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoLocationSharp, IoTrashOutline } from "react-icons/io5";
import "../css/SavedLoc.css";
import { Load } from "../components/Load";

export function SavedLoc() {
const [preferiti, setPreferiti] = useState<string[]>([]);
const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
    // Verifico se ci sono città salvate nei preferiti
    const salvati = JSON.parse(localStorage.getItem("preferiti") || "[]");
    setPreferiti(salvati);
    setIsLoading(false);
}, []);

// Funzione per rimuovere una città dai preferiti
const rimuoviCitta = (cittaDaRimuovere: string) => {
    // Aggiorno lo stato
    const nuoviPreferiti = preferiti.filter(c => c !== cittaDaRimuovere);
    localStorage.setItem("preferiti", JSON.stringify(nuoviPreferiti));
    setPreferiti(nuoviPreferiti);
};

if (isLoading) {
    return <Load />;
}

return (
    <div className="savedLocpage">
        <div className="saved-container">
            <button className="btn-back" onClick={() => navigate("/")}> <IoArrowBack/>Torna alla Home </button>
            <h1>Le tue Città</h1>

            {/* Controllo se la lista dei preferiti è vuota */}
            {preferiti.length === 0 ? (
            <p className="empty-msg">Non hai ancora salvato nessuna città.</p>
            ) : (
            <div className="saved-list">
                {/* Mappo le città salvate */}
                {preferiti.map((city) => (
                <div key={city} className="saved-city">
                    <div 
                        className="city-info" 
                        onClick={() => navigate(`/meteo/${city}`)}
                    >
                        <IoLocationSharp size={22} color="#00d2ff" />
                        {/* Nome della città */}
                        <span>{city}</span>
                    </div>

                    <button className="delete-btn" onClick={() => rimuoviCitta(city)}>
                        Rimuovi città
                        <IoTrashOutline size={22} />
                    </button>
                </div>
                ))}
            </div>
            )}
        </div>
    </div>
);
}
