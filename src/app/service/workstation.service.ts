import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Workstation } from '../components/domain/domain';


@Injectable({
  providedIn: 'root'
})
export class WorkstationService {
  private apiUrl = this.url + '/api/';

  constructor(private http: HttpClient, @Inject('beUrl') private url: string) { }

  getWorkstation(key: string): Observable<Workstation> {
    return this.http.get<Workstation>(this.apiUrl + `workstation/${key}`)
      .pipe(catchError(err => { throw err; }));
    /* return of({ id: 1, description: 'test' }); */
    /* return of(null); */
  }
}
