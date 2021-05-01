import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError, tap, concatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { State } from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) { }

  getall() {

    return this.http.get(environment.apiUrl + environment.api.state).pipe(map((data: any) => {

      var states = [];

      for (var _state of data) {
        var state = new State();
        state.setData(_state);
        states.push(_state);
      }
      return states;

    }), catchError(err => {
      return throwError(err);
    }));

  }
}
