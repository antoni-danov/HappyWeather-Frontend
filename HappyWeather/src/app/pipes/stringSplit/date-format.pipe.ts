import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) { }

  transform(input: string, delimiter: string = 'T', format: string = 'EEEE, dd MMMM'): string | null {
    return this.datePipe.transform(input.split(delimiter)[0], format);
  }

}
