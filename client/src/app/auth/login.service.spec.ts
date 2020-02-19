import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FAKE_LOGIN } from './login-fake.spec';
import { LoginService } from './login.service';


const apiConfig = {
  api: 'https://localhost:3443'
};

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: 'apiConfig', useValue: apiConfig }]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call to server to post user login', () => {
    const body = {
      username: 'dumbo111',
      password: 'dumbo111'
    };

    const httpMock = TestBed.inject(HttpTestingController);
    service.getToken(body).subscribe(response => expect(response).toBe(FAKE_LOGIN));

    const request = httpMock.expectOne('https://localhost:3443/login');

    expect(request.request.method).toEqual('POST');
    request.flush(FAKE_LOGIN);
    httpMock.verify();
  });

  it('should reject server post user login with invalid username or password', () => {
    const body = {
      username: 'lalala',
      password: 'lalalala'
    };

    let response;
    let errResponse;

    const mockErrorResponse = { status: 401, statusText: 'Unauthorized' };

    const httpMock = TestBed.inject(HttpTestingController);
    service.getToken(body).subscribe(res => response = res, err => {
      errResponse = err;
    });

    const request = httpMock.expectOne('https://localhost:3443/login');

    expect(request.request.method).toEqual('POST');
    request.flush('', mockErrorResponse);
    expect(errResponse.status).toBe(401);
    expect(errResponse.statusText).toBe('Unauthorized');
    httpMock.verify();
  });
});
