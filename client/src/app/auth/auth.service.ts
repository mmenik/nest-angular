import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  title(): Observable<any> {
    return this.http.get('/api', { headers: new HttpHeaders().set('Authentication', 'application/json') })
      .map((data: any) => {
        return data;
      })
      .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }
}
