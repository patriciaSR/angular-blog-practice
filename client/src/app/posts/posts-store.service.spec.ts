import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Store } from '../state/store';
import { FAKE_POSTS } from './posts-fake.spec';
import { PostsStoreService } from './posts-store.service';
import { PostsService } from './posts.service';

const apiConfig = {
  api: 'https://localhost:3443'
};

describe('PostsStoreService', () => {
  let service: PostsStoreService;

  const newPost = {
    title: 'hola soy dumbo111',
    content: 'hola soy dumbo111'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: 'apiConfig', useValue: apiConfig }, Store]
    });
    service = TestBed.inject(PostsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a Promise<Post[]> on init()', async () => {
    const spyService = spyOn(TestBed.inject(PostsService), 'getPosts').and.callFake(() => of(FAKE_POSTS));

    await service.init();

    expect(spyService).toHaveBeenCalled();
  });

  // it('should return a Promise<PostDTO> on createPost()', async () => {
  //   const spyService = spyOn(TestBed.inject(PostsService), 'createPost').and.callFake(() => of(FAKE_POST));
  //   const spyStore = spyOn(TestBed.inject(Store), 'get').and.returnValue(FAKE_POSTS);

  //   await service.createPost$(newPost);

  //   expect(spyStore).toHaveBeenCalled();
  //   expect(spyService).toHaveBeenCalled();
  // });

  // it('should return a Promise<PostDTO> on deletePost()', async () => {
  //   const spyService = spyOn(TestBed.inject(PostsService), 'deletePost').and.callFake(() => of(FAKE_POST));
  //   const id = '5e31d951bcdbf849883e9bd0';

  //   await service.deletePost$(id);

  //   expect(spyService).toHaveBeenCalled();
  // });

  // it('should return a Promise<PostDTO> on updatePost()', async () => {
  //   const spyService = spyOn(TestBed.inject(PostsService), 'updatePost').and.callFake(() => of(FAKE_POST));
  //   const spyStore = spyOn(TestBed.inject(Store), 'get').and.returnValue(FAKE_POSTS);

  //   const id = '5e31d951bcdbf849883e9bd0';

  //   await service.updatePost$(id, newPost);

  //   expect(spyService).toHaveBeenCalled();
  // });
});
