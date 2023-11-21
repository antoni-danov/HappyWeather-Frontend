import { WeatherCode } from "../enums/weatherCode";
import { weatherCodeFullDay } from "../enums/weatherCodeFullDay";

export interface WeatherValues {
    //Kilometers
    cloudBase: number;
    //Kilometers
    cloudCeiling: number;
    //Pourcentage
    cloudCover: number;
    humidity: number;
    //Pourcentage
    precipitationProbability: number;
    rainIntensity: string;
    snowIntensity: string;
    temperature: number;
    temperatureApparent: number;
    uvIndex: number;
    //Kilometers
    visibility: number;
    weatherCode: WeatherCode;
    //Degree
    windDirection: number;
    //Meters per second
    windGust: number;
    windSpeed: number;
}