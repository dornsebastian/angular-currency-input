import {CurrencyChangeService} from './currency-change.service';
import {Currency} from '../model/currency.enum';

describe('CurrencyChangeService', () => {

  describe('change()', () => {
    const service: CurrencyChangeService = new CurrencyChangeService();

    it('should change EUR to USD with factor 0.75', () => {
      expect(service.change(Currency.EUR, Currency.USD, 100)).toBe(75);
      expect(service.change(Currency.EUR, Currency.USD, -100)).toBe(-75);
      expect(service.change(Currency.EUR, Currency.USD, 0)).toBe(0);
    });

    it('should change USD to EUR with factor 1.33333', () => {
      expect(service.change(Currency.USD, Currency.EUR, 75)).toBe(100);
      expect(service.change(Currency.USD, Currency.EUR, -75)).toBe(-100);
      expect(service.change(Currency.USD, Currency.EUR, 0)).toBe(0);
    });

    it('should change not change value on same currency', () => {
      expect(service.change(Currency.EUR, Currency.EUR, 75)).toBe(75);
      expect(service.change(Currency.USD, Currency.USD, -75)).toBe(-75);
    });

    it('should be not in trouble if currency do not exists', () => {
      expect(service.change(Currency.EUR, null, 75)).toBe(75);
      expect(service.change(null, Currency.USD, -75)).toBe(-75);
    });

  });
});
