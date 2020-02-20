import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PostsStoreService } from '../posts-store.service';
import { PostDetailComponent } from './post-detail.component';

const apiConfig = {
  api: 'https://localhost:3443'
};

// const routes = [
//   {
//     path: 'newpost',
//     component: CreatePostComponent
//   }
// ];

// const fakeActivatedRoute = {
//   params: {
//       id: '123'
//   }
// };

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: 'apiConfig', useValue: apiConfig }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to newpost path', inject([Router], (router: Router) => {
    const spyNav = spyOn(router, 'navigate');

    component.onNavigate('newpost', '');

    expect(spyNav).toHaveBeenCalledWith(['newpost']);
  }));

  it('should call deletePost service on onDelete() method', inject([Router], async (router: Router) => {
    const postID = '5e31d951bcdbf849883e9bd0';
    const spyService = spyOn(TestBed.inject(PostsStoreService), 'deletePost$');

    const spyNav = spyOn(router, 'navigate');

    await component.onDelete(postID);

    expect(spyService).toHaveBeenCalled();
    expect(spyNav).toHaveBeenCalledWith(['posts']);
  }));
});
