import { weatherCode } from "src/app/enums/weatherCode";

export interface dayValues {
    cloudCoverAverage: number;
    averageHumidity: number;
    moonRise: string;
    moonSet: string;
    precipitationProbability: number;
    sunrise: string;
    sunset: string;
    apparentTemperature: number;
    maxTemperature: number;
    minTemperature: number;
    averageUVIndex: number;
    visibility: number;
    weatherCode: weatherCode;
    windDirection: number;
    maxWindGust: number;
    windSpeed: number;
}