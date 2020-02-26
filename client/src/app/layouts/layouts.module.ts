import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';

@NgModule({
  declarations: [AppLayoutComponent, SimpleLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialUiModule
  ],
  exports: [AppLayoutComponent, SimpleLayoutComponent]
})
export class LayoutsModule { }
