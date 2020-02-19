import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sub: Subscription;
  errorText: string;
  success: object;

  constructor( private signupService: SignupService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSignUp($event) {
    $event.preventDefault();

    this.sub = this.signupService.signUp(this.form.value).subscribe(
      (response) => {
        this.success = response;
        alert('User registered correctly');

        this.router.navigate(['home']);
      },
      (error) => {
        this.errorText = error.error;
        console.log(error);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
