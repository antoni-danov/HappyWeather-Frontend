import { weatherLocation } from "../weatherLocation";
import { timeLines } from "./timeLines";

export interface DailyWeatherForecast {
    timelines: timeLines;
    location: weatherLocation;
}