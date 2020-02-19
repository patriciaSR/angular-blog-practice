import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDTO } from './post-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PostsProxyService {

  constructor(private httpClient: HttpClient, @Inject('apiConfig') private apiConfig: any) { }

  getPosts(): Observable<PostDTO[]> {
    return this.httpClient.get<PostDTO[]>(this.apiConfig.api + '/posts');
  }

  getPostById(id: string): Observable<PostDTO> {
    return this.httpClient.get<PostDTO>(this.apiConfig.api + '/posts/' + id);
  }

  sendPost(post: PostDTO): Observable<PostDTO> {
    return this.httpClient.post<PostDTO>(this.apiConfig.api + '/posts', post);
  }
}
