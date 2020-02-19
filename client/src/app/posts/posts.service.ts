import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { PostDTO } from './post-dto.model';
import { Post } from './post.model ';
import { PostsProxyService } from './posts-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private proxy: PostsProxyService) { }

  getPosts(): Observable<Post[]> {
    return this.proxy.getPosts().pipe(
      map((postsDTO: PostDTO[]) => {
        let posts: Post[] = [];
        postsDTO.map((postDTO: PostDTO) => {
          const post: Post = {
            _id: postDTO._id,
            title: postDTO.title,
            date: postDTO.date,
            content: postDTO.content
          };
          posts = [...posts, post];
        });
        return posts;
      })
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.proxy.getPostById(id).pipe(
      map((postDTO: PostDTO) => {
        const post: Post = postDTO;
        return post;
      })
    );
  }

  createPost(post: Post): Observable<Post> {
    return this.proxy.sendPost(post).pipe(
      map((postResult: PostDTO) => {
        const newPost: PostDTO = postResult;
        return newPost;
      })
    );
  }
}
