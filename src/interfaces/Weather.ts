// interfacce per i dati meteo e le coordinate geografiche
export interface Coordinates {
    latitude: number;
    longitude: number;
    name: string;
}

export interface ApiResponse<T> {
    results?: T[];
}


export interface WeatherData {
    current_weather: {
        temperature: number;
        windspeed: number;
        weathercode: number;
    };
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        weathercode: number[];
        sunrise: string[];
        sunset: string[];
        uv_index_max: number[];
    };
    hourly: {
        relative_humidity_2m: number[];
        precipitation_probability: number[];
        temperature_2m: number[];
        weathercode: number[];
        time: string[];
    };

}