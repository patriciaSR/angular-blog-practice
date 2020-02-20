import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FAKE_LOGIN } from '../login-fake.spec';
import { LoginService } from '../login.service';
import { LoginComponent } from './login.component';


const apiConfig = {
  api: 'https://localhost:3443'
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [{ provide: 'apiConfig', useValue: apiConfig }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set form property', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
  });

  it('should call getToken service', () => {
    const ev = jasmine.createSpyObj('e', ['preventDefault']);
    const spyService = spyOn(TestBed.inject(LoginService), 'getToken').and.callFake(() => of(FAKE_LOGIN));

    component.onSubmit(ev);

    expect(ev.preventDefault).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalled();
  });


});
