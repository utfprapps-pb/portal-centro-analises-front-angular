import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

    private dtPipe = new DatePipe('en-US');

    transform(value: any, mask?: string): any {
        const args = 'dd/MM/yyyy';

        var parsedDate = Date.parse(value);
        if (isNaN(parsedDate)) {
            return '';
        }
        else {
            let aux = new Date(parsedDate);
            return this.dtPipe.transform(aux,  mask || args);
        }
    }
}
