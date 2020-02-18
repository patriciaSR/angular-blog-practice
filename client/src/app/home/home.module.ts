import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
