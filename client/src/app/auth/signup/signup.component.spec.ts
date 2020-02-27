import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { FAKE_LOGIN } from '../login-fake.spec';
import { SignupService } from '../signup.service';
import { SignupComponent } from './signup.component';

const apiConfig = {
  api: 'https://localhost:3443'
};

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [ SignupComponent ],
      providers: [{ provide: 'apiConfig', useValue: apiConfig }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set form property', () => {
    component.ngOnInit();

    expect(component.form).toBeDefined();
    expect(component.form.contains('firstname')).toBeTruthy();
    expect(component.form.contains('username')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it ('should required username', () => {
    const username = component.form.get('username');
    username.setValue('');
    expect(username.valid).toBeFalsy();

    username.setValue('asdasd');
    expect(username.valid).toBeTruthy();
  });

  it ('should required firstname', () => {
    const firstname = component.form.get('firstname');
    firstname.setValue('');
    expect(firstname.valid).toBeFalsy();

    firstname.setValue('asdasd');
    expect(firstname.valid).toBeTruthy();
  });

  it ('should required email', () => {
    const email = component.form.get('email');
    email.setValue('');
    expect(email.valid).toBeFalsy();

    email.setValue('asdasd');
    expect(email.valid).toBeFalsy();

    email.setValue('asdasd@gmail.com');
    expect(email.valid).toBeTruthy();
  });

  it ('should required password', () => {
    const password = component.form.get('password');
    // const password = component.form.controls.password;

    password.setValue('');
    expect(password.valid).toBeFalsy();

    const errors = password.errors;
    expect(errors.required).toBeTruthy();

    password.setValue('asd');
    expect(password.valid).toBeFalsy();

    password.setValue('asdasdasdasd');
    expect(password.valid).toBeTruthy();
  });

  it('should call getToken service', () => {
    const ev = jasmine.createSpyObj('e', ['preventDefault']);
    const spyService = spyOn(TestBed.inject(SignupService), 'signUp').and.callFake(() => of(FAKE_LOGIN));

    component.onSignUp(ev);

    expect(ev.preventDefault).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalled();
  });
});
