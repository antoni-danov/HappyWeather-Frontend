import { WeatherValues } from "./weatherValues";

export interface WeatherData {
    weatherDateTime: string;
    weatherValues: { weatherValues: WeatherValues };
}