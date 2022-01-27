import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Batch, Box } from '../components/domain/domain';
import { box } from './mokup/getBox';
import { lotList } from './mokup/getLotList';

@Injectable({
  providedIn: 'root'
})
export class BatchBoxService {
  private apiUrl = this.url + '/api/';
  private lotListMokup = lotList;
  private boxMokup = box;

  constructor(private http: HttpClient, @Inject('beUrl') private url: string) { }

  // ritorna la lista di lotti attivi (true) o lo storico (false)
  getLotList(active: boolean): Observable<Batch[]> {
    /* return this.http.get<Batch[]>(this.apiUrl + `/lot/list/${active}`)
      .pipe(catchError(err => { throw err; })); */
    /* return of([]); */
    return of(this.lotListMokup);
  }

  // ritorna una scatola se è aperta altrimenti null se nessuna scatola è aperta
  getBox(): Observable<Box> {
    /* return this.http.get<Box>(this.apiUrl + 'box')
      .pipe(catchError(err => { throw err; })); */
    return of();
    /* this.boxMokup */
  }

  addBox(): Observable<Box> {
    /* return this.http.post<Box>(this.apiUrl + '/box', null)
      .pipe(catchError(err => { throw err; })); */
    return of(this.boxMokup);
  }

  addBatch(lot: Batch): Observable<Batch> {
    return this.http.post<Batch>(this.apiUrl + 'lot', lot)
      .pipe(catchError(err => { throw err; }));
  }
}
