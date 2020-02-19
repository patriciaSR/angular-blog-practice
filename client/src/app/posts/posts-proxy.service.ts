import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDetailDTO } from './post-detail-dto.model';
import { PostsDTO } from './posts-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PostsProxyService {

  constructor(private httpClient: HttpClient, @Inject('apiConfig') private apiConfig: any) { }

  getPosts(): Observable<PostsDTO[]> {
    return this.httpClient.get<PostsDTO[]>(this.apiConfig.api + '/posts');
  }

  getPostById(id: string): Observable<PostDetailDTO> {
    return this.httpClient.get<PostDetailDTO>(this.apiConfig.api + '/posts/' + id);
  }

  sendPost(post: PostsDTO): Observable<PostsDTO> {
    return this.httpClient.post<PostsDTO>(this.apiConfig.api + '/posts', { post });
  }
}
