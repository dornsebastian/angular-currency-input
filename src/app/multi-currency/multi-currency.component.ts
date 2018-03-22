import {Component, Input, OnInit} from '@angular/core';
import {Currency} from '../model/currency.enum';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {CurrencyChangeService} from '../helper/currency-change.service';

@Component({
  selector: 'v7-multi-currency',
  templateUrl: './multi-currency.component.html',
  styleUrls: ['./multi-currency.component.css'],
  providers: [NgbDropdownConfig]
})
export class MultiCurrencyComponent {

  currencyEnum = Currency;

  _currency: Currency = Currency.EUR;

  set currency(newCurrency: Currency) {
    this._currency = newCurrency;
  }

  get currency(): Currency {
    return this._currency;
  }

  plainNumber: number;
  _userInput: string;

  set userInput(newUserInput: string) {
    this._userInput = newUserInput;
  }

  get userInput(): string {
    return this._userInput;
  }

  @Input() placeholder: string;
  @Input() defaultValue: string | number;

  constructor(config: NgbDropdownConfig, private currencyChange: CurrencyChangeService) {
    config.placement = 'bottom-right';
  }

  onNewFormattedValue(newValue: string) {
    this.userInput = newValue;
  }

  onNewPlainValue(newValue: number) {
    this.plainNumber = newValue;
  }

  onClick(newCurrency: Currency) {
    const changedValue = this.currencyChange.change(this.currency, newCurrency, this.plainNumber);
    this.currency = newCurrency;
    this.defaultValue = changedValue;
  }

}
