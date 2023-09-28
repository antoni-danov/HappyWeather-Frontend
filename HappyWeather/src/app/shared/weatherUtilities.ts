import { weatherCode } from "../enums/weatherCode";

export class WeatherUtilities {
    static convertTemperature(data: number): number {
        return (data % 1) < 0.50 ? Math.floor(data) : Math.ceil(data);
    }
    static getWindDegree(data: number): number {
        return Math.floor(data);
    }
    static getWindDirection(data: number): string {
        var directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
        var index = Math.round(((data %= 360) < 0 ? data + 360 : data) / 45) % 8;
        return directions[index];
    }
    static transformLocationName(data: string): { city: string; country: string; } {
        let splittedData = data.split(', ');
        var city = splittedData[0];
        var country = splittedData[splittedData.length - 1];

        return { city, country };
    }
    static getWeatherDescription(data: string): { index: number; description: string } {
        //Weather index
        var index = Object.keys(weatherCode).indexOf(data);

        //Weather description
        var description = Object.values(weatherCode)[index].toString().replace('_', ' ');

        return { index, description };
    }
}