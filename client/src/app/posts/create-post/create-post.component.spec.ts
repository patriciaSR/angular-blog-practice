import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FAKE_POST } from '../post-fake.spec';
import { PostsStoreService } from '../posts-store.service';
import { PostsService } from '../posts.service';
import { CreatePostComponent } from './create-post.component';

const apiConfig = {
  api: 'https://localhost:3443'
};

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  const createdPost = {
    _id: '123',
    title: 'hola',
    content: 'hola'
  };

  const fakeActivatedRoute = {
    params: of({
      id: '123'
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [CreatePostComponent],
      providers: [
        { provide: 'apiConfig', useValue: apiConfig },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set form', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
  });

  it('should call getPostById() method() when postID is defined ', () => {

    const spyService = spyOn(TestBed.inject(PostsService), 'getPostById').and.callFake(() => of(FAKE_POST));

    component.ngOnInit();
    console.log(component.postID);

    expect(spyService).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalledWith('123');

  });

  it('should  call createPost service and navigate to new post created path', () => {

    const spyService = spyOn(TestBed.inject(PostsStoreService), 'createPost$');
    // .and.returnValue(Promise.resolve(createdPost));

    component.onSendPost();

    expect(spyService).toHaveBeenCalled();

    // Nav to post/id test ??
  });

  it('should  call updatePost service and navigate to new post created path', inject([Router], async (router: Router) => {
    const updatePost = {
      _id: '123',
      title: 'hola',
      content: 'hola'
    };

    const spyService = spyOn(TestBed.inject(PostsStoreService), 'updatePost$').and.returnValue(Promise.resolve(updatePost));
    const spyNav = spyOn(router, 'navigate');

    await component.onUpdatePost();

    expect(spyService).toHaveBeenCalled();
    expect(spyNav).toHaveBeenCalledWith(['posts/123']);
  }));
});

