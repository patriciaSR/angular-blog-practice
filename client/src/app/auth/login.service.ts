import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenDTO } from './token.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, @Inject('apiConfig') private apiConfig) { }

  getToken(body): Observable<TokenDTO> {
    const auth = btoa(`${body.username}:${body.password}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + auth
      })
    };

    return this.http.post<TokenDTO>(this.apiConfig.api + '/login', '', httpOptions);
  }
}
