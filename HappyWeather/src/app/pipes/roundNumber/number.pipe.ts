import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumber',
  standalone: true

})
export class NumberPipe implements PipeTransform {

  transform(input: number): number {
    return (input % 1) < 0.50 ? Math.floor(input) : Math.ceil(input);

  }

}
