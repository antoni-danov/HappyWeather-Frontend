import { WeatherLocation } from "../weatherLocation";
import { TimeLines } from "./timeLines";

export interface WeatherForecast<T> {
    timeLines: TimeLines<T>;
    location: WeatherLocation;
}