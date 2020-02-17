import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';

@NgModule({
  declarations: [AppLayoutComponent, SimpleLayoutComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AppLayoutComponent, SimpleLayoutComponent]
})
export class LayoutsModule { }
