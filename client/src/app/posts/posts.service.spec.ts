import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostDTO } from './post-dto.model';
import { FAKE_POST } from './post-fake.spec';
import { Post } from './post.model ';
import { FAKE_POSTS } from './posts-fake.spec';
import { PostsProxyService } from './posts-proxy.service';
import { PostsService } from './posts.service';

const apiConfig = {
  api: 'https://localhost:3443'
};

describe('PostsService', () => {
  let service: PostsService;

  const newPost = {
    title: 'hola soy dumbo111',
    content: 'hola soy dumbo111'
  };

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

  it('should adapt postDTO to Post model on getPosts() method', () => {
    const spyService = spyOn(TestBed.inject(PostsProxyService), 'getPosts$').and.callFake(() => of(FAKE_POSTS));

    service.getPosts().subscribe((posts: Post[]) => {
      expect(posts[0].title).toEqual(FAKE_POSTS[0].title);
      expect(posts[0].date).toEqual(FAKE_POSTS[0].date);
      expect(posts[0]._id).toEqual(FAKE_POSTS[0]._id);
    });

    expect(spyService).toHaveBeenCalled();
  });

  it('should adapt postDTO to Post on getPostByID() method', () => {
    const spyService = spyOn(TestBed.inject(PostsProxyService), 'getPostById$').and.callFake(() => of(FAKE_POST));
    const id = '5e31d951bcdbf849883e9bd0';

    service.getPostById(id).subscribe((post: Post) => {
      expect(post.title).toEqual(FAKE_POST.title);
      expect(post.date).toEqual(FAKE_POST.date);
      expect(post._id).toEqual(FAKE_POST._id);
    });

    expect(spyService).toHaveBeenCalled();
  });

  it('should adapt Post to PostDTO on createPost() method', () => {
    const spyService = spyOn(TestBed.inject(PostsProxyService), 'createPost$').and.callFake(() => of(FAKE_POST));

    service.createPost(newPost).subscribe((post: PostDTO) => {
      expect(post.title).toEqual(FAKE_POST.title);
      expect(post.date).toEqual(FAKE_POST.date);
      expect(post._id).toBeDefined();
    });

    expect(spyService).toHaveBeenCalled();
  });

  it('should adapt PostDTO to Post on delete() method', () => {
    const spyService = spyOn(TestBed.inject(PostsProxyService), 'deletePost$').and.callFake(() => of(FAKE_POST));
    const id = '5e31d951bcdbf849883e9bd0';

    service.deletePost(id).subscribe((postDeleted: Post) => {
      expect(postDeleted.title).toEqual(FAKE_POST.title);
      expect(postDeleted.content).toEqual(FAKE_POST.content);
      expect(postDeleted._id).toBe(id);
    });

    expect(spyService).toHaveBeenCalled();
  });

  it('should adapt Post to PostDTO on updatePost() method', () => {
    const spyService = spyOn(TestBed.inject(PostsProxyService), 'putPost$').and.callFake(() => of(FAKE_POST));
    const postID = '5e31d951bcdbf849883e9bd0';

    const updatePost = {
      title: 'hola soy dumbo111',
      content: 'hola soy dumbo111'
    };

    service.updatePost(postID, updatePost).subscribe((post: PostDTO) => {
      expect(post.title).toEqual(FAKE_POST.title);
      expect(post.date).toEqual(FAKE_POST.date);
      expect(post._id).toBeDefined();
    });

    expect(spyService).toHaveBeenCalled();
  });
});
