import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Activity } from '../interfaces/activity.interface';
import { Classes } from '../interfaces/classes.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  private activitiesUrl = '/production/matific-test-activities';
  private classesUrl = '/production/matific-test-classes';

  getActivities(): Observable<Activity> {
    return this.http
      .get<Activity>(this.activitiesUrl)
      .pipe(catchError(this.handleError));
  }

  getClasses(): Observable<Classes[]> {
    return this.http
      .get<Classes[]>(this.classesUrl)
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    console.log(error);
    return throwError(() => {
      return 'ERROR FETCHING DATA';
    });
  }
 
}
