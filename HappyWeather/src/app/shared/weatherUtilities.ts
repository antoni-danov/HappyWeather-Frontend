import { weatherCode } from "../enums/weatherCode";
import { weatherCodeFullDay } from "../enums/weatherCodeFullDay";

export class WeatherUtilities {

    static getWindDirection(data: number): string {
        var directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
        var index = Math.round(((data %= 360) < 0 ? data + 360 : data) / 45) % 8;
        return directions[index];
    }
    static getWeatherDescription(data: string): { index: number; description: string } {
        //Weather index
        var index = Object.keys(weatherCode).indexOf(data);
        //Weather description
        var description = Object.values(weatherCode)[index].toString().replace('_', ' ');
        return { index, description };
    }

}