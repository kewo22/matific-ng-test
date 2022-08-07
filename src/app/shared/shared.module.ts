import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from './components/button/button.component';
import { TextColorDirective } from '../core/directives/text-color.directive';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

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
    TextColorDirective,
    FontAwesomeModule
  ]
})
export class SharedModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }

}
