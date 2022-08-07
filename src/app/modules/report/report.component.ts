import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, from, map } from 'rxjs';
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
  isDataLoading: boolean = true;
  filterObj: FilterForm | null = null;

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
      .subscribe(
        {
          next: data => {
            console.log('data ', data)
            this.reportData = data.reportData;
            this.tempReportData = data.reportData;
            this.classes = data.classes;
          },
          error: err => console.error('An error occurred', err),
          complete: () => { this.isDataLoading = false }
        }

      );

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
    this.filterObj = e;
    let filteredData: ReportData[] = [];
    if (e.fromDate && e.toDate) {
      const dataToFilter = filteredData.length ? filteredData : this.tempReportData;
      const fromDate = this.toDateObj(e.fromDate);
      const toDate = this.toDateObj(e.toDate);
      const filteredByDate = dataToFilter.filter(obj => {
        return obj.dateCompleted > fromDate && obj.dateCompleted < toDate;
      })
      filteredData = [...filteredByDate];
    }
    for (const key in e) {
      if (e.hasOwnProperty(key)) {
        const value = (e as any)[key];
        if (value) {
          switch (key) {
            case 'class':
              const dataToFilter1 = filteredData.length ? filteredData : this.tempReportData;
              const filteredByClass = dataToFilter1.filter(obj => {
                if (value === '1') {
                  return obj.result <= 100 && obj.result >= 90
                } else if (value === '2') {
                  return obj.result <= 89 && obj.result >= 79
                } else if (value === '3') {
                  return obj.result <= 79 && obj.result >= 59
                } else if (value === '4') {
                  return obj.result <= 59 && obj.result >= 0
                } else {
                  return []
                }
              });
              filteredData = [...filteredData, ...filteredByClass];
              break;
            case 'student':
              const dataToFilter2 = filteredData.length ? filteredData : this.tempReportData;
              const filteredByStudent = dataToFilter2.filter(obj => {
                return obj.payload.student === value
              });
              filteredData = [...filteredByStudent];
              break;
          }
        }
        this.reportData = [...filteredData];
      }
    }
  }

  toDateObj(value: string): Date {
    const splittedValue = value.split('-');
    const date = new Date(+splittedValue[0], +splittedValue[1] - 1, +splittedValue[2])
    return date
  }

}
