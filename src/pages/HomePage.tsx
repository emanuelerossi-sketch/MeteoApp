import { IoBookmarks, IoCloudyNight, IoSearch, IoSunny } from "react-icons/io5";
import "../css/HomePage.css";

export function HomePage() {
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
                    <button className="btn-savedLoc"> <IoBookmarks className="search-icon"/>Città salvate</button>
                </div>
            </div>
        </div>
    );
}