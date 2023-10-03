import { weatherLocation } from "../weatherLocation";
import { TimeLines } from "./timeLines";

export interface DailyWeatherForecast {
    timeLines: TimeLines;
    location: weatherLocation;
}