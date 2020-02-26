import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { ProfileComponent } from './profile/profile.component';


const ROUTES: Routes = [
  { path: '', component: ProfileComponent },
  // { path: 'words', component: WordsComponent },
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MaterialUiModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class UserModule { }
