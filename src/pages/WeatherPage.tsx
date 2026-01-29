import "../css/WeatherPage.css";
import { IoArrowBack, IoHeart } from "react-icons/io5";

export default function WeatherPage() {


    return (
        <div className="weatherpage">
            <div className="nav">
                <button className="btn-back"> <IoArrowBack/>Torna alla Home</button>
                <button className="btn-favorite"> <IoHeart/> Aggiungi ai preferiti</button>
            </div>

            <div className="info-container">
                <div className="main-card">
                    <h1>Nome città</h1>
                </div>
            </div>
        </div>
    );
}