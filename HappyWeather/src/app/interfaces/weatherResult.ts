import { WeatherData } from "./weatherData";
import { WeatherLocation } from "./weatherLocation";

export interface WeatherResult {
    data: WeatherData;
    location: WeatherLocation;
}