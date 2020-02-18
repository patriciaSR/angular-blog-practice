import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
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

  constructor(private service: LoginService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit($event) {
    $event.preventDefault();

    this.sub = this.service.getToken(this.form.value).subscribe(
      (response) => {
        this.userToken = response;
        console.log(this.userToken);
      },
      (error) => console.log(error));
  }
}
