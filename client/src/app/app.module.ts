import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { LayoutsModule } from './layouts/layouts.module';
import { SimpleLayoutComponent } from './layouts/simple-layout/simple-layout.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';

const apiConfig = {
  api: 'https://localhost:3443'
};

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'posts',
        loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
      },
      {
        path: 'newpost',
        component: CreatePostComponent
      },
      {
        path: 'newpost/:id',
        component: CreatePostComponent
      }
  ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ]
  },
  { path: '**', redirectTo: 'home' }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutsModule,
    AuthModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    { provide: 'apiConfig', useValue: apiConfig },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
