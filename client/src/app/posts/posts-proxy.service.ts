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

  getPostById(postID: string): Observable<PostDTO> {
    return this.httpClient.get<PostDTO>(this.apiConfig.api + '/posts/' + postID);
  }

  sendPost(post: PostDTO): Observable<PostDTO> {
    return this.httpClient.post<PostDTO>(this.apiConfig.api + '/posts', post);
  }

  deletePost(postID: string): Observable<PostDTO> {
    return this.httpClient.delete<PostDTO>(this.apiConfig.api + '/posts/' + postID);
  }

  putPost$(postID: string, post: PostDTO): Observable<PostDTO> {
    return this.httpClient.put<PostDTO>(this.apiConfig.api + '/posts/' + postID, post);
  }
}
