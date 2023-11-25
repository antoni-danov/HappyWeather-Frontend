import { WeatherCode } from "src/app/enums/weatherCode";

export interface HourlyValues {

    cloudCoverage: number;
    humidity: number;
    precipitationProbability: number;
    temperature: number;
    apparentTemperature: number;
    uvIndex: number;
    visibility: number;
    weatherCode: WeatherCode;
    windDirection: number;
    maxWindGust: number;
    windSpeed: number;
}