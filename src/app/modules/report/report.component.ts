import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ActivityData } from 'src/app/core/interfaces/activity-data.interface';
import { ReportData } from 'src/app/core/interfaces/report-data.interface';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  myForm: FormGroup<any> = new FormGroup({ name: new FormControl('') });
  reportData: ReportData[] | null = null;


  constructor(
    private httpClientService: HttpClientService
  ) { }

  ngOnInit(): void {
    console.log('REPORT COMP');
    this.myForm = new FormGroup({
      name: new FormControl('Sammy'),
      email: new FormControl(''),
      message: new FormControl(''),
      qty: new FormControl(0),
      select: new FormControl(0)
    });

    combineLatest({
      activities: this.httpClientService.getActivities(),
      classes: this.httpClientService.getClasses(),
    })
      .pipe(
        map(response => {
          console.log(response)
          const activities: ActivityData[] = JSON.parse(response.activities.body);
          const classes = response.classes;
          const reportData: ReportData[] = [];
          activities.forEach(activity => {
            reportData?.push({
              content: activity.content,
              type: activity.type,
              skill: activity.skill,
              timeSpent: activity.time,
              dateCompleted: '-',
              result: this.calculateResult(activity.attempts.values)
            })
          })
          return { classes, reportData, activities };
        })
      )
      .subscribe((data) => {
        console.log('data ', data)
      });

  }

  calculateResult(values: number[]): string {
    return `${values.reduce((x, y) => x + y, 0) / values.length}%`;
  }


  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Message', form.value.message);
    console.log('Qty', form.value.qty);
    console.log('Select', form.value.select);
    new Date()
  }
}
