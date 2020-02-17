import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { LayoutsModule } from './layouts/layouts.module';
import { PostsModule } from './posts/posts.module';

const apiConfig = {
  api: 'https://localhost:3443'
};

const ROUTES: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'posts',
        loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
      }
    ]
  },
  // {
  //   path: 'login',
  //   component: SimpleLayoutComponent,
  //   children: [
  //     { path: '', component: LoginComponent }
  //   ]
  // },
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutsModule,
    PostsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule
  ],
  providers: [{ provide: 'apiConfig', useValue: apiConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
