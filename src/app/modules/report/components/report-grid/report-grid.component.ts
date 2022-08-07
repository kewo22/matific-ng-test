import { Component, Input, OnInit } from '@angular/core';
import { GridColumn } from 'src/app/core/interfaces/grid-column.interface';
import { ReportData } from 'src/app/core/interfaces/report-data.interface';

@Component({
  selector: 'app-report-grid',
  templateUrl: './report-grid.component.html',
  styleUrls: ['./report-grid.component.scss']
})
export class ReportGridComponent implements OnInit {

  @Input() reportData: ReportData[] = [];
  tempReportData: ReportData[] = [];
  columns: GridColumn[] = [
    {
      key: 'dateCompleted',
      text: 'Date Completed',
      sort: {
        isEnabled: true,
        type: 'none'
      }
    },
    {
      key: 'content',
      text: 'Content',
      sort: {
        isEnabled: false,
        type: 'none'
      }
    },
    {
      key: 'type',
      text: 'Type',
      sort: {
        isEnabled: true,
        type: 'none'
      }
    }
    ,
    {
      key: 'skill',
      text: 'Skill',
      sort: {
        isEnabled: false,
        type: 'none'
      }
    }
    ,
    {
      key: 'result',
      text: 'Result',
      sort: {
        isEnabled: true,
        type: 'none'
      }
    },
    {
      key: 'timeSpent',
      text: 'Time Spent',
      sort: {
        isEnabled: true,
        type: 'none'
      }
    }
  ]
  // tempColumns: GridColumn[] = [];

  constructor() { }

  ngOnInit(): void {
    this.tempReportData = [...this.reportData];
    // this.tempColumns = [...this.columns];
  }

  onSort(key: string) {
    const foundColumn = this.columns.find(obj => { return obj.key === key; });
    const index = this.columns.findIndex(obj => { return obj.key === key; });
    switch (key) {
      case 'result':
        if (foundColumn) {
          if (foundColumn.sort.type === 'none') {
            this.columns.splice(index, 1, { ...foundColumn, sort: { ...foundColumn.sort, type: 'asc' } });
            this.reportData.sort((a, b) => {
              // ASC SORT
              return a.result - b.result;
            });
          }
          if (foundColumn.sort.type === 'asc') {
            this.columns.splice(index, 1, { ...foundColumn, sort: { ...foundColumn.sort, type: 'desc' } });
            this.reportData.sort((a, b) => {
              // DESC SORT
              return b.result - a.result;
            });
          }
          if (foundColumn.sort.type === 'desc') {
            this.columns.splice(index, 1, { ...foundColumn, sort: { ...foundColumn.sort, type: 'none' } });
            this.reportData = [...this.tempReportData]
          }
        }
        break;
      case 'dateCompleted':
        if (foundColumn) {
          if (foundColumn.sort.type === 'none') {
            this.columns.splice(index, 1, { ...foundColumn, sort: { ...foundColumn.sort, type: 'asc' } });
            this.reportData.sort((a, b) => {
              // ASC SORT
              return Number(a.dateCompleted) - Number(b.dateCompleted);
            });
          }
          if (foundColumn.sort.type === 'asc') {
            this.columns.splice(index, 1, { ...foundColumn, sort: { ...foundColumn.sort, type: 'desc' } });
            this.reportData.sort((a, b) => {
              // DESC SORT
              return Number(b.dateCompleted) - Number(a.dateCompleted);
            });
          }
          if (foundColumn.sort.type === 'desc') {
            this.columns.splice(index, 1, { ...foundColumn, sort: { ...foundColumn.sort, type: 'none' } });
            this.reportData = [...this.tempReportData]
          }
        }
        break;
      case 'timeSpent':
        if (foundColumn) {
          if (foundColumn.sort.type === 'none') {
            this.columns.splice(index, 1, { ...foundColumn, sort: { ...foundColumn.sort, type: 'asc' } });
            this.reportData.sort((a, b) => {
              // ASC SORT
              const minA = this.toMinutes(a.timeSpent.split(' '));
              const minB = this.toMinutes(b.timeSpent.split(' '));
              return minA - minB;
            });
          }
          if (foundColumn.sort.type === 'asc') {
            this.columns.splice(index, 1, { ...foundColumn, sort: { ...foundColumn.sort, type: 'desc' } });
            this.reportData.sort((a, b) => {
              // DESC SORT
              const minA = this.toMinutes(a.timeSpent.split(' '));
              const minB = this.toMinutes(b.timeSpent.split(' '));
              return Number(minB) - Number(minA);
            });
          }
          if (foundColumn.sort.type === 'desc') {
            this.columns.splice(index, 1, { ...foundColumn, sort: { ...foundColumn.sort, type: 'none' } });
            this.reportData = [...this.tempReportData]
          }
        }
        break;
      case 'type':
        if (foundColumn) {
          if (foundColumn.sort.type === 'none') {
            this.columns.splice(index, 1, { ...foundColumn, sort: { ...foundColumn.sort, type: 'asc' } });
            this.reportData.sort((a, b) => {
              // ASC SORT
              const fa = a.type.toLowerCase(), fb = b.type.toLowerCase();
              if (fa < fb) { return -1; }
              if (fa > fb) { return 1; }
              return 0;
            });
          }
          if (foundColumn.sort.type === 'asc') {
            this.columns.splice(index, 1, { ...foundColumn, sort: { ...foundColumn.sort, type: 'desc' } });
            this.reportData.sort((a, b) => {
              // ASC SORT
              const fa = a.type.toLowerCase(), fb = b.type.toLowerCase();
              if (fb < fa) { return -1; }
              if (fb > fa) { return 1; }
              return 0;
            });
          }
          if (foundColumn.sort.type === 'desc') {
            this.columns.splice(index, 1, { ...foundColumn, sort: { ...foundColumn.sort, type: 'none' } });
            this.reportData = [...this.tempReportData]
          }
        }
        break;
    }
  }

  toMinutes(arr: string[]): number {
    let totalMins = 0;
    arr.forEach((item: string) => {
      if (item.search('hr')) {
        if (!isNaN(+item.split('hr')[0]))
          totalMins += +item.split('hr')[0] * 60
      }
      if (item.search('m')) {
        if (!isNaN(+item.split('m')[0]))
          totalMins += +item.split('m')[0]
      }
    });
    return totalMins;
  }

  trackByFn(index: number): number {
    return index;
  }

}
