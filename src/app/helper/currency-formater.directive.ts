import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {CurrencyPipe} from './currency.pipe';

@Directive({
  selector: '[v7CurrencyFormatter]'
})
export class CurrencyFormatterDirective {

  // TODO: Nicht Direkt auf das native Element zugreifen.
  private inputElement: HTMLInputElement;

  @Output('v7CurrencyFormatterNewFormattedValue') newFormattedValue = new EventEmitter<string>();

  @Output('v7CurrencyFormatterNewPlainValue') newPlainValue = new EventEmitter<number>();

  @Input('v7CurrencyFormatter') set input(input: number | string) {
    this.onBlur(input);
  }

  constructor(private elementRef: ElementRef, private currencyPipe: CurrencyPipe) {
    this.inputElement = this.elementRef.nativeElement;
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: number | string) {
    const formattedValue = this.currencyPipe.transform(value);
    this.inputElement.value = formattedValue;
    this.onNewValue('' + formattedValue);
  }

  private onNewValue(value: string) {
    this.newFormattedValue.emit(value);
    this.newPlainValue.emit(this.currencyPipe.parse(value));
  }
}
