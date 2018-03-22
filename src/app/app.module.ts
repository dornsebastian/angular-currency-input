import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {FormComponent} from './form/form.component';
import {MultiCurrencyComponent} from './multi-currency/multi-currency.component';
import {FormsModule} from '@angular/forms';
import {CurrencyFormatterDirective} from './helper/currency-formater.directive';
import {CurrencyPipe} from './helper/currency.pipe';
import {CurrencyChangeService} from './helper/currency-change.service';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    MultiCurrencyComponent,
    CurrencyFormatterDirective,
    CurrencyPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [CurrencyPipe, CurrencyChangeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
