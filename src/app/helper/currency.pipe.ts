import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {


  private PADDING = '000000000';
  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;

  constructor() {
    // TODO comes from configuration settings
    this.DECIMAL_SEPARATOR = ',';
    this.THOUSANDS_SEPARATOR = '.';
  }

  transform(input: number | string, fractionSize: number = 2): string {
    const value = (typeof input === 'number') ? this.round(Number(input), fractionSize) :
      this.parseStringToNumber((input || '').toString(), fractionSize);

    let [integer, fraction = ''] = (value || '').toString().split('.');

    fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + this.PADDING).substring(0, fractionSize)
      : '';

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR) || '0';

    return integer + fraction;
  }

  parse(value: string, fractionSize: number = 2): number {
    return this.parseStringToNumber(value, fractionSize);
  }

  private removeNotAllowedSymbols(input: string): string {
    let n = 0;
    return (input || '').replace(new RegExp('[^0-9' + this.DECIMAL_SEPARATOR + ']', 'g'), '')
      .replace(new RegExp(this.DECIMAL_SEPARATOR, 'g'), function ($0) {
        n += 1;
        return n === 1 ? $0 : '';
      });
  }

  private multiplyFactor(input: string): number {
    return Math.pow(1000, ((input || '').toLocaleLowerCase().match(new RegExp('[t]', 'g')) || []).length || 0);
  }

  private parseStringToNumber(input: string, fractionSize: number = 2): number {
    const cleanInput = this.removeNotAllowedSymbols(input);
    const multiplyFactor = this.multiplyFactor(input);
    const [integer, fraction = ''] = cleanInput.split(this.DECIMAL_SEPARATOR);
    const numberFactorLess = Number(integer) + (fraction === '' ? 0 : Number('.' + fraction));
    const numberWithFactor = numberFactorLess * multiplyFactor;
    return this.round(numberWithFactor, fractionSize);
  }

  private round(x: number, fractionSize: number = 2): number {
    const roundFactor = Math.pow(10, fractionSize);
    return Math.round(x * roundFactor) / roundFactor;
  }
}
