import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { HomeComponent } from './home/home.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MaterialUiModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class HomeModule { }
