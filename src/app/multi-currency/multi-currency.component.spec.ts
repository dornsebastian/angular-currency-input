import {MultiCurrencyComponent} from './multi-currency.component';
import {Currency} from '../model/currency.enum';

class MockCurrencyChangeService {
  change(from: Currency, to: Currency, oldValue: number): number {
    return oldValue;
  }
}


// TODO: Interationtests

describe('MultiCurrencyComponent', () => {

  let component: MultiCurrencyComponent;
  let service: MockCurrencyChangeService;

  beforeEach(() => {
    service = new MockCurrencyChangeService();
    component = new MultiCurrencyComponent({placement: null, autoClose: false}, service);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set currency', () => {
    component.currency = Currency.USD;
    expect(component.currency).toBe(Currency.USD);
  });

  it('should set user input', () => {
    component.userInput = 'Hello World';
    expect(component.userInput).toBe('Hello World');
  });

  it('should set user input on new formatted value', () => {
    component.onNewFormattedValue('Hello World');
    expect(component.userInput).toBe('Hello World');
  });

  it('should set plain number on new plain value', () => {
    component.onNewPlainValue(42.431);
    expect(component.plainNumber).toBe(42.431);
  });
  it('should call service if new currency is selected', () => {
    component.currency = Currency.EUR;
    component.plainNumber = 12.34;
    const spy = spyOn(service, 'change');

    component.onClick(Currency.USD);
    expect(spy).toHaveBeenCalledWith(Currency.EUR, Currency.USD, 12.34);
  });


});
