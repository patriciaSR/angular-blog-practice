import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FAKE_POST } from './post-fake.spec';
import { FAKE_POSTS } from './posts-fake.spec';
import { PostsStoreService } from './posts-store.service';
import { PostsService } from './posts.service';

const apiConfig = {
  api: 'https://localhost:3443/'
};

const FAKE_ID = '1234567';


describe('PostsStoreService', () => {
  let service: PostsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PostsService,
        { provide: 'apiConfig', useValue: apiConfig },
      ]
    });
    service = TestBed.inject(PostsStoreService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when calling init() should call getPosts from service', () => {
    const spyService = spyOn(TestBed.inject(PostsService), 'getPosts').and.callFake(() => of(FAKE_POSTS));
    service.init();
    expect(spyService).toHaveBeenCalled();
  });

  it('when calling createPost$ should call createPost from service', () => {

    const spyService = spyOn(TestBed.inject(PostsService), 'createPost').and.callFake(() => of(FAKE_POST));
    service.createPost$(FAKE_POST);
    expect(spyService).toHaveBeenCalled();
  });
  it('when calling deletePost$ should call deletePost from service', () => {

    const spyService = spyOn(TestBed.inject(PostsService), 'deletePost').and.callFake(() => of(FAKE_POST));
    service.deletePost$(FAKE_ID);
    expect(spyService).toHaveBeenCalled();
  });

  it('when calling updatePost$ should call updatePost from service', () => {

    const spyService = spyOn(TestBed.inject(PostsService), 'updatePost').and.callFake(() => of(FAKE_POST));
    service.updatePost$(FAKE_ID, FAKE_POST);
    expect(spyService).toHaveBeenCalled();
  });
});
