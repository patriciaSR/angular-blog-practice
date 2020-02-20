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
  });

  it('should call getToken service', () => {
    const ev = jasmine.createSpyObj('e', ['preventDefault']);
    const spyService = spyOn(TestBed.inject(SignupService), 'signUp').and.callFake(() => of(FAKE_LOGIN));

    component.onSignUp(ev);

    expect(ev.preventDefault).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalled();
  });
});
