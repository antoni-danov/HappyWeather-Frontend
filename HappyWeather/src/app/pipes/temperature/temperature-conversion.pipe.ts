import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempConversion'
})
export class TemperatureConversionPipe implements PipeTransform {

  transform(input: number, unit: string = 'metric'): number {
    return unit === 'metric' ? input : (input * 9 / 5) + 32;
  }

}
