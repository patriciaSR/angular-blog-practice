import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Store } from '../state/store';
import { Posts } from './posts.model';
import { PostsService } from './posts.service';

@Injectable({providedIn: 'root'})

export class PostsStoreService extends Store<Posts[]> {

  constructor(private service: PostsService) {
    super();
  }

  init(): Promise<Posts[]> {
    if (this.get()) { return; }

    return this.service.getPosts().pipe(
      tap(this.store)
    ).toPromise();
  }

  createPost$(post: Posts): Promise<Posts> {
    return this.service.createPost(post).pipe(
    tap(postResult => {
      this.store([postResult, ...this.get()]);
  })
  ).toPromise();
  }
}
