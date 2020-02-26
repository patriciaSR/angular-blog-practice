import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/posts/post.model ';
import { PostsStoreService } from 'src/app/posts/posts-store.service';
import { PostsService } from 'src/app/posts/posts.service';
import { UserStoreService } from 'src/app/user/user-store.service';
import { UserData } from 'src/app/user/user.model ';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userLogin: boolean;
  userData: UserData;
  sub: Subscription;
  userPosts: Post[];
  defaultPostImage = '../../../assets/defaultPostImage.jpg';
  defaultProfileImage = 'https://i.pinimg.com/originals/11/3b/a4/113ba4f4a6ab9817069ca3a3bb4a1b1b.jpg';
  defaultAvatarImage = '../../../assets/avatar-pengin.png';

  constructor(
    private userStore: UserStoreService,
    private postsStore: PostsStoreService,
    private postsService: PostsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userLogin = this.userStore.isLogin();

    if (this.userLogin) {
      this.userData = this.userStore.getUserData().userData;
    }

    this.sub = this.postsService.getPostsByUserId(this.userData._id).subscribe(
      (response) => this.userPosts = response,
      (error) => console.log(error)
    );
  }

  onNavigate(path: string, id: string) {
    this.router.navigate([path + id]);
  }

  async onDelete(postID: string) {
    try {
      await this.postsStore.deletePost$(postID);
      alert('Post deleted correctly!');
      this.router.navigate(['posts']);
    } catch (error) {
      console.log(error);
    }
  }
}
