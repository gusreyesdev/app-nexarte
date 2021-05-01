import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError, tap, concatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getall() {
    return this.http.get(environment.apiUrl + environment.api.car).pipe(map((data: any) => {

      var _cars = data["1"]["subitems"];

      var subitems = [];

      for( var _car of _cars){
        subitems.push(_car);
      }

      return subitems;

    }), catchError(err => {
      return throwError(err);
    }));
  }
}
