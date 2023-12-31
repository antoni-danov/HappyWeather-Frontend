import { WeatherCode } from "src/app/enums/weatherCode";

export interface DayValues {
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
    weatherCode: WeatherCode;
    windDirection: number;
    maxWindGust: number;
    windSpeed: number;
}