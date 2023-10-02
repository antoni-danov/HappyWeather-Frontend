import { weatherCode } from "../enums/weatherCode";

export class WeatherUtilities {
    static roundValue(data: number): number {
        return (data % 1) < 0.50 ? Math.floor(data) : Math.ceil(data);
    }
    static temepratureConversion(data: string, temperature: number) {
        var convertTemperature = data === 'metric' ? (temperature - 32) * 5 / 9 : (temperature * 9 / 5) + 32;
        return this.roundValue(convertTemperature);
    }
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