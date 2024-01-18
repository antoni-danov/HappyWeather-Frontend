import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempConversion',
  standalone: true
})
export class TemperatureConversionPipe implements PipeTransform {

  transform(input: number, unit: string, converted: boolean): number {

    if (unit === 'metric' && converted === false) {
      return ((input - 32) * 5) / 9;
    }
    else if (unit === 'imperial' && converted === true) {
      return (input * 9 / 5) + 32;
    } else {
      return input;
    }
  }

}
