import { Injectable } from '@angular/core';
import { Store } from '../state/store';
import { User } from './user.model ';

const emptyUser = {
  message: '',
  token: '',
  userData: {
    _id: '',
    firstname: '',
    username: '',
    email: '',
    role: '',
  }
};

@Injectable({ providedIn: 'root' })

export class UserStoreService extends Store<User> {

  constructor() {
    super();
  }

  isLogin(): boolean {
    if (sessionStorage.getItem('userToken')) {
      return true;
    }

    return false;
  }

  getUserData(): object {
    return this.get();
  }

  saveUserData(userData: User) {
    sessionStorage.setItem('userToken', userData.token);
    this.store(userData);
  }

  deleteUserData() {
    sessionStorage.clear();
    this.store(emptyUser);
  }
}
