import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Store } from '../state/store';
import { Post } from './post.model ';
import { PostsService } from './posts.service';


@Injectable({ providedIn: 'root' })

export class PostsStoreService extends Store<Post[]> {

  constructor(private service: PostsService) {
    super();
  }

  init(): Promise<Post[]> {
    if (this.get()) { return; }

    return this.service.getPosts().pipe(
      tap(this.store)
    ).toPromise();
  }

  createPost$(post: Post): Promise<Post> {
    return this.service.createPost(post).pipe(
      tap(postResult => {
        this.store([postResult, ...this.get()]);
      })
    ).toPromise();
  }

  deletePost$(postID: string): Promise<Post> {
    return this.service.deletePost(postID).pipe(
      tap(() => {
        const posts = this.get();
        const newPosts = posts.filter(post => post._id !== postID);
        this.store(newPosts);
      })
    ).toPromise();
  }
}
