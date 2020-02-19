import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient, @Inject('apiConfig') private apiConfig) { }

  signUp(form): Observable<object> {
    return this.http.post<object>(this.apiConfig.api + '/signup', form);
  }
}
