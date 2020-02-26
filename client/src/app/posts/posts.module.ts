import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsListComponent } from './posts-list/posts-list.component';

const ROUTES: Routes = [
  { path: '', component: PostsListComponent },
  { path: ':id', component: PostDetailComponent },
];

@NgModule({
  declarations: [PostsListComponent, PostDetailComponent, CreatePostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialUiModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class PostsModule { }
