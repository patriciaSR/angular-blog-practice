import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from 'src/app/user/user-store.service';
import { Post } from '../post.model ';
import { PostsStoreService } from '../posts-store.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]>;
  userLogin: boolean;
  defaultPostImage = '../../../assets/defaultPostImage.jpg';

  constructor(
    private userStore: UserStoreService,
    private store: PostsStoreService,
    private router: Router) { }

  ngOnInit(): void {
    this.store.init();
    this.posts$ = this.store.get$();
    this.userLogin = this.userStore.isLogin();
  }

  onNavigate(path: string, id: string) {
    this.router.navigate([path + id]);
  }

  async onDelete(postID: string) {
    try {
      await this.store.deletePost$(postID);
    } catch (error) {
      console.log(error);
    }
  }
}
