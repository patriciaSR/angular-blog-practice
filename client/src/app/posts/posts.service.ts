import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { PostDetailDTO } from './post-detail-dto.model';
import { PostDetail } from './post-detail.model ';
import { PostsDTO } from './posts-dto.model';
import { PostsProxyService } from './posts-proxy.service';
import { Posts } from './posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private proxy: PostsProxyService) { }

  getPosts(): Observable<Posts[]> {
    return this.proxy.getPosts().pipe(
      map((postsDTO: PostsDTO[]) => {
        let posts: Posts[] = [];
        postsDTO.map((postDTO: PostsDTO) => {
          const post: Posts = {
            _id: postDTO._id,
            title: postDTO.title,
            date: postDTO.date
          };
          posts = [...posts, post];
        });
        return posts;
      })
    );
  }

  getPostById(id): Observable<PostDetail> {
    return this.proxy.getPostById(id).pipe(
      map((postDetailDTO: PostDetailDTO) => {
        const post: PostDetail = {
          _id: postDetailDTO._id,
          title: postDetailDTO.title,
          content: postDetailDTO.content,
          comments: postDetailDTO.comments
        };

        return post;
      })
    );
  }
}
