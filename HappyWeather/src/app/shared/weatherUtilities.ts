import { WeatherCode } from "../enums/weatherCode";
import * as fourCode from '../enums/weatherCode';
import * as fiveDayCode from '../enums/weatherCodeFullDay';
import * as fiveNightCode from '../enums/weatherCodeFullNight';
import * as iconList from '../../assets/iconsList.json';
import { environement } from 'src/app/environements/environement';

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
    static twentyFourHourDayTime(time: string | undefined): string {
        const hour = parseInt(time!.split(':')[0]);
        const dayState = hour > 19 || (hour >= 0 && hour < 6) ? 'night' : 'day';
        return dayState;
    }
    static setIcon(data: any, locationTime?: string): { weatherDescription: string, iconPath: string } {
        var iconPath: any;

        var currentCode = data.values.weatherCode.toString();
        console.log(data.time);

        var dayState = locationTime ? WeatherUtilities.twentyFourHourDayTime(locationTime) : WeatherUtilities.twentyFourHourDayTime(data.time.split('T')[1]);

        // Check if code exists in weatherCode.ts
        const weatherindex = Object.keys(fourCode.WeatherCode).indexOf(currentCode);

        // If exists get value
        var weatherDescription = Object.values(fourCode.WeatherCode)[weatherindex];
        weatherDescription = dayState === 'night' && weatherDescription === 'Clear_Sunny' ? weatherDescription.toString().slice(0, 5) : weatherDescription.toString();
        console.log(dayState);

        // If is Day or Night
        if (dayState === 'day') {

            // Check if value exists in weatherCodeFullDay.ts
            const fulldayIndex = Object.values(fiveDayCode.weatherCodeFullDay)
                .indexOf(weatherDescription.toString());

            // If exists get weather code with 5 digits
            const fiveDigitDayCode = Object.keys(fiveDayCode.weatherCodeFullDay)[fulldayIndex];

            // Find coresponding code in iconsList.js and get his value
            iconPath = Object.values(iconList).find((file) =>
                file.startsWith(fiveDigitDayCode));

        } else if (dayState === 'night') {
            // Check if value exists in weatherCodeFullNight.ts
            const fullNightIndex = Object.values(fiveNightCode.weatherCodeFullNight)
                .indexOf(weatherDescription.toString());

            // If exists get weather code with 5 digits
            const fiveDigitNightCode = Object.keys(fiveNightCode.weatherCodeFullNight)[fullNightIndex];

            // Find coresponding code in iconsList.js and get his value
            iconPath = Object.values(iconList).find((file) =>
                file.startsWith(fiveDigitNightCode));

        }
        console.log(weatherDescription);

        return { weatherDescription, iconPath };
    }

}