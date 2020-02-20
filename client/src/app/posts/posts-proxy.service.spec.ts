import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FAKE_POST } from './post-fake.spec';
import { FAKE_POSTS } from './posts-fake.spec';
import { PostsProxyService } from './posts-proxy.service';

const apiConfig = {
  api: 'https://localhost:3443'
};

describe('PostsProxyService', () => {
  let service: PostsProxyService;

  const newPost = {
    title: 'hola soy dumbo111',
    content: 'hola soy dumbo111'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: 'apiConfig', useValue: apiConfig }]
    });
    service = TestBed.inject(PostsProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call to server to get all posts', () => {
    // const service: UsersProxyService = TestBed.get(UsersProxyService);
    const httpMock = TestBed.inject(HttpTestingController);
    service.getPosts().subscribe(posts => expect(posts).toBe(FAKE_POSTS));

    const request = httpMock.expectOne('https://localhost:3443/posts');

    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_POSTS);
    httpMock.verify();
  });

  it('should call to server to get post by id', () => {
    const id = '5e31d951bcdbf849883e9bd0';
    const httpMock = TestBed.inject(HttpTestingController);
    service.getPostById(id).subscribe(posts => expect(posts).toBe(FAKE_POST));

    const request = httpMock.expectOne('https://localhost:3443/posts/' + id);

    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_POST);
    httpMock.verify();
  });

  it('should call to server to send new post', () => {
    const httpMock = TestBed.inject(HttpTestingController);
    service.sendPost(newPost).subscribe(post => expect(post.title).toBe(FAKE_POST.title));

    const request = httpMock.expectOne('https://localhost:3443/posts');

    expect(request.request.method).toEqual('POST');
    request.flush(FAKE_POST);
    httpMock.verify();
  });

  it('should call to server to delete post by id', () => {
    const httpMock = TestBed.inject(HttpTestingController);
    const id = '5e4e61277b3414281ef448ad';

    service.deletePost(id).subscribe(post => expect(post).toBe(FAKE_POST));

    const request = httpMock.expectOne('https://localhost:3443/posts/' + id);

    expect(request.request.method).toEqual('DELETE');
    request.flush(FAKE_POST);
    httpMock.verify();
  });
});
