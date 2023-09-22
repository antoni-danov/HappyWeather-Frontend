import { WeatherData } from "./weatherData";
import { weatherLocation } from "./weatherLocation";

export interface WeatherResult {
    weatherData: { weatherData: WeatherData };
    location: weatherLocation;
}