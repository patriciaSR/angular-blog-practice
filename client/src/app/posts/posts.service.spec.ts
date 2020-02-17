import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FAKE_POSTS } from './posts-fake.spec';
import { PostsProxyService } from './posts-proxy.service';
import { Posts } from './posts.model';
import { PostsService } from './posts.service';

const apiConfig = {
  api: 'https://localhost:3443'
};

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: 'apiConfig', useValue: apiConfig }]
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should adapt postsDTO to Posts', () => {
    const spyService = spyOn(TestBed.inject(PostsProxyService), 'getPosts').and.callFake(() => of(FAKE_POSTS));

    service.getPosts().subscribe((posts: Posts[]) => {
      expect(posts[0].title).toEqual(FAKE_POSTS[0].title);
      expect(posts[0].date).toEqual(FAKE_POSTS[0].date);
      expect(posts[0]._id).toEqual(FAKE_POSTS[0]._id);
    });

    expect(spyService).toHaveBeenCalled();
  });
});
