import {CurrencyPipe} from './currency.pipe';

describe('CurrencyPipe', () => {
  const pipe = new CurrencyPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should use the German settings', () => {
    expect(pipe['PADDING']).toBe('000000000');
    expect(pipe['DECIMAL_SEPARATOR']).toBe(',');
    expect(pipe['THOUSANDS_SEPARATOR']).toBe('.');
  });

  describe('Method removeNotAllowedSymbols()', () => {

    it('should remove all alpha characters', () => {
      expect(pipe['removeNotAllowedSymbols']('abcdefghijklnopqrstuvwxyz')).toBe('');
      expect(pipe['removeNotAllowedSymbols']('abcdef1g2h3i4j5k6l7nopqrstuvwxyz')).toBe('1234567');
    });

    it('should remove all special characters', () => {
      expect(pipe['removeNotAllowedSymbols']('!"§$%&/()=?`´*+#_-:;<>')).toBe('');
      expect(pipe['removeNotAllowedSymbols']('!"§$1%2&3/5(6)7=8?`´*+#_-:;<>')).toBe('1235678');
    });

    it('should not remove all numeric characters', () => {
      expect(pipe['removeNotAllowedSymbols']('1234567890')).toBe('1234567890');
    });

    it('should work with a empty string', () => {
      expect(pipe['removeNotAllowedSymbols']('')).toBe('');
    });

    it('should not remove the first comma', () => {
      expect(pipe['removeNotAllowedSymbols'](',1')).toBe(',1');
      expect(pipe['removeNotAllowedSymbols']('1,')).toBe('1,');
    });

    it('should remove all commas - except of the first comma', () => {
      expect(pipe['removeNotAllowedSymbols'](',,1')).toBe(',1');
      expect(pipe['removeNotAllowedSymbols']('1,,')).toBe('1,');
      expect(pipe['removeNotAllowedSymbols']('1,2,3,4')).toBe('1,234');
    });

    it('should remove points', () => {
      expect(pipe['removeNotAllowedSymbols']('1.2.3.4.5.6')).toBe('123456');
      expect(pipe['removeNotAllowedSymbols']('1.2.3.4.5.6,78,9')).toBe('123456,789');
    });

    it('should work with complex input', () => {
      expect(pipe['removeNotAllowedSymbols']('er0gb,e1,gr3,s')).toBe('0,13');
    });

  });

  describe('Method multiplyFactor()', () => {

    it('should return 1 for all strings without T\'s', () => {
      expect(pipe['multiplyFactor']('0123456789')).toBe(1);
      expect(pipe['multiplyFactor']('!"§$%&/()=?`´*+#_-:;<>')).toBe(1);
      expect(pipe['multiplyFactor']('abcdefghijklnopqrsuvwxyz')).toBe(1);
    });

    it('should return 1000 for all strings containing one T\'s', () => {
      expect(pipe['multiplyFactor']('0123456789t')).toBe(1000);
      expect(pipe['multiplyFactor']('01234t56789')).toBe(1000);
      expect(pipe['multiplyFactor']('t0123456789')).toBe(1000);
      expect(pipe['multiplyFactor']('!"§$%&/()=?`´*+#_-:;<>t')).toBe(1000);
      expect(pipe['multiplyFactor']('abcdefghijklnopqrstuvwxyz')).toBe(1000);
    });

    it('should work with multiply T\'s', () => {
      expect(pipe['multiplyFactor']('tt')).toBe(1000000);
      expect(pipe['multiplyFactor']('ttt')).toBe(1000000000);
      expect(pipe['multiplyFactor']('tttt')).toBe(1000000000000);
    });

    it('should not matter upper and lower case', () => {
      expect(pipe['multiplyFactor']('T')).toBe(1000);
      expect(pipe['multiplyFactor']('t')).toBe(1000);
      expect(pipe['multiplyFactor']('tt')).toBe(1000000);
      expect(pipe['multiplyFactor']('TT')).toBe(1000000);
      expect(pipe['multiplyFactor']('tTt')).toBe(1000000000);
    });

  });

  describe('Method parseStringToNumber()', () => {

    it('should work for integer', () => {
      expect(pipe['parseStringToNumber']('987654321')).toBe(987654321);
      expect(pipe['parseStringToNumber']('0123456789')).toBe(123456789);
      expect(pipe['parseStringToNumber']('a0b()12d3456789')).toBe(123456789);
    });

    it('should work for floats', () => {
      expect(pipe['parseStringToNumber']('0123456789,12')).toBe(123456789.12);
      expect(pipe['parseStringToNumber']('a0b()12d3456789,54')).toBe(123456789.54);
    });

    it('should round', () => {
      expect(pipe['parseStringToNumber']('99,995000')).toBe(100.00);
      expect(pipe['parseStringToNumber']('100,0049999')).toBe(100.00);
      expect(pipe['parseStringToNumber']('0123456789,125')).toBe(123456789.13);
      expect(pipe['parseStringToNumber']('a0b()12d3456789,544')).toBe(123456789.54);
    });

    it('should work with different factor sizes', () => {
      expect(pipe['parseStringToNumber'](',125739428')).toBe(0.13);
      expect(pipe['parseStringToNumber'](',125739428', 1)).toBe(0.1);
      expect(pipe['parseStringToNumber'](',125739428', 3)).toBe(0.126);
    });

    it('should work with correct placed thousands separators', () => {
      expect(pipe['parseStringToNumber']('1.234.567,89')).toBe(1234567.89);
    });

    it('should work with wrong placed thousands separators', () => {
      expect(pipe['parseStringToNumber']('1.2.34.56.7,89.0')).toBe(1234567.89);
    });

    it('should work with T\'s as multiply factors', () => {
      expect(pipe['parseStringToNumber'](',125739428t')).toBe(125.74);
      expect(pipe['parseStringToNumber'](',125739428tT')).toBe(125739.43);
    });

    it('should work multiply commas', () => {
      expect(pipe['parseStringToNumber']('0,1,3,')).toBe(0.13);
      expect(pipe['parseStringToNumber']('0,1,3')).toBe(0.13);
      expect(pipe['parseStringToNumber']('01,,3')).toBe(1.3);
    });

  });

  describe('Method parse()', () => {

    it('should work', () => {
      expect(pipe['parse']('dsg,125739428t')).toBe(125.74);
    });

  });

  describe('Method round()', () => {

    it('should work with default factor size', () => {
      expect(pipe['round'](99.995454)).toBe(100.00);
      expect(pipe['round'](.004)).toBe(0.00);
      expect(pipe['round'](.005)).toBe(0.01);
    });

    it('should work with positive factor size', () => {
      expect(pipe['round'](99.995454, 3)).toBe(99.995);
      expect(pipe['round'](99.995454, 1)).toBe(100.0);
    });

    it('should work with zero factor size', () => {
      expect(pipe['round'](99.995454, 0)).toBe(100.0);
      expect(pipe['round'](78.56, 0)).toBe(79.0);
    });

    it('should work with negative factor size', () => {
      expect(pipe['round'](99.995454, -1)).toBe(100.0);
      expect(pipe['round'](0.56, -21)).toBe(0.0);
    });

  });

  describe('Method transform()', () => {

    it('should work with a empty input', () => {
      expect(pipe['transform'](null)).toBe('0,00');
      expect(pipe['transform']('')).toBe('0,00');
      expect(pipe['transform'](' ')).toBe('0,00');
      expect(pipe['transform']('leer')).toBe('0,00');
    });

    it('should work with numbers', () => {
      expect(pipe['transform'](0.1264)).toBe('0,13');
      expect(pipe['transform'](.1264)).toBe('0,13');
      expect(pipe['transform'](12345678.1264)).toBe('12.345.678,13');
    });

    it('should work with formatted input', () => {
      expect(pipe['transform']('0,13')).toBe('0,13');
      expect(pipe['transform']('0,1265')).toBe('0,13');
      expect(pipe['transform']('12.345.678,13')).toBe('12.345.678,13');
    });

    it('should work with ugly formatted input', () => {
      expect(pipe['transform']('er0gb,e1,gr3,s')).toBe('0,13');
      expect(pipe['transform']('0,1.2.6.5')).toBe('0,13');
      expect(pipe['transform']('1.2.3.4.5.6.7.8,1.3.2.6.7,5,')).toBe('12.345.678,13');
    });

  });

});
