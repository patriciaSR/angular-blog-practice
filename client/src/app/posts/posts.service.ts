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
    return this.proxy.getPosts$().pipe(
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
    return this.proxy.getPostById$(id).pipe(
      map((postDTO: PostDTO) => {
        const post: Post = postDTO;
        return post;
      })
    );
  }

  getPostsByUserId(userID: string): Observable<Post[]> {
    return this.proxy.getPostByUserId$(userID).pipe(
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

  createPost(post: Post): Observable<Post> {
    return this.proxy.createPost$(post).pipe(
      map((postResult: PostDTO) => {
        const newPost: PostDTO = postResult;
        return newPost;
      })
    );
  }

  deletePost(postID: string): Observable<Post> {
    return this.proxy.deletePost$(postID).pipe(
      map((postDTO: PostDTO) => {
        const deletedPost: Post = postDTO;
        return deletedPost;
      })
    );
  }

  updatePost(postId: string, post: Post): Observable<Post> {
    return this.proxy.putPost$(postId, post).pipe(
      map((postResult: PostDTO) => {
        const newPost: PostDTO = postResult;
        return newPost;
      })
    );
  }
}
