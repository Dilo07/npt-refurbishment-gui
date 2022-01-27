import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Batch } from '../components/domain/domain';
import { lotList } from './mokup/getLotList';

@Injectable({
  providedIn: 'root'
})
export class BatchBoxService {
  private apiUrl = this.url + '/api/';
  private lotListMokup = lotList;

  constructor(private http: HttpClient, @Inject('beUrl') private url: string) { }

  getLotList(active: boolean): Observable<Batch[]> {
    /* return this.http.get<Batch[]>(this.apiUrl + `/lot/list/${active}`)
      .pipe(catchError(err => { throw err; })); */
    return of(this.lotListMokup);
  }

  addBatch(lot: Batch): Observable<Batch> {
    return this.http.post<Batch>(this.apiUrl + 'lot', lot)
      .pipe(catchError(err => { throw err; }));
  }
}
