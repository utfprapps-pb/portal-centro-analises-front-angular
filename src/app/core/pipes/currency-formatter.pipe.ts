import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencyFormatter'
})
export class CurrencyFormatterPipe implements PipeTransform {

    transform(value: number | string, decimais: number = 2): string {
        if (value == null) {
            return '';
        }
        // Converte o valor para número, caso seja uma string
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;

        // Se a conversão falhar e resultar em NaN, retorna uma string vazia ou algum valor padrão
        if (isNaN(numericValue)) {
            return '';
        }

        // Formata o número para BRL com o número especificado de casas decimais
        return numericValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: decimais,
            maximumFractionDigits: decimais
        });
    }
}
