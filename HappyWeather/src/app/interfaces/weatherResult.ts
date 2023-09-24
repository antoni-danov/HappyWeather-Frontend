import { WeatherData } from "./weatherData";
import { weatherLocation } from "./weatherLocation";

export interface WeatherResult {
    data: WeatherData;
    location: weatherLocation;
}