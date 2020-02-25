import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { FAKE_POSTS } from 'src/app/posts/posts-fake.spec';
import { PostsStoreService } from 'src/app/posts/posts-store.service';
import { PostsService } from 'src/app/posts/posts.service';
import { FAKE_USERDATA } from '../user-data-fake.spec';
import { UserStoreService } from '../user-store.service';
import { ProfileComponent } from './profile.component';

const apiConfig = {
  api: 'https://localhost:3443'
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: 'apiConfig', useValue: apiConfig }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userPosts', () => {
    const spyService = spyOn(TestBed.inject(PostsService), 'getPostsByUserId').and.callFake(() => of(FAKE_POSTS));

    component.ngOnInit();
    expect(spyService).toHaveBeenCalled();
    expect(component.userPosts).toBeDefined();
    expect(component.userPosts).toEqual(FAKE_POSTS);
  });

  it('should set userData', () => {
    const spyService = spyOn(TestBed.inject(UserStoreService), 'getUserData').and.callFake(() => FAKE_USERDATA);

    component.ngOnInit();
    expect(spyService).toHaveBeenCalled();
    expect(component.userData).toBeDefined();
    expect(component.userData).toBe(FAKE_USERDATA.userData);

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
