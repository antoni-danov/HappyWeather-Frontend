import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempConversion',
  standalone: true
})
export class TemperatureConversionPipe implements PipeTransform {

  transform(input: number, unit: string, currentUnit: string): number {
    var result: number = 0;

    if ((unit === 'metric' && currentUnit === 'metric') || (unit === 'imperial' && currentUnit === 'imperial')) {
      return result = input;
    } else if (unit === 'metric' && currentUnit === 'imperial') {
      result = (input * 9 / 5) + 32;
    }
    else if (unit === 'imperial' && currentUnit === 'metric') {
      result = ((input - 32) * 5) / 9;
    }
    return result;
  }

}
