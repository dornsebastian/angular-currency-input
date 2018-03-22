import {CurrencyFormatterDirective} from './currency-formater.directive';
import {Component, DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CurrencyPipe} from './currency.pipe';

@Component({
  template: `<input [v7CurrencyFormatter]="input"
                    (v7CurrencyFormatterNewFormattedValue)="newFormattedValue = $event"
                    (v7CurrencyFormatterNewPlainValue)="newPlainValue = $event"> `
})
class TestCurrencyFormatterComponent {
  input = 42.12;
  newFormattedValue: string;
  newPlainValue: number;
}

class MockCurrencyPipe {

  transform(input: number | string, fractionSize: number = 2): string {
    return input.toString();
  }

  parse(value: string, fractionSize: number = 2): number {
    return Number(value);
  }
}

describe('CurrencyFormatterDirective', () => {

  let component: TestCurrencyFormatterComponent;
  let fixture: ComponentFixture<TestCurrencyFormatterComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCurrencyFormatterComponent,
        CurrencyFormatterDirective
      ],
      providers: [
        {provide: CurrencyPipe, useClass: MockCurrencyPipe}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCurrencyFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('input'));

  });

  it('should create an instance of debug element', () => {
    expect(debugElement).toBeTruthy();
  });

  it('should set the default value', () => {
    expect(debugElement.nativeElement.value).toBe('42.12');
  });

  it('should call the currency pipe to transform if there is new input', () => {
    const spyOnTransform = spyOn(MockCurrencyPipe.prototype, 'transform');
    component.input = 1;
    fixture.detectChanges();

    expect(spyOnTransform).toHaveBeenCalled();
  });

  it('should transform the input if there is new input', () => {
    component.input = 1;
    fixture.detectChanges();

    expect(component.newFormattedValue).toBe('1');
  });

  it('should send the new input as number', () => {
    component.input = 1.12;
    fixture.detectChanges();

    expect(component.newPlainValue).toBe(1.12);
  });

  it('should transform the number on blur', () => {
    debugElement.nativeElement.value = '15.17';
    debugElement.nativeElement.dispatchEvent(new Event('input'));
    expect(debugElement.nativeElement.value).toBe('15.17');

    debugElement.nativeElement.dispatchEvent(new Event('blur'));
    expect(component.newFormattedValue).toBe('15.17');
  });
});
