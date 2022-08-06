import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from './components/button/button.component';
import { TextColorDirective } from '../core/directives/text-color.directive';


@NgModule({
  declarations: [
    InputComponent,
    DropdownComponent,
    ButtonComponent,
    TextColorDirective
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    InputComponent,
    DropdownComponent,
    ButtonComponent,
    TextColorDirective
  ]
})
export class SharedModule { }
