import { Component, Input, OnInit } from '@angular/core';
import { ReportData } from 'src/app/core/interfaces/report-data.interface';

@Component({
  selector: 'app-report-grid',
  templateUrl: './report-grid.component.html',
  styleUrls: ['./report-grid.component.scss']
})
export class ReportGridComponent implements OnInit {

  @Input() reportData: ReportData[] = [];

  constructor() { }

  ngOnInit(): void {
  }


  trackByFn(index: number): number {
    return index;
  }
}
