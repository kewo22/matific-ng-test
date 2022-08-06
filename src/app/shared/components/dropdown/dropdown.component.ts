import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

  _test = "";

  constructor() { }

  ngOnInit() {
  }

  get value(): string {
    return this._test;
  }

  set value(value: string) {
    this._test = value;
    this.propagateChange(this._test);
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

}
