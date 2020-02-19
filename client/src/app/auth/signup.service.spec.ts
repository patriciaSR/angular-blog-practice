import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FAKE_SIGNUP } from './signup-fake.spec';
import { SignupService } from './signup.service';

const apiConfig = {
  api: 'https://localhost:3443'
};

describe('SignupService', () => {
  let service: SignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: 'apiConfig', useValue: apiConfig }]
    });
    service = TestBed.inject(SignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call to server to post new user signup', () => {
    const newUser = {
      firstname: 'mufasa',
      lastname: 'lopez',
      username: 'mufasa555',
      email: 'mufasa@gmail.com',
      image: 'https://i.pinimg.com/originals/a8/b3/d6/a8b3d61f1c857d80fff2096925198fce.jpg'
    };

    const httpMock = TestBed.inject(HttpTestingController);
    service.signUp(newUser).subscribe(response => expect(response).toBe(FAKE_SIGNUP));

    const request = httpMock.expectOne('https://localhost:3443/signup');

    expect(request.request.method).toEqual('POST');
    request.flush(FAKE_SIGNUP);
    httpMock.verify();
  });

  it('should reject server post new user signup with already exist username', () => {
    const newUser = {
      firstname: 'lola',
      lastname: 'lopez',
      username: 'dumbo111',
      email: 'lola@gmail.com',
      image: 'https://i.pinimg.com/originals/a8/b3/d6/a8b3d61f1c857d80fff2096925198fce.jpg'
    };
    let response: any;
    let errResponse: any;

    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };

    const httpMock = TestBed.inject(HttpTestingController);
    service.signUp(newUser).subscribe(res => response = res, err => {
      errResponse = err;
      expect(errResponse).toBe('Username already exists');
    });

    const request = httpMock.expectOne('https://localhost:3443/signup');

    expect(request.request.method).toEqual('POST');
    request.flush(mockErrorResponse);

    httpMock.verify();
  });

  it('should reject server post new user signup with already exist email', () => {
    const newUser = {
      firstname: 'lola',
      lastname: 'lopez',
      username: 'lola111',
      email: 'dumbo555@gmail.com',
      image: 'https://i.pinimg.com/originals/a8/b3/d6/a8b3d61f1c857d80fff2096925198fce.jpg'
    };
    let response: any;
    let errResponse: any;

    const mockErrorResponse = { status: 400, statusText: 'Bad Request', error: 'Email already exists' };

    const httpMock = TestBed.inject(HttpTestingController);
    service.signUp(newUser).subscribe(res => response = res, err => {
      errResponse = err;
    });

    const request = httpMock.expectOne('https://localhost:3443/signup');

    expect(request.request.method).toEqual('POST');
    request.flush(mockErrorResponse.error, mockErrorResponse);
    expect(errResponse.error).toBe('Email already exists');
    httpMock.verify();
  });
});
