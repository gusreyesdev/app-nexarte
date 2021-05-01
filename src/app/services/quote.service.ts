import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError, tap, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private http: HttpClient) { }


  saveQuote(quote: any) {
    return this.http.post(environment.apiUrl + environment.api.quote, quote).pipe(map((data: any) => {
      return data;
    }), catchError(err => {
      return throwError(err);
    }));
  }
}
