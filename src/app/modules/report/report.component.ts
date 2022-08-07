import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ActivityData } from 'src/app/core/interfaces/activity-data.interface';
import { ReportData } from 'src/app/core/interfaces/report-data.interface';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import * as moment from 'moment';
import { Classes } from 'src/app/core/interfaces/classes.interface';
import { FilterForm } from 'src/app/core/interfaces/filter-form.interface';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  reportData: ReportData[] = [];
  tempReportData: ReportData[] = [];
  classes: Classes[] = [];

  constructor(
    private httpClientService: HttpClientService
  ) { }

  ngOnInit(): void {
    // console.log('REPORT COMP');
    combineLatest({
      activities: this.httpClientService.getActivities(),
      classes: this.httpClientService.getClasses(),
    })
      .pipe(
        map(response => {
          // console.log(response)
          const activities: ActivityData[] = JSON.parse(response.activities.body);
          const classes = response.classes;
          const reportData: ReportData[] = [];
          activities.forEach(activity => {
            reportData?.push({
              content: activity.content,
              type: activity.type,
              skill: activity.skill,
              timeSpent: activity.time,
              dateCompleted: this.getCompletedDate(activity.attempts.weeks[0]),
              result: this.calculateResult(activity.attempts.values),
              payload: activity
            })
          })
          return { classes, reportData, activities };
        })
      )
      .subscribe((data) => {
        console.log('data ', data)
        this.reportData = data.reportData;
        this.tempReportData = data.reportData;
        this.classes = data.classes;
      });

  }

  calculateResult(values: number[]): number {
    // return values.reduce((x, y) => x + y, 0) / values.length;
    return Math.max(...values);
  }

  getCompletedDate(date: string): Date {
    const dateStringSplit = date.split('/');
    const formattedDate = `${dateStringSplit[1]}/${dateStringSplit[0]}/${dateStringSplit[2]}`
    const momentDate = moment(formattedDate);
    return momentDate.toDate()
  }

  onFilterChange(e: FilterForm) {
    // console.log(e)

    // for (const key in e) {
    //   if (e.hasOwnProperty(key)) {
    //     // console.log(key)
    //     const value = (e as any)[key];
    //     if (value) {
    //       switch (key) {
    //         case 'class':
    //           console.log(value)
    //           break;
    //         case 'student':
    //           console.log(value)
    //           break;
    //       }
    //     }
    //   }
    // }

    if (e.student) {
      const filteredData = this.tempReportData.filter(obj => {
        return obj.payload.student === e.student
      });
      this.reportData = [...filteredData];
    }
    if (e.class) {
      const filteredData = this.tempReportData.filter(obj => {
        if (e.class === '1') {
          return obj.result <= 100 && obj.result >= 90
        } else if (e.class === '2') {
          return obj.result <= 89 && obj.result >= 79
        } else if (e.class === '3') {
          return obj.result <= 79 && obj.result >= 59
        } else if (e.class === '4') {
          return obj.result <= 59 && obj.result >= 0
        } else {
          return []
        }
      });
      this.reportData = [...filteredData];
    }
  }

}
