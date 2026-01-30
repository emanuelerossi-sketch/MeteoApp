import { useNavigate } from "react-router-dom";
import "../css/HomePage.css"; // Riutilizzo lo sfondo della Home

export function NotFound() {
	const navigate = useNavigate();

	return (
		<div className="homepage">
			<div className="main-section" style={{ textAlign: 'center' }}>
				<header className="text-section">
					<h1 style={{ fontSize: '10rem', marginBottom: '0' }}>404</h1>
					<p style={{ fontSize: '1.5rem', opacity: 1 }}>
						La pagina che cerchi non esiste
					</p>
				</header>

				<button
					className="btn-cerca"
					onClick={() => navigate("/")}
					style={{ marginTop: '20px', padding: '15px 40px' }}
				>
					Torna alla Home
				</button>
			</div>
		</div>
	);
}