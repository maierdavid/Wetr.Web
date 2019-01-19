import { Component, OnInit } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit() {
  }

  username: string;
  password: string;

  success: boolean;

  onSubmit = function () {
    this.authenticationService.login(this.username, this.password).then(val => {
      this.success = val;
    });
  }

}
