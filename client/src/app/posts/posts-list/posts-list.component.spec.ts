import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CreatePostComponent } from '../create-post/create-post.component';
import { PostsStoreService } from '../posts-store.service';
import { PostsListComponent } from './posts-list.component';

const apiConfig = {
  api: 'https://localhost:3443'
};

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;

  const routes = [
    {
      path: 'newpost',
      component: CreatePostComponent
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      declarations: [PostsListComponent],
      providers: [{ provide: 'apiConfig', useValue: apiConfig }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set posts$', () => {
    component.ngOnInit();
    expect(component.posts$).toBeDefined();
  });

  it('should navigate to newpost path', inject([Router], (router: Router) => {
    const spyNav = spyOn(router, 'navigate');

    component.onNavigate('newpost');

    expect(spyNav).toHaveBeenCalledWith(['newpost']);
  }));

  it('should call onDelete PostServive method', () => {
    const id = '5e31d951bcdbf849883e9bd0';
    const spyService = spyOn(TestBed.inject(PostsStoreService), 'deletePost$');

    component.onDelete(id);

    expect(spyService).toHaveBeenCalled();
  });
});

