import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtenemos el token
    const token = sessionStorage.getItem('userToken');
    // Importante: modificamos de forma inmutable, haciendo el clonado de la petición
    if (req.url.search('/login') === -1) {
      req = req.clone(
        { headers: req.headers.set('Authorization', 'Bearer ' + token) }
      );
    }
    // Pasamos al siguiente interceptor de la cadena la petición modificada
    return next.handle(req);
  }
}

