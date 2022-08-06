import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportGridComponent } from './components/report-grid/report-grid.component';
import { ReportFiltersComponent } from './components/report-filters/report-filters.component';
import { TextColorDirective } from 'src/app/core/directives/text-color.directive';


@NgModule({
  declarations: [
    ReportComponent,
    ReportGridComponent,
    ReportFiltersComponent,
    // TextColorDirective
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ReportModule { }
