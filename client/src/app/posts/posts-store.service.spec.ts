import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostsStoreService } from './posts-store.service';

const apiConfig = {
  api: 'https://localhost:3443'
};

describe('PostsStoreService', () => {
  let service: PostsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: 'apiConfig', useValue: apiConfig }]
    });
    service = TestBed.inject(PostsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
