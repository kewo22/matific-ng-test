import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropDownOptions } from 'src/app/core/interfaces/dropdown-options.interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DropdownComponent
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {

  @Input() label: string = 'label';
  @Input() options: DropDownOptions[] = [];

  _value = "";

  constructor() { }

  ngOnInit() {
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.propagateChange(this._value);
  }

  writeValue(value: string) {
    if (value !== undefined) {
      this.value = value;
    }
  }

  propagateChange = (_: any) => { };
  propagateTouched = (_: any) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.propagateTouched = fn;
  }

  touched($event: any) {
    this.propagateTouched($event);
  }

  trackByFn(index: number): number {
    return index;
  }

}
