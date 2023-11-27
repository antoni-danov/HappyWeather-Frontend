import { WeatherCode } from "../enums/weatherCode";
import { weatherCodeFullDay } from "../enums/weatherCodeFullDay";

export class WeatherUtilities {

    static getWindDirection(data: number): string {
        var directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
        var index = Math.round(((data %= 360) < 0 ? data + 360 : data) / 45) % 8;
        return directions[index];
    }
    static getWeatherDescription(data: string): { index: number; description: string } {
        //Weather index
        var index = Object.keys(WeatherCode).indexOf(data);
        //Weather description
        var description = Object.values(WeatherCode)[index].toString().replace('_', ' ');
        return { index, description };
    }
    static twentyFourHourDayTime(time: string): string {
        const hour = parseInt(time.split(':')[0]);
        const dayState = hour > 19 || (hour >= 0 && hour < 6) ? 'night' : 'day';
        return dayState;
    }

}