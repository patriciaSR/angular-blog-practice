import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/user/user-store.service';
import { UserData } from 'src/app/user/user.model ';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userLogin: boolean;
  userData: UserData;

  constructor(private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.userLogin = this.userStore.isLogin();
    if (this.userLogin) {
      this.userData =  this.userStore.getUserData().userData;
    }
  }
}
