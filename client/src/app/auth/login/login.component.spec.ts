import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
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
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
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

  it('should set form properties', () => {
    component.ngOnInit();

    expect(component.form).toBeDefined();
    expect(component.form.contains('username')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it ('should required username', () => {
    const username = component.form.get('username');
    username.setValue('');
    expect(username.valid).toBeFalsy();

    username.setValue('asdasd');
    expect(username.valid).toBeTruthy();
  });

  it ('should required password', () => {
    const password = component.form.get('password');
    password.setValue('');
    expect(password.valid).toBeFalsy();

    password.setValue('aaaaaaaa');
    expect(password.valid).toBeTruthy();

  });

  it('should call getToken service', () => {
    const ev = jasmine.createSpyObj('e', ['preventDefault']);
    const spyService = spyOn(TestBed.inject(LoginService), 'getToken').and.callFake(() => of(FAKE_LOGIN));

    component.onSubmit(ev);

    expect(ev.preventDefault).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalled();
  });


});
