import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/user/user-store.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {
  userLogin: boolean;
  constructor(private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.userLogin = this.userStore.isLogin();
  }

}
