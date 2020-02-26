import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserStoreService } from 'src/app/user/user-store.service';
import { UserData } from 'src/app/user/user.model ';
import { Post } from '../post.model ';
import { PostsStoreService } from '../posts-store.service';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  postInfo: Post;
  userLogin: boolean;
  id: string;
  sub: Subscription;
  userData: UserData;
  defaultPostImage = '../../../assets/defaultPostImage.jpg';
  defaultAvatarImage = '../../../assets/avatar-pengin.png';

  constructor(
    private store: PostsStoreService,
    private userStore: UserStoreService,
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userLogin = this.userStore.isLogin();
    this.userData = this.userStore.getUserData().userData;

    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
    });

    this.sub = this.postsService.getPostById(this.id).subscribe(
      (response) => this.postInfo = response,
      (error) => console.log(error)
    );
  }

  onNavigate(path: string, id: string) {
    this.router.navigate([path + id]);
  }

  async onDelete(postID: string) {
    try {
      await this.store.deletePost$(postID);
      alert('Post deleted correctly!');
      this.router.navigate(['posts']);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
