import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserStoreService } from 'src/app/user/user-store.service';
import { AppLayoutComponent } from './app-layout.component';


describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLayoutComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userLogin', () => {
    component.ngOnInit();
    expect(component.userLogin).toBeDefined();
    expect(typeof component.userLogin).toEqual('boolean');
  });

  it('should call deleteUserData on onLogOut()', () => {
    const spyService = spyOn(TestBed.inject(UserStoreService), 'deleteUserData');
    component.onLogout();
    expect(spyService).toHaveBeenCalled();
    expect(component.userLogin).toBe(false);
  });
});
