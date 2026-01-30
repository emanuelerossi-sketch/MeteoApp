import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { IoSend } from "react-icons/io5";
import "../css/WeatherNotes.css";

interface WeatherNotesProps {
    city: string;
}

interface NoteData {
    city: string;
    note: string;
    timestamp: string;
}

export function WeatherNotes({ city }: WeatherNotesProps) {
    const [noteText, setNoteText] = useState("");
    const [savedNotes, setSavedNotes] = useState<NoteData[]>([]);

    // Simulazione di una chiamata POST
    const saveNoteMutation = useMutation({
        mutationFn: async (noteData: NoteData) => {
            // Simulazione di una chiamata API per salvare la nota
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                // definisco l'header e il body della richiesta
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: `Nota per ${noteData.city}`,
                    body: noteData.note,
                    userId: 1,
                }),
            });

            // Gestione della risposta
            if (!response.ok) {
                throw new Error('Errore nel salvataggio');
            }

            return response.json();
        },
        onSuccess: () => {
            // Aggiorno la lista delle note salvate
            const newNote: NoteData = {
                city,
                note: noteText,
                timestamp: new Date().toLocaleString('it-IT'),
            };
            setSavedNotes([newNote, ...savedNotes]);
            setNoteText("");
        },
    });

    const handleSubmit = () => {
        if (noteText.trim()) {
            saveNoteMutation.mutate({
                city,
                note: noteText,
                timestamp: new Date().toISOString(),
            });
        }
    };

    return (
        <div className="weather-notes">
            <div className="note-input-group">
                <textarea
                    id="note-meteo-field"
                    name="notaMeteo"
                    placeholder={`Scrivi una nota per ${city}...`}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    rows={4}
                />
                <button
                    onClick={handleSubmit}
                    className="btn-salva"
                    disabled={!noteText.trim() || saveNoteMutation.isPending}
                >
                    <IoSend size={20} />
                    {/* Testo del bottone cambia in base allo stato della mutazione */}
                    {saveNoteMutation.isPending ? "Salvataggio..." : "Salva nota"}
                </button>
            </div>

            {/* Messaggi di errore o successo */}
            {saveNoteMutation.isError && (
                <p className="error-msg">Errore nel salvataggio della nota</p>
            )}

            {saveNoteMutation.isSuccess && (
                <p className="success-msg">Nota salvata con successo!</p>
            )}

            {savedNotes.length > 0 && (
                <div className="note-list">
                    <h4>Note salvate per {city}:</h4>
                    {savedNotes.map((note, index) => (
                        <div key={index} className="note-item">
                            <p className="note-text">{note.note}</p>
                            <span className="note-time">{note.timestamp}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}