import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserStoreService } from 'src/app/user/user-store.service';
import { LoginService } from '../login.service';
import { TokenDTO } from '../token.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  userToken: TokenDTO;
  sub: Subscription;
  errorText: string;

  constructor(
    private userStore: UserStoreService,
    private service: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit($event) {
    $event.preventDefault();

    this.sub = this.service.getToken(this.form.value).subscribe(
      (response) => {
        this.userToken = response;
        this.userStore.saveUserData(response);

        this.router.navigate(['myprofile']);
      },
      (error) => {
        this.errorText = 'invalid username or password';
        console.log(error);
      });
  }
}
