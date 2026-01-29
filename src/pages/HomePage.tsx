import { IoBookmarks, IoCloudyNight, IoSearch, IoSunny } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";
import { Footer } from "../components/Footer";

export function HomePage() {
    const [citta, setCitta] = useState<string>("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (citta.trim()) {
            navigate(`/meteo/${encodeURIComponent(citta)}`);
        }
    };

    return (
        <div className="home-page">
            <div className="main-section">
                <header className="text-section">
                    <div className="title">
                        <IoSunny className="title-icon1"></IoSunny>
                        <h1>Meteo<span>App</span></h1>
                        <IoCloudyNight className="title-icon2"></IoCloudyNight>
                    </div>
                    <p>Scopri il meteo in tempo reale ovunque nel mondo</p>  
                </header>
                
                <div className="input-card">
                    <div className="search">
                        <input type="text" placeholder="Es: Roma, Parigi, Tokyo..." />
                        <button className="btn-cerca"> <IoSearch className="search-icon" />Cerca</button>
                    </div>
                    <button className="btn-savedLoc" onClick={() => navigate("/preferiti")}> <IoBookmarks className="search-icon"/>Città salvate</button>
                </div>
            </div>
        </div>
        
    );
}