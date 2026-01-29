import type { ReactNode } from "react";
import "../css/Card.css";

// Definizione delle proprietà del componente Card
interface CardProps {
    // Contenuto interno della card
    children: ReactNode;
    title?: string;
    className: string;
}


export function Card({ children, title, className = "" }: CardProps) {
    return (
        <div className={`card ${className}`}>
        {/* Mostro il titolo solo se è stato fornito */}
        {title && <h2 className="card-title">{title}</h2>}
        <div className="card-content">
            {/* Contenuto interno della card */}
            {children}
        </div>
        </div>
    );
}