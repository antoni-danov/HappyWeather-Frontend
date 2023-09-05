import { weatherLocation } from "./weatherLocationDto";
import { currentWeather } from "./currentweatherDto";

export interface weatherResultDto {
    location: weatherLocation;
    current: currentWeather;
}