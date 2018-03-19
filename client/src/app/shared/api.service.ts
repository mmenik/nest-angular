import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../contact/contact.model';

import 'rxjs/add/observable/empty';

@Injectable()
export class ApiService {

  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  get<T>(url: string): Observable<T[]> {
    return this.request('GET', url);
  }

  post<T>(url: string, body: Object): Observable<T> {
    return this.request('POST', url, body);
  }

  request(method: string, url: string, body?: Object): Observable<any> {
    console.log(`${method}:${this.baseUrl}/${url}`);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.authService.getToken()}`);

    return this.http.request(method, `${this.baseUrl}/${url}`, {
      headers: headers,
      body: body,
      responseType: 'json'
    })
      .catch((error: HttpErrorResponse) => {
        return Observable.throw(error);
      });
  }
}
