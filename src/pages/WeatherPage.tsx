import "../css/WeatherPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ApiResponse, Coordinates, WeatherData } from "../interfaces/Weather";
import { useQuery } from "@tanstack/react-query";
import { Load } from "../components/Load";
import { Card } from "../components/Card";
import { WeatherNotes } from "../components/WeatherNotes";
import {
	IoArrowBack,
	IoHeart,
	IoHeartOutline,
	IoWaterOutline,
	IoSunnyOutline,
	IoRainyOutline
} from "react-icons/io5";
import {
	LuWind,
	LuSunrise,
	LuSunset,
	LuCloudSun,
	LuSun,
	LuCloud,
	LuCloudRain,
	LuSnowflake,
	LuCloudLightning
} from "react-icons/lu";


export default function WeatherPage() {

	// Estraggo il parametro della città dall'URL
	const { citta } = useParams<{ citta: string }>();
	const navigate = useNavigate();

	// Stato per gestire se la città è nei preferiti
	const [isFavorite, setIsFavorite] = useState(false);

	// Controllo se la città è già nei preferiti al caricamento della pagina
	useEffect(() => {
		const saved = JSON.parse(localStorage.getItem("preferiti") || "[]");
		if (citta && saved.includes(citta.toLowerCase())) {
			setIsFavorite(true);
		}
	}, [citta]);

	// Funzione per aggiungere/rimuovere la città dai preferiti
	const toggleFavorite = () => {
		// Recupero la lista dei preferiti 
		const saved: string[] = JSON.parse(localStorage.getItem("preferiti") || "[]");
		const cityKey = citta?.toLowerCase() || "";
		let newFavorites;
		// Aggiungo o rimuovo la città dai preferiti
		if (saved.includes(cityKey)) {
			// Rimuovo la città
			newFavorites = saved.filter(c => c !== cityKey);
			setIsFavorite(false);
		} else {
			// Aggiungo la città 
			newFavorites = [...saved, cityKey];
			setIsFavorite(true);
		}
		// Aggiorno i preferiti 
		localStorage.setItem("preferiti", JSON.stringify(newFavorites));
	};

	// Funzioni per ottenere l'icona e la descrizione del meteo in base al codice
	const getWeatherIcon = (code: number, size: number = 24) => {
		if (code === 0) return <LuSun size={size} color="#FFD700" />;
		if (code <= 3) return <LuCloudSun size={size} color="#F0E68C" />;
		if (code <= 48) return <LuCloud size={size} color="#D3D3D3" />;
		if (code <= 67) return <LuCloudRain size={size} color="#87CEEB" />;
		if (code <= 77) return <LuSnowflake size={size} color="#FFFFFF" />;
		return <LuCloudLightning size={size} color="#FF4500" />;
	};

	const getWeatherDescription = (code: number) => {
		if (code === 0) return "Cielo sereno";
		if (code <= 3) return "Parzialmente nuvoloso";
		if (code <= 48) return "Nebbioso";
		if (code <= 67) return "Pioggia";
		if (code <= 77) return "Neve";
		return "Temporale";
	};

	// Query per ottenere le coordinate della città
	const { data: geoData, isLoading: geoLoading } = useQuery({
		queryKey: ['geo', citta],
		queryFn: async () => {
			const url = `https://geocoding-api.open-meteo.com/v1/search?name=${citta}&count=1&language=it&format=json`;
			const risposta = await fetch(url);
			return risposta.json() as Promise<ApiResponse<Coordinates>>;
		},
		// Abilita la query solo se citta è definita e non è vuota
		enabled: citta !== "",
	});

	// Estraggo le coordinate dalla risposta
	// Se non trovo un risultato, coords sarà null, ma non fa crashare l'app
	let coords = null;
	if (geoData && geoData.results) {
		// Estraggo il primo risultato
		coords = geoData.results[0];
	}

	// Query per ottenere i dati meteo usando le coordinate
	const { data: weather, isLoading: weatherLoading, isError } = useQuery({
		queryKey: ['weather', coords],
		queryFn: async () => {
			const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords?.latitude}&longitude=${coords?.longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,uv_index_max&timezone=auto`;
			const risposta = await fetch(url);
			// Parsing della risposta JSON in un oggetto TypeScript
			return risposta.json() as Promise<WeatherData>;
		},
		enabled: coords !== null,
	});

	// Caricamento dei dati
	if (geoLoading || weatherLoading) {
		return (
			<div className="weatherpage">
				<Load />
			</div>
		);
	}

	// Gestione errore o città non trovata
	if (isError || !coords || !weather) {
		return (
			<div className="weatherpage">
				<div className="error">
					<h1>Città non trovata</h1>
					<button className="btn-back" onClick={() => navigate("/")}>Torna alla Home</button>
				</div>
			</div>
		);
	}

	// Formatto l'orario
	const formatTime = (timeString: string) => {
		return new Date(timeString).toLocaleTimeString('it-IT', {
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	// Dati meteo aggiuntivi
	const umidita = weather.hourly.relative_humidity_2m[0];
	const probabilitaPioggia = weather.hourly.precipitation_probability[0];


	return (
		<div className="weatherpage">
			<div className="nav-container">
				<button
					className="btn-back"
					onClick={() => navigate("/")}
				>
					<IoArrowBack size={20} />
					Torna alla Home
				</button>

				<button
					className="btn-favorite"
					onClick={toggleFavorite}
				>
					{isFavorite ? <IoHeart size={22} /> : <IoHeartOutline size={22} />}
					{isFavorite ? "Rimuovi" : "Aggiungi ai preferiti"}
				</button>
			</div>

			<div className="weather-container">
				<Card className="main-card">

					<h1>{coords.name}</h1>

					<div className="temperatura-adesso">
						<div className="icona-grande">
							{getWeatherIcon(weather.current_weather.weathercode, 80)}
						</div>
						<div className="temp-grande">{Math.round(weather.current_weather.temperature)}°C</div>
						<p className="descrizione">{getWeatherDescription(weather.current_weather.weathercode)}</p>
					</div>

					<div className="griglia-dettagli">
						<div className="dettaglio">
							<span className="icona"><LuWind /></span>
							<div>
								<p className="etichetta">Vento</p>
								<p className="valore">{Math.round(weather.current_weather.windspeed)} km/h</p>
							</div>
						</div>

						<div className="dettaglio">
							<span className="icona"><IoWaterOutline /></span>
							<div>
								<p className="etichetta">Umidità</p>
								<p className="valore">{umidita}%</p>
							</div>
						</div>

						<div className="dettaglio">
							<span className="icona"><IoRainyOutline /></span>
							<div>
								<p className="etichetta">Pioggia</p>
								<p className="valore">{probabilitaPioggia}%</p>
							</div>
						</div>

						<div className="dettaglio">
							<span className="icona"><IoSunnyOutline /></span>
							<div>
								<p className="etichetta">UV</p>
								<p className="valore">{Math.round(weather.daily.uv_index_max[0])}</p>
							</div>
						</div>
					</div>

					<div className="alba-tramonto">
						<div className="sole">
							<span className="icona-sole"><LuSunrise color="#FFA500" /></span>
							<div>
								<p>Alba</p>
								<p className="ora">{formatTime(weather.daily.sunrise[0])}</p>
							</div>
						</div>
						<div className="sole">
							<span className="icona-sole"><LuSunset color="#FF4500" /></span>
							<div>
								<p>Tramonto</p>
								<p className="ora">{formatTime(weather.daily.sunset[0])}</p>
							</div>
						</div>
					</div>
				</Card>

				<Card title="Previsioni Settimanali" className="weekly-card">
					<div className="lista-giorni">
						{weather.daily.time.slice(1, 7).map((date, i) => {
							const indice = i + 1;
							return (
								<div key={date} className="giorno">
									<span className="nome-giorno">
										{new Date(date).toLocaleDateString('it-IT', { weekday: 'short' })}
									</span>
									<span className="icona-giorno">
										{getWeatherIcon(weather.daily.weathercode[indice], 30)}
									</span>
									<div className="temperature">
										<span className="max">{Math.round(weather.daily.temperature_2m_max[indice])}°</span>
										<span className="min">{Math.round(weather.daily.temperature_2m_min[indice])}°</span>
									</div>
								</div>
							);
						})}
					</div>
				</Card>
			</div>
			<div className="notes-container">
				<Card title="Le tue note sul meteo" className="notes-card">
					<WeatherNotes city={coords.name} />
				</Card>
			</div>
		</div>
	);
}