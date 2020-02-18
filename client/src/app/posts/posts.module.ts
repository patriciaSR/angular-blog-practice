import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsListComponent } from './posts-list/posts-list.component';

const ROUTES: Routes = [
  { path: '', component: PostsListComponent },
  { path: ':id', component: PostDetailComponent},
];

@NgModule({
  declarations: [PostsListComponent, PostDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class PostsModule { }
