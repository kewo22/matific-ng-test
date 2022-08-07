import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Classes } from 'src/app/core/interfaces/classes.interface';
import { DropDownOptions } from 'src/app/core/interfaces/dropdown-options.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FilterForm } from 'src/app/core/interfaces/filter-form.interface';

@Component({
  selector: 'app-report-filters',
  templateUrl: './report-filters.component.html',
  styleUrls: ['./report-filters.component.scss']
})
export class ReportFiltersComponent implements OnInit {

  destroy$ = new Subject();

  @Input() classes: Classes[] = [];
  @Output() onFilterChange = new EventEmitter<FilterForm>();

  classOptions: DropDownOptions[] = [];
  classStudents: DropDownOptions[] = [];

  tempStudentList: string[] = [];

  filterForm: FormGroup = this.initForm();

  constructor() { }

  ngOnInit(): void {
    this.initForm();
    this.makeDataForDropDowns();
    this.filterForm.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(values => {
        this.onFilterChange.emit(values);
      });
  }

  initForm(): FormGroup {
    return new FormGroup({
      class: new FormControl(''),
      student: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
    });
  }

  makeDataForDropDowns() {
    this.classes.forEach(cls => {
      this.classOptions.push({
        text: cls.name,
        value: cls.id.toString()
      });
      cls.students.forEach(student => this.tempStudentList.push(student))
    })
    const uniqueStudents = this.tempStudentList.filter(this.unique);
    uniqueStudents.forEach(uniqueStudent => {
      this.classStudents.push({
        text: uniqueStudent,
        value: uniqueStudent
      })
    })
  }

  unique(value: any, index: number, self: any) {
    return self.indexOf(value) === index
  }

  onSubmit(form: FormGroup) {
    // console.log('Valid?', form.valid); // true or false
    // console.log('Name', form.value.name);
    // console.log('Email', form.value.email);
    // console.log('Message', form.value.message);
    // console.log('Qty', form.value.qty);
    // console.log('Select', form.value.select);
  }

}
;