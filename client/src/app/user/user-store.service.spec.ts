import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FAKE_USERDATA } from './user-data-fake.spec';
import { UserStoreService } from './user-store.service';

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

describe('UserStoreService', () => {
  let service: UserStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserStoreService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call sessionStore and return true on isLogin() method', () => {
    const spySession = spyOn(window.sessionStorage, 'getItem').and.callFake(() => '1232234324');

    const result = service.isLogin();
    expect(spySession).toHaveBeenCalled();
    expect(spySession).toHaveBeenCalledWith('userData');
    expect(result).toBe(true);
  });

  it('should call sessionStore and return false on isLogin() method', () => {
    const spySession = spyOn(window.sessionStorage, 'getItem').and.callFake(() => undefined);

    const result = service.isLogin();
    expect(spySession).toHaveBeenCalled();
    expect(spySession).toHaveBeenCalledWith('userData');
    expect(result).toBe(false);
  });

  // it('should calls this.store with userData on saveUserData() method', () => {
  //   const spyStore = spyOn(Store, 'store');

  //   service.saveUserData(FAKE_USERDATA);

  //   expect(spyStore).toHaveBeenCalled();
  // });

  it('should return an object with userData on getUserData() method', () => {
    service.saveUserData(FAKE_USERDATA);

    const result = service.getUserData();
    expect(result).toBe(FAKE_USERDATA);
  });

  it('should return undefinend without userData on getUserData() method', () => {

    const result = service.getUserData();
    expect(result).toBe(undefined);
  });

  it('should clear sessionstore ans store class on deleteUserData() method ', () => {
    const spySession = spyOn(window.sessionStorage, 'clear');

    service.deleteUserData();
    expect(spySession).toHaveBeenCalled();

    const result = service.getUserData();
    expect(result).toEqual(emptyUser);
  });

});
