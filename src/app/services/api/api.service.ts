import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token = '';
  url = 'https://reqres.in/api/';

  constructor(private http: HttpClient) { }

  logIn(body: any): Observable<any> {
    return this.http.post(this.url + 'register', body);
  }

  getUsers(page: number): Observable<any> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${btoa(this.token)}`)
    }
    return this.http.get(this.url + 'users?page=' + page, header);
  }
}
