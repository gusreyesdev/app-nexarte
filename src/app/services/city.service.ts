import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError, tap, concatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getCities(state_id: any) {

    let params = new HttpParams().set('state_id', state_id);

    return this.http.get(environment.apiUrl + environment.api.cities + 'getCities/' , { params }).pipe(map((data: any) => {

      var cities = [];

      for (var _city of data) {
        var city = new City();
        city.setData(_city);
        cities.push(_city);
      }
      return cities;

    }), catchError(err => {
      return throwError(err);
    }));



  }


}
