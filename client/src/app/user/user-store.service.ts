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
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      this.store(JSON.parse(userData));
      return true;
    }

    return false;
  }

  getUserData(): User {
    return this.get();
  }

  saveUserData(userData: User) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
    this.store(userData);
  }

  deleteUserData() {
    sessionStorage.clear();
    this.store(emptyUser);
  }
}
