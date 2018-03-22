import {Currency} from './currency.enum';

describe('Currency', () => {

  it('should symbol EUR with a euro symbol', () => {
    expect(Currency.symbol(Currency.EUR)).toBe('€');
  });

  it('should symbol USD with a dollar symbol', () => {
    expect(Currency.symbol(Currency.USD)).toBe('$');
  });

  it('should symbol unknown currency with a question mark', () => {
    expect(Currency.symbol(42)).toBe('?');
  });

  it('should label EUR with Euro', () => {
    expect(Currency.label(Currency.EUR)).toBe('Euro');
  });

  it('should label USD with US-Dollar', () => {
    expect(Currency.label(Currency.USD)).toBe('US-Dollar');
  });

  it('should label unknown currency with \'unbekannt\'', () => {
    expect(Currency.label(42)).toBe('unbekannt');
  });

  it('should return list of values with labels Euro and US-Dollar', () => {
    expect(Currency.lovLabels()).toContain({label: 'Euro', value: 'EUR'});
    expect(Currency.lovLabels()).toContain({label: 'US-Dollar', value: 'USD'});
  });

  it('should return list of values with symbols Euro and US-Dollar', () => {
    expect(Currency.lovSymbols()).toContain({label: '€', value: 'EUR'});
    expect(Currency.lovSymbols()).toContain({label: '$', value: 'USD'});
  });
});
