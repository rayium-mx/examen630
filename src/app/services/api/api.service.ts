import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://reqres.in/api/';

  constructor(private http: HttpClient) { }

  logIn(body: any): Observable<any> {
    return this.http.post(this.url + 'register', body);
  }
}
