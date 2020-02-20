import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PostsStoreService } from '../posts-store.service';
import { CreatePostComponent } from './create-post.component';

const apiConfig = {
  api: 'https://localhost:3443'
};

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [CreatePostComponent],
      providers: [{ provide: 'apiConfig', useValue: apiConfig }]
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

  it('should  call createPost service and navigate to new post created path', () => {
    const createdPost = {
      _id: '123',
      title: 'hola',
      content: 'hola'
    };

    const spyService = spyOn(TestBed.inject(PostsStoreService), 'createPost$');
    // .and.returnValue(Promise.resolve(createdPost));

    component.onSendPost();

    expect(spyService).toHaveBeenCalled();

    // Nav to post/id test ??
  });

  it('should  call updatePost service and navigate to new post created path', () => {
    const updatePost = {
      _id: '123',
      title: 'hola',
      content: 'hola'
    };

    const spyService = spyOn(TestBed.inject(PostsStoreService), 'updatePost$');
    // .and.returnValue(Promise.resolve(createdPost));

    component.onUpdatePost();

    expect(spyService).toHaveBeenCalled();

    // Nav to post/id test ??
  });
});

