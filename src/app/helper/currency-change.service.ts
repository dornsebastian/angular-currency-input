import {Injectable} from '@angular/core';
import {Currency} from '../model/currency.enum';

@Injectable()
export class CurrencyChangeService {
  change(from: Currency, to: Currency, oldValue: number): number {
    if (from === Currency.EUR && to === Currency.USD) {
      return oldValue * 0.75;
    }
    if (from === Currency.USD && to === Currency.EUR) {
      return oldValue / 0.75;
    }
    return oldValue;
  }
}
