import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormComponent} from './form.component';
import {Component, Input} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('FormComponent', () => {

  @Component({
    selector: 'v7-multi-currency',
    template: ``
  })
  class MockMultiCurrencyComponent {
    @Input() placeholder: string;
    @Input() defaultValue: string;
  }

  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent, MockMultiCurrencyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the placeholder', () => {
    const el = fixture.debugElement.query(By.css('v7-multi-currency')).nativeElement;
    el.placeholder = 'Test-Eingabe';
    fixture.detectChanges();
    expect(el.placeholder).toBe('Test-Eingabe');
  });

  it('should set the defaultValue', () => {
    const el = fixture.debugElement.query(By.css('v7-multi-currency')).nativeElement;
    el.defaultValue = 'Test-Eingabe';
    fixture.detectChanges();
    expect(el.defaultValue).toBe('Test-Eingabe');
  });
});
