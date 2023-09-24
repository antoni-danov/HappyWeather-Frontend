import { WeatherValues } from "./weatherValues";

export interface WeatherData {
    weatherDateTime: string;
    values: WeatherValues;
}