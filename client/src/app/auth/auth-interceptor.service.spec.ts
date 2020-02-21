import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FAKE_POST } from '../posts/post-fake.spec';
import { PostsProxyService } from '../posts/posts-proxy.service';
import { AuthInterceptorService } from './auth-interceptor.service';

const apiConfig = {
  api: 'https://localhost:3443'
};

describe('AuthInterceptorService', () => {
  let service: AuthInterceptorService;
  // tslint:disable-next-line: prefer-const
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: 'apiConfig', useValue: apiConfig },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
        }
      ]
    });
    service = TestBed.inject(AuthInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an Authorization header', () => {
    const postservice = TestBed.inject(PostsProxyService);
    const httpMock = TestBed.inject(HttpTestingController);
    postservice.createPost$(FAKE_POST).subscribe(post => expect(post).toBe(FAKE_POST));
    const request = httpMock.expectOne('https://localhost:3443/posts');
    expect(request.request.headers.has('Authorization')).toEqual(true);
  });
});
