import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HttpUtils } from '@npt/npt-template';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Batch, Box, Obu } from '../components/domain/domain';
import { lotList } from './mokup/getLotList';

@Injectable({
  providedIn: 'root'
})
export class BatchBoxService {
  private apiUrl = this.url + '/api/';
  private lotListMokup = lotList;

  constructor(private http: HttpClient, @Inject('beUrl') private url: string) { }

  // ritorna la lista di lotti attivi (true) o lo storico (false)
  getLotList(active: boolean): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.apiUrl + `lot/list/${active}`)
      .pipe(catchError(err => { throw err; }));
  }

  getLotSequence(yy: string): Observable<string> {
    return this.http.get<string>(this.apiUrl + `lot/${yy}/sequence`)
      .pipe(catchError(err => { throw err; }));
  }

  // ritorna una scatola se è aperta altrimenti null se nessuna scatola è aperta
  getBox(): Observable<Box> {
    const guId = localStorage.getItem('guId');
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: HttpUtils.createHttpParams({ ws: guId })
    };
    return this.http.get<Box>(this.apiUrl + 'box', options)
      .pipe(catchError(err => { throw err; }));
  }

  addBox(): Observable<Box> {
    const guId = localStorage.getItem('guId');
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: HttpUtils.createHttpParams({ ws: guId })
    };
    return this.http.post<Box>(this.apiUrl + '/box', null, options)
      .pipe(catchError(err => { throw err; }));
  }

  addBatch(lot: Batch): Observable<Batch> {
    return this.http.post<Batch>(this.apiUrl + 'lot', lot)
      .pipe(catchError(err => { throw err; }));
  }

  addObu(obu: Obu, closure: boolean, opening: boolean): Observable<Box> {
    const guId = localStorage.getItem('guId');
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: HttpUtils.createHttpParams({ ws: guId, close: closure, open: opening })
    };
    return this.http.post<Box>(this.apiUrl + 'obu', obu, options)
      .pipe(catchError(err => { throw err; }));
  }

  closeBox(opening: boolean): Observable<Box> {
    const guId = localStorage.getItem('guId');
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: HttpUtils.createHttpParams({ ws: guId, open: opening })
    };
    return this.http.put<Box>(this.apiUrl + 'box/close', null, options)
      .pipe(catchError(err => { throw err; }));
  }

  // historic

  getBoxList(id: number): Observable<Box[]> {
    return this.http.get<Box[]>(this.apiUrl + `/lot/${id}/box/list`)
      .pipe(catchError(err => { throw err; }));
  }

  genLotXML(id: number): Observable<void> {
    return this.http.put<void>(this.apiUrl + `/lot/${id}/xml`, null)
      .pipe(catchError(err => { throw err; }));
  }

  getBoxLabel(id: number): Observable<void> {
    return this.http.get<void>(this.apiUrl + `/box/${id}/label`)
      .pipe(catchError(err => { throw err; }));
  }

  genBoxLabel(id: number): Observable<void> {
    return this.http.put<void>(this.apiUrl + `/box/${id}/label`, null)
      .pipe(catchError(err => { throw err; }));
  }
}
