import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../post.model ';
import { PostsStoreService } from '../posts-store.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private store: PostsStoreService) { }

  ngOnInit(): void {
    this.store.init();
    this.posts$ = this.store.get$();
  }
}
